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

  getTermGroups(termId){
    return this.runFunction('crm', 'termGroup', 'getAllByTermId', {
      args : [termId]
    });
  }

  createServiceRequest(info){
    return this.runFunction('student', 'serviceRequest', 'create', {
      args: [info.studentId, info.termGroupId, info.distance, info.homeLocation, info.address
        , info.totalPrice, info.discountPrice, info.finalPrice, 'NOT_PAID']
    });
  }

  getSchoolBySchoolId(schoolId){
    return this.runFunction('crm', 'school', 'find', {
      args : [schoolId]
    });
  }


}

export default StudentModel;