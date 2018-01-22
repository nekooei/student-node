/**
 * Created by milad on 1/22/18.
 */
import { Router } from 'express';

export default ({config, database}) => {
  let api = new Router();

  api.get('/', (req, res) => {
    res.send({
      message: 'greeting'
    });
  });

  return api;
}