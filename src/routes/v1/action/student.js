/**
 * Created by milad on 1/22/18.
 */
import {Router} from "express";
import {validationResult} from "express-validator/check";
import * as BodyParser from "../../../middleware/bodyParser";
import StudentProvider from "../provider/student";
import ResponseGenerator from "../../../util/responseGenerator";
import authMiddleWare from '../../../middleware/authentication';
import DistanceMatrix from 'google-distance-matrix';
import GatewayProvider from "../provider/gateway";
import ImageProvider from "../provider/image";

const DISTANCE_MATRIX_API_KEY = 'AIzaSyAJRlHVa45YqX-0chPm5Y7JDiaplMIQMOM';

export default ({config, database}) => {
  let api = new Router();
  const studentProviderInstance = new StudentProvider(database);

  api.get('/', (req, res) => {
    res.send({
      message: 'greeting'
    });
  });

  api.post('/checkRegister', BodyParser.checkRegisterSchema(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(ResponseGenerator(false, "Validation Error", errors.mapped()));
    }
    const registerInfo = await studentProviderInstance.checkRegistration(req.body.nationalCode);
    if (registerInfo.length !== 0) {
      res.send(ResponseGenerator(true, "You Can Login", registerInfo[0]));
    } else {
      res.send(ResponseGenerator(false, "You Must Register First"));
    }

  });

  api.get('/info', authMiddleWare.authenticate, async (req, res) => {
    const studentInfo = await studentProviderInstance.getStudentInfo(req.user.id);
    res.send(ResponseGenerator(true, 'Student Info', studentInfo));
  });

  api.post('/register', BodyParser.registerSchema(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(ResponseGenerator(false, "Validation Error", errors.mapped()));
    }
    try {
      const registerInfo = await studentProviderInstance.register(req.body);
      res.send(ResponseGenerator(true, 'register successful', registerInfo.reduce
        (({}, currentValue) => {
          return {
              studentId: currentValue.studentId,
              fullName: currentValue.fullName,
              nationalCode: currentValue.nationalCode
          }
        }, {})
      ));
    } catch (err) {
      res.send(ResponseGenerator(false, 'operation failed', err))
    }

  });

  api.post('/login', BodyParser.loginSchema()
    , authMiddleWare.AuthenticationWitCustomMessage
    , authMiddleWare.generateAccessToken
    , authMiddleWare.respond);

  api.get('/checkToken', authMiddleWare.authenticate, (req, res) => {
    res.send(ResponseGenerator(true, "Token is valid.", req.user));
  });

  api.get('/school', authMiddleWare.authenticate, async (req, res) => {
    const schools = await studentProviderInstance.getAllAvailableSchool();
    res.send(ResponseGenerator(true, 'All Schools', schools));
  });

  api.get('/school/:schoolId/openTerm', authMiddleWare.authenticate, async (req, res) => {
    const openTerm = await studentProviderInstance.getOpenTermOfSchool(req.params.schoolId);
    if (openTerm.length !== 0) {
      res.send(ResponseGenerator(true, 'Open Term', openTerm[0]));
    } else {
      res.send(ResponseGenerator(false, 'No Open Term Available'));
    }

  });

  api.get('/:termId/termGroup', authMiddleWare.authenticate, async (req, res) => {
    const termGroups = await studentProviderInstance.getTermGroups(req.params.termId);
    res.send(ResponseGenerator(true, 'Term Groups', termGroups));
  });

  api.get('/:schoolId/distance', authMiddleWare.authenticate, async (req, res) => {
    try {
      const userInfo = await studentProviderInstance.getStudentInfo(req.user.id);
      const schoolInfo = await  studentProviderInstance.getSchool(req.params.schoolId);
      if (schoolInfo.length === 0) {
        res.send(ResponseGenerator(false, "School Invalid"));
        return;
      }
      const origin = [`${userInfo.homeLocation.x},${userInfo.homeLocation.y}`];
      const destination = [`${schoolInfo[0].geoLocation.x},${schoolInfo[0].geoLocation.y}`];
      DistanceMatrix.key(DISTANCE_MATRIX_API_KEY);
      DistanceMatrix.matrix(origin, destination, (err, distance) => {
        if (err) {
          res.send(ResponseGenerator(false, err.message, err));
          return;
        }
        if (distance.status === 'OK') {
          if (distance.rows[0].elements[0].status === 'ZERO_RESULTS') {
            res.send(ResponseGenerator(false, 'No Route to destination!'));
            return;
          }
          const responseData = {
            distanceMeter: distance.rows[0].elements[0].distance.value,
            distanceText: distance.rows[0].elements[0].distance.text,
          };
          res.send(ResponseGenerator(true, "distances", responseData));
        } else {
          res.send(ResponseGenerator(false, 'error in distance'));
        }
      });
    } catch (error) {
      res.send(ResponseGenerator(false, error.message, error));
    }
  });

  api.post('/servicePrice', authMiddleWare.authenticate, async (req, res) => {
    const priceUnit = await studentProviderInstance.getTermPriceUnit(req.body.termId);
    const termGroup = await studentProviderInstance.getTermGroup(req.body.termGroupId);
    const schoolInformation = await studentProviderInstance.getSchool(req.body.schoolId);
    const response = {
      school: schoolInformation[0].caption,
      priceUnit: priceUnit.price,
      startDate: termGroup.startDate,
      groupCaption: termGroup.caption,
      endDate: termGroup.endDate,
      distance: req.body.distance,
      sessionCount: termGroup.sessionsCount,
      totalPrice: ((termGroup.sessionsCount * 2) * priceUnit.price) * req.body.distance
    };
    res.send(ResponseGenerator(true, 'Service Price Review', response))
  });

  api.post('/createRequest', authMiddleWare.authenticate, async (req, res) => {
    req.body.studentId = req.user.id;
    const result = await studentProviderInstance.createServiceRequest(req.body);
    res.send(ResponseGenerator(true, 'Create Service', result[0]));
  });

  api.post('/requestPaymentToken', authMiddleWare.authenticate, async (req, res) => {
    try {
      const gatewayProviderInstance = new GatewayProvider(database);
      const tokenRes = await gatewayProviderInstance.requestGatewayToken(req.body.amount * 10, `${String(Date.now())}-${req.body.amount}-${req.user.id}`);
      res.send(ResponseGenerator(true, 'Token', tokenRes[0]));
    } catch (error) {
      res.send(error);
    }

  });

  api.post('/verify', (req, res) => {
    console.log('params ', req.params);
    console.log('body ', req.body);
    console.log('query ', req.query);
    res.redirect('http://google.com');
  });

  api.get('/verify', (req, res) => {
    console.log('params ', req.params);
    console.log('body ', req.body);
    console.log('query ', req.query);
    res.send({'hello': ''})
  });

  api.post('/profileImage', (req, res) => {
    let imageProvider = new ImageProvider();
    imageProvider.saveImage(req.body.image, err => {
      if(err) return res.json(ResponseGenerator(false, 'Failed to save file', {}));
      res.json(ResponseGenerator(true, 'file created successfully', {}));
    })
  });

  return api;
}