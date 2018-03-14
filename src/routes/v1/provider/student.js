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

  getScholl(schoolId){
    return this.model.getSchoolBySchoolId(schoolId);
  }

  getTermGroups(termId){
    return this.model.getTermGroups(termId);
  }

  getStudentInfo(studentId){
    return this.model.getById(studentId);
  }

  async createServiceRequest(serviceRequestInfo){
    const studentInfo = await this.getStudentInfo(serviceRequestInfo.studentId);
    this.getStudentInfo(serviceRequestInfo.studentId);
    serviceRequestInfo.homeLocation = `(${studentInfo.homeLocation.x},${studentInfo.homeLocation.y})`;
    serviceRequestInfo.address = studentInfo.address;
    return this.model.createServiceRequest(serviceRequestInfo);
  }
}


export default StudentProvider;