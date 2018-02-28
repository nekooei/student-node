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
      args: [args.passwordHash, args.fullName, args.nationalCode, args.email, args.homeLocation, args.address, args.gender,
              args.description, args.birthDate, args.postCode, args.birthPlace, true, args.phoneNumber, args.mobileNumber]
    });

  }

  getPasswordHash(nationalCode){
    return this.runFunction('getPasswordHash', {
      args : [nationalCode]
    });
  }


}

export default StudentModel;