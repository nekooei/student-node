import MyModel from './myModel';


class PaymentModel extends MyModel{
  constructor(database){
    super({
      name: 'payment',
      database
    });
  }

  createNewPayment(gatewayId, amount, transId, serviceRequestId, studentId){
    return this.runFunction('student', this.name, 'create', {
      args: [studentId, serviceRequestId, gatewayId, transId,  amount]
    });
  }

  setDetail(transId, detail){
    return this.runFunction('student', this.name, 'updateDetail', {
      args : [transId, detail]
    })
  }

  getByTransId(transId){
    return this.runFunction('student', this.name, 'findByTransId', {
      args: [transId]
    })
  }

  verifyPayment(transId, verify=true){
    return this.runFunction('student', this.name, 'verify', {
      args: [transId, verify]
    })
  }




}

export default PaymentModel;