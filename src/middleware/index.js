/**
 * Created by milad on 1/22/18.
 */
import {Router} from 'express';

export default ({ config, database }) => {
  let api = new Router();


  // all global middleware come here
  // like handling Unauthorized error from express-jwt

  return api;
}