/**
 * Created by milad on 1/22/18.
 */
import {Router} from "express";
import {validationResult} from "express-validator/check";
import * as BodyParser from "../../../middleware/bodyParser";
import StudentProvider from "../provider/student";
import ResponseGenerator from "../../../util/responseGenerator";

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
      res.send(ResponseGenerator(true, "You Can Login", registerInfo));
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

  return api;
}