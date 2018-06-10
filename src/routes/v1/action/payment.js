import {Router} from "express";
import authMiddleWare from '../../../middleware/authentication';
import PayIR from '../../../util/payir'
import PaymentProvider from '../provider/payment';
import GatewayProvider from "../provider/gateway";
import StudentProvider from "../provider/student";
import ResponseGenerator from "../../../util/responseGenerator";


export default ({config, database}) => {
  let api = new Router();
  const paymentProviderInstance = new PaymentProvider(database);
  const gatewayProviderInstance = new GatewayProvider(database);
  const studentProviderInstance = new StudentProvider(database);

  api.post('/init', authMiddleWare.authenticate, async (req, res) => {
    try {
      const gatewayDetail = await gatewayProviderInstance.getById(req.body.gatewayId);
      if (!gatewayDetail) {
        throw new URIError('No Gateway Found');
      } else {
        const gatewayHandler = new PayIR(gatewayDetail.apikey);
        const factorNum = `${String(Date.now())}-${req.body.amount}-${req.user.id}-${req.body.serviceRequestId}`;
        const transId = await gatewayHandler.send(req.body.amount, `http://sapi.randoapp.ir/v1/payment/verify/${req.body.gatewayId}`, factorNum);
        const paymentRecord = await paymentProviderInstance.createNewPayment({
          ...req.body,
          transId: String(transId),
          studentId: req.user.id,
          factorNum
        });
        res.json(ResponseGenerator(true, 'payment', paymentRecord[0]));


      }
    } catch (e) {
      res.json(ResponseGenerator(false, e.message, e));
    }
  });

  api.get('/start/:transId', (req, res) => {
    res.redirect(`https://pay.ir/payment/gateway/${req.params.transId}`);
  });

  api.post('/verify/:gatewayId', async (req, res) => {
    if (req.body.status == 1) {
      console.log('hello start');
      const paymentRecord = await paymentProviderInstance.getByTransId(req.body.transId);
      console.log(paymentRecord);
      if (paymentRecord && !paymentRecord.verified) {
        const gatewayDetail = await gatewayProviderInstance.getById(req.params.gatewayId);
        if (gatewayDetail) {
          const gatewayHandler = new PayIR(gatewayDetail.apikey);
          try{
            const verifyResult = await gatewayHandler.verify(req.body);
            if(verifyResult){
              const verifyInDbRes = await paymentProviderInstance.verify(req.body.transId);
              if(verifyInDbRes){
                const setDetail = await paymentProviderInstance.setDetail(req.body.transId, req.body);
                const info = req.body.factorNum.split('-');
                const chargeResult = await studentProviderInstance.chargeCredit(parseInt(info[2]), verifyInDbRes.id);
                console.log(chargeResult);
                if(chargeResult){
                  const payServiceRequest = await studentProviderInstance.payServiceRequest(info[3], verifyInDbRes.id);
                  if (payServiceRequest) {
                    console.log(payServiceRequest);
                    res.redirect(`${config.applicationBaseUrl}/panel/success`);
                  }else {
                    res.redirect(`${config.applicationBaseUrl}/panel/invalidPaymentInformation`);
                  }
                }else {
                  res.redirect(`${config.applicationBaseUrl}/panel/invalidPaymentInformation`);
                }
              }else {
                res.redirect(`${config.applicationBaseUrl}/panel/invalidPaymentInformation`);
              }
            }
          }catch (e) {
            res.redirect(`${config.applicationBaseUrl}/panel/invalidPaymentInformation`);
          }
        } else {
          res.redirect(`${config.applicationBaseUrl}/panel/invalidPaymentInformation`);
        }
      } else {
        res.redirect(`${config.applicationBaseUrl}/panel/expiredPayment`);
      }
    } else {
      res.redirect(`${config.applicationBaseUrl}/panel/failure`);
    }
  });

  return api;

}