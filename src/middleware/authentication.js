/**
 * Created by milad on 2/28/18.
 */
import jwt from 'jsonwebtoken';
import expressjwt from 'express-jwt';

const TOKEN_TIME = 7 * 24 * 60 * 60;
const SECRET = 'sagepireCSEHAM3MIDONanKi3!!!!!!!';

let authenticate = expressjwt({secret: SECRET});

let generateAccessToken = (req, res, next) => {
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
      user: req.user.username,
      token : req.token
    });
};

export default  {
  authenticate,
  generateAccessToken,
  respond
}