/**
 * Created by milad on 1/22/18.
 */
import MyModel from './myModel';

class StudentModel extends MyModel{

  constructor(database){
    super({
      name: 'student',
      database
    });
  }

  findByNationalCode(nationalCode){
    return this.runFunction('findByNationalCode',{
      args: [nationalCode]
    });
  }
  register(args){
    return this.runFunction('createNewStudent', {
      args: args
    });

  }



}

export default StudentModel;