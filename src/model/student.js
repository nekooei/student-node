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
    return this.runFunction('crm', this.name,'findByNationalCode',{
      args: [nationalCode]
    });
  }
  register(args){
    return this.runFunction('crm', this.name, 'createNewStudent', {
      args: [args.passwordHash, args.fullName, args.nationalCode, args.email, args.homeLocation, args.address, args.gender,
              args.description, args.birthDate, args.postCode, args.birthPlace, true, args.phoneNumber, args.mobileNumber]
    });

  }

  getPasswordHash(nationalCode){
    return this.runFunction('crm', this.name, 'getPasswordHash', {
      args : [nationalCode]
    });
  }

  getAvailabeSchools(){
    return this.runFunction('crm', 'school', 'getAll');
  }

  getOpenEnrollTermOfSchool(schoolId, currentDate){
    return this.runFunction('crm', 'schoolTerm', 'findOneOpenEnrolmentSchoolTermBySchoolId', {
      args: [schoolId, currentDate]
    });
  }


}

export default StudentModel;