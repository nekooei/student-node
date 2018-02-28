/**
 * Created by milad on 2/8/18.
 */
import {check} from 'express-validator/check';

export const checkRegisterSchema = () =>  [
  check('nationalCode', 'National Code is required').trim()
    .isNumeric().withMessage('National Code Cannot Contains Alphabets ')
    .isLength({min: 10, max:10}).withMessage('National Code must only 10 digits')
];

export const registerSchema = () => [
  check('email', 'required').isEmail().withMessage('Email is invalid').trim().normalizeEmail(),
  check('password', 'Must to set password')
    .isLength({min: 5})
    .withMessage('Password must have more than 5 characters')
    .matches(/\d/)
    .withMessage('Password must have minimum one digit'),
  check('homeLocation').trim().matches(/\(\d+\.\d+,\d+\.\d+\)/).withMessage('Invalid Point'),
  check('nationalCode', 'National Code cannot be empty').isLength({
    min: 10,
    max: 10
  }).withMessage('Invalid National Code'),
  check('fullName','FullName cannot be empty').trim(),
  check('address','Address cannot be empty').trim(),
  check('gender','gender must selected').trim(),
  check('description').trim().isLength({min: 0}),
  check('birthDate', 'Birth Date required').trim().isLength({min: 8, max: 8}).withMessage('invalid birthDate format'),
  check('postCode').trim().isLength({min: 10, max: 10}),
  check('birthPlace').trim()
];

export const loginSchema = () => [
  check('nationalCode', 'National Code cannot be empty').isLength({
    min: 10,
    max: 10
  }).withMessage('Invalid National Code'),
  check('password', 'Must to set password')
    .isLength({min: 5})
    .withMessage('Password must have more than 5 characters')
    .matches(/\d/)
    .withMessage('Password must have minimum one digit')
];