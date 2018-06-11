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

  getTermGroupById(termGroupId){
    return this.runFunction('crm', 'termGroup', 'getById', {
      args: [termGroupId]
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

  getTermInformation(termId){
    return this.runFunction('crm', 'schoolTerm', 'find', {
      args: [termId]
    });
  }

  createPaymentRecord(amount, resNum){
    return this.runFunction('student', 'serviceRequestPayment', 'create',{
      args : [resNum, amount]
    })
  }

  setTokentForPaymentRequest(paymentId, token){
    return this.runFunction('student', 'serviceRequestPayment', 'storeToken',{
      args : [paymentId, token]
    })
  }

  chargeCredit(studentId, paymentId){
    return this.runFunction('student', 'student', 'chargeCreditByPayment', {
      args: [studentId, paymentId]
    })
  }

  payServiceRequest(serviceRequestId, paymentId){
    return this.runFunction('crm', 'serviceRequest', 'pricePaid', {
      args: [serviceRequestId, paymentId]
    });
  }

  getCurrentService(studentId, currentDate){
    return this.runFunction('student', 'service', 'getStudentCurrentService', {
      args: [studentId, currentDate]
    })
  }


}

export default StudentModel;