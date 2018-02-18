/**
 * Created by milad on 1/22/18.
 */
import StudentModel from '../../../model/student';
import * as Encryption  from '../../../util/encryption';

class StudentProvider {
  constructor(database){
    this.model = new StudentModel(database);
  }

  checkRegistration(nationalCode){
    return this.model.findByNationalCode(nationalCode);
  }
  register({password, fullName, nationalCode, email, homeLocation
             , address, gender, description, birthDate, postCode, birthPlace}) {
    let information = arguments[0];
    information = {
      ...information,
      passwordHash : Encryption.generatePasswordHash(information.password),
      password : undefined
    };
    return this.model.register(information);

  }
}


export default StudentProvider;