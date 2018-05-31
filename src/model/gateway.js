import MyModel from './myModel';

class GatewayModel extends MyModel{
  constructor(database){
    super({
      name: 'gateway',
      database
    });
  }

  getAllActiveGateways(){
    return this.runFunction('student', this.name, 'getAll')
  }

}

export default GatewayModel;