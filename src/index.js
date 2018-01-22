/**
 * Created by milad on 10/28/17.
 */
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
//import User from './model/user';
//let localStrategy = require('passport-local').Strategy;

import config from './config';
import routes from './routes';

let app = express();

app.server = http.createServer(app);

//middleware
app.use(bodyParser.json({
  limit: config.bodyLimit,
  type: '*/*'
}));


/*//passport config
app.use(passport.initialize());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());*/


//api v1 routes
app.use('/', routes);
console.log(config.application.port)
app.server.listen(config.application.port);
console.log(`we are listening on port no. ${config.application.port}`);

export default app;
