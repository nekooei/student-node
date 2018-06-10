import MyModel from './myModel';


class PaymentModel extends MyModel{
  constructor(database){
    super({
      name: 'payment',
      database
    });
  }

  createNewPayment(gatewayId, amount, transId, serviceRequestId, studentId, factorNum){
    return this.runFunction('student', this.name, 'create', {
      args: [studentId, serviceRequestId, gatewayId, transId,  amount, factorNum]
    });
  }

  setDetail(transId, detail){
    return this.runFunction('student', this.name, 'updateDetail', {
      args : [transId, detail]
    })
  }

  getByTransId(transId){
    return this.runFunction('student', this.name, 'findByTransId', {
      args: [String(transId)]
    })
  }

  verifyPayment(transId, verify=true){
    return this.runFunction('student', this.name, 'verify', {
      args: [String(transId), verify]
    })
  }




}

export default PaymentModel;