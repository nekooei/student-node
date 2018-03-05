/**
 * Created by milad on 1/22/18.
 */
import {Router} from "express";
import {validationResult} from "express-validator/check";
import * as BodyParser from "../../../middleware/bodyParser";
import StudentProvider from "../provider/student";
import ResponseGenerator from "../../../util/responseGenerator";
import authMiddleWare from '../../../middleware/authentication';

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

  api.post('/register', BodyParser.registerSchema(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(ResponseGenerator(false, "Validation Error", errors.mapped()));
    }
    const registerInfo = await studentProviderInstance.register(req.body);
    res.send(registerInfo);
  });

  api.post('/login', BodyParser.loginSchema()
    , authMiddleWare.AuthenticationWitCustomMessage
    , authMiddleWare.generateAccessToken
    , authMiddleWare.respond);

  api.get('/checkToken', authMiddleWare.authenticate, (req, res) => {
    res.send(ResponseGenerator(true, "Token is valid.", req.user));
  });

  api.get('/schools', authMiddleWare.authenticate, async (req, res) => {
    const schools = await studentProviderInstance.getAllAvailableSchool();
    res.send(ResponseGenerator(true, 'All Schools', schools));
  });

  return api;
}