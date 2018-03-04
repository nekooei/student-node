/**
 * Created by milad on 10/28/17.
 */
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import ResponseGenerator from './util/responseGenerator';
import config from './config';
import routes from './routes';

let app = express();

app.server = http.createServer(app);

//middleware
app.use(bodyParser.json({
  limit: config.bodyLimit,
  type: '*/*'
}));


//api v1 routes
app.use('/', routes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(ResponseGenerator(false, "Invalid Token."));
  }
});
app.server.listen(config.application.port);
console.log(`we are listening on port no. ${config.application.port}`);

export default app;
