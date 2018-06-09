import {Router} from "express";
import authMiddleWare from '../../../middleware/authentication';
import PayIR from '../../../util/payir'
import PaymentProvider from '../provider/payment';
import GatewayProvider from "../provider/gateway";
import ResponseGenerator from "../../../util/responseGenerator";


export default ({config, database}) => {
  let api = new Router();
  const paymentProviderInstance = new PaymentProvider(database);
  const gatewayProviderInstance = new GatewayProvider(database);

  api.post('/init', authMiddleWare.authenticate ,async (req, res) => {
    try{
      const gatewayDetail = await gatewayProviderInstance.getById(req.body.gatewayId);
      if(gatewayDetail.length === 0){
        throw new URIError('No Gateway Found');
      }else {
        const gatewayHandler = new PayIR(gatewayDetail[0].apikey);
        const factorNum = `${String(Date.now())}-${req.body.amount}-${req.user.id}`;
        const transId = await gatewayHandler.send(req.body.amount, 'http://sapi.development.sas/v1/payment/verify', factorNum);
        const paymentRecord = await paymentProviderInstance.createNewPayment({...req.body, transId: String(transId), studentId: req.user.id});
        res.json(ResponseGenerator(true, 'payment', paymentRecord[0]));


      }
    }catch (e) {
      res.json(ResponseGenerator(false, e.message, e));
    }
  });

  api.get('/start/:transId', (req, res) => {
    res.redirect(`https://pay.ir/payment/gateway/${req.params.transId}`);
  });

  api.post('/verify', async(req, res) => {
    console.log(req.body);
    res.json({...req.body});
    res.redirect('http://student.development.sas/panel/success')
  });

  return api;

}