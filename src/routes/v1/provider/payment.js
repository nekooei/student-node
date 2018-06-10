/**
 * Created by milad on 3/16/18.
 */
import PaymentModel from "../../../model/payment";

export default class PaymentProvider {
  constructor(database) {
    this.model = new PaymentModel(database);
  }

  async createNewPayment({gatewayId, amount, transId, serviceRequestId, studentId, factorNum}){
    return this.model.createNewPayment(gatewayId, amount, transId, serviceRequestId, studentId, factorNum);
  }

  async getByTransId(transId){
    const paymentRecord = await this.model.getByTransId(transId);
    return paymentRecord.length ? paymentRecord[0] : null;
  }

  async verify(transId){
    const verificationRecord = await this.model.verifyPayment(transId);
    return verificationRecord.length ? verificationRecord[0] : null;
  }

}