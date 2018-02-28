/**
 * Created by milad on 2/28/18.
 */
import Passport from 'passport';
import LocalStrategy from 'passport-local/lib/strategy';
import StudentProvider from '../routes/v1/provider/student';
import {comparePasswordWithHashed} from './encryption';

export default (database) => {
  const studentProviderInstance = new StudentProvider(database);
  Passport.use(new LocalStrategy({
      usernameField : 'nationalCode',
      passwordField : 'password'
    },
    (username, password, done) => {
      studentProviderInstance.getPasswordHash(username)
        .then(result => {
          if(result.length !== 0 && result.length === 1){
            const isTheSamePassword = comparePasswordWithHashed(password, result[0].passwordHash);
            if (isTheSamePassword){
              studentProviderInstance.getStudentByNationalCode(username)
                .then(resultStudent=> {
                  return done(null, resultStudent[0]);
                });
            }else {
              return done(null, false, { message: 'Incorrect password.' });

            }
          }else {
            return done(null, false, { message: 'Incorrect username.' });
          }
        });
    }
  ));

  Passport.serializeUser((user, done) => {
    done(null, user.nationalCode);
  });

  Passport.deserializeUser((id, done) => {
    studentProviderInstance.getStudentByNationalCode(id)
      .then(result => {
        if(result.length !== 0){
          done(null, result[0]);
        }else {
          const err = new Error('User Not Found');
          done(err, null);
        }
      });
  });
}