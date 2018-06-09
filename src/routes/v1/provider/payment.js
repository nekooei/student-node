/**
 * Created by milad on 3/16/18.
 */
import PaymentModel from "../../../model/payment";

export default class PaymentProvider {
  constructor(database) {
    this.model = new PaymentModel(database);
  }

  async createNewPayment({gatewayId, amount, transId, serviceRequestId, studentId}){
    return this.model.createNewPayment(gatewayId, amount, transId, serviceRequestId, studentId);
  }

}