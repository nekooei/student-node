import MyModel from './myModel';

class ServiceModel extends MyModel {

  constructor(database){
    super({
      name: 'serviceRequest',
      database
    });
  }


}

export default ServiceModel;