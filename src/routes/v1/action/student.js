/**
 * Created by milad on 1/22/18.
 */
import {Router} from 'express';
import {check, validationResult} from 'express-validator/check';
import {matchedData, sanitize} from 'express-validator/filter';
import StudentProvider from '../provider/student';
import ResponseGenerator from '../../../util/responseGenerator';

export default ({config, database}) => {
  let api = new Router();
  const studentProviderInstance = new StudentProvider(database);

  api.get('/', (req, res) => {
    res.send({
      message: 'greeting'
    });
  });

  api.post('/checkRegister', async (req, res) => {
    const registerInfo = await studentProviderInstance.checkRegistration(req.body.nationalCode);
    if (registerInfo.length !== 0) {
      res.send(ResponseGenerator(true, "You Can Login", registerInfo));
    } else {
      res.send(ResponseGenerator(false, "You Must Register First"));
    }

  });



  return api;
}