/**
 * Created by milad on 2/28/18.
 */
import jwt from 'jsonwebtoken';
import expressjwt from 'express-jwt';
import passport from 'passport';

const TOKEN_TIME = 7 * 24 * 60 * 60;
const SECRET = 'sagepireCSEHAM3MIDONanKi3!!!!!!!';

let authenticate = expressjwt({secret: SECRET});

let generateAccessToken = (req, res, next) => {
  console.log(req.user);
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id,
    username: req.user.username
  }, SECRET, {
    expiresIn: TOKEN_TIME
  });
  next();
};

let respond = (req, res) => {
  res.status(200)
    .json({
      id: req.user.id,
      nationalCode: req.user.nationalCode,
      token : req.token
    });
};

let customAuthenticateMessage = (req, res, next) =>{
  return passport.authenticate('local', {
    session: false,
    scope: []
  }, (error, thisModel, authError) => {
    if(authError){
      return res.status(401).send(authError);
    }
    req.user= thisModel;
    next();
  }) (req, res, next);
};

export default  {
  authenticate,
  generateAccessToken,
  respond,
  customAuthenticateMessage
}