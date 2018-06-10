/**
 * Created by milad on 1/22/18.
 */
import StudentModel from '../../../model/student';
import * as Encryption  from '../../../util/encryption';
import JMoment from 'jalali-moment';

class StudentProvider {
  constructor(database){
    this.model = new StudentModel(database);
  }

  checkRegistration(nationalCode){
    return this.model.findByNationalCode(nationalCode);
  }
  register({password, fullName, nationalCode, email, homeLocation
             , address, gender, description, birthDate, postCode, birthPlace, phoneNumber, mobileNumber}) {
    let information = arguments[0];
    information = {
      ...information,
      passwordHash : Encryption.generatePasswordHash(information.password),
      password : undefined
    };
    return this.model.register(information);

  }

  getPasswordHash(nationalCode){
    return this.model.getPasswordHash(nationalCode);
  }

  getStudentByNationalCode(nationalCode){
    return this.model.findByNationalCode(nationalCode);
  }

  getAllAvailableSchool(){
    return this.model.getAvailabeSchools();
  }

  getOpenTermOfSchool(schoolId){
   return this.model.getOpenEnrollTermOfSchool(schoolId, JMoment(Date.now()).format('jYYYYjMMjDD'));
  }

  getSchool(schoolId){
    return this.model.getSchoolBySchoolId(schoolId);
  }

  getTermGroups(termId){
    return this.model.getTermGroups(termId);
  }

  getStudentInfo(studentId){
    return this.model.getById(studentId);
  }

  async getTermPriceUnit(termId){
    const termInfo = await this.model.getTermInformation(termId);
    return termInfo[0].priceUnits[0];
  }


  async getTermGroup(termGroupId){
    const termGroup = await this.model.getTermGroupById(termGroupId);
    return termGroup[0];
  }

  async createServiceRequest(serviceRequestInfo){
    const studentInfo = await this.getStudentInfo(serviceRequestInfo.studentId);
    this.getStudentInfo(serviceRequestInfo.studentId);
    serviceRequestInfo.homeLocation = `(${studentInfo.homeLocation.x},${studentInfo.homeLocation.y})`;
    serviceRequestInfo.address = studentInfo.address;
    return this.model.createServiceRequest(serviceRequestInfo);
  }

  async chargeCredit(studentId, paymentId){
    try {
      const chargeResult = await this.model.chargeCredit(studentId, paymentId);
      return chargeResult.length ? chargeResult[0]['student_student_chargeCreditByPayment'] : null;
    }catch (e) {
      return null;
    }
  }

  async payServiceRequest(serviceRequestId, paymentId){
    try{
      const paymentResult = await this.model.payServiceRequest(serviceRequestId, paymentId);
      return paymentResult.length ? paymentResult[0]['crm_serviceRequest_pricePaid'] : null;
    }catch (e) {
      return null
    }
  }
}


export default StudentProvider;