/**
 * Created by milad on 10/28/17.
 */
import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initDb from '../db';
import V1Routes from './v1';
import cors from 'cors';

let router = express();


//connect to db
initDb(database => {
    router.use(cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    }));
    router.use(middleware({config, database}));
    router.use('/v1/', V1Routes({config, database}))
});


export default router;