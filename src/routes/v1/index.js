/**
 * Created by milad on 1/22/18.
 */
import Express from 'express';
import StudentActionsCreator from './action/student';
import PaymentActionCreator from './action/payment';
import GatewayActionCreator from './action/gateway';


export default ({config, database}) => {
  let router = new Express();

  router.use('/student', StudentActionsCreator({config, database}));

  router.use('/payment', PaymentActionCreator({ config, database}));

  router.use('/gateway', GatewayActionCreator({ config, database}));

  return router;
}