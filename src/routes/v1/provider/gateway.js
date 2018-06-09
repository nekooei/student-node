/**
 * Created by milad on 3/16/18.
 */
import GatewayModel from "../../../model/gateway";
import soap from "soap";
import config from "./gateway.conf";

export default class GatewayProvider {
  constructor(database) {
    this.model = new GatewayModel(database);

  }

  async requestGatewayToken(amount, resNum) {
    const initPaymentRes = await this.model.createPaymentRecord(amount, resNum);
    if(initPaymentRes.length !== 0){
      this.gatewayClient = await soap.createClientAsync(config.soapClientURI);
      const tokenResult = await this.gatewayClient.RequestTokenAsync({
        TermID: config.merchantID,
        ResNUM: resNum,
        TotalAmount: amount
      });
      const paymentInstance = await this.model.setTokentForPaymentRequest(initPaymentRes[0].id, tokenResult.result['$value']);
      return paymentInstance;
    }

  }

  async getAllGateways(){
    const gateways = await this.model.getAllActiveGateways();
    return gateways;
  }

  async getById(id){
    const gateway = await this.model.getById(id);
    return gateway;
  }

}