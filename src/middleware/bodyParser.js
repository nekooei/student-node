/**
 * Created by milad on 2/8/18.
 */
import {check} from 'express-validator/check';

export const checkRegisterSchema = () =>  [
  check('nationalCode', 'National Code is required').trim()
    .isNumeric().withMessage('National Code Cannot Contains Alphabets ')
    .isLength({min: 10, max:10}).withMessage('National Code must only 10 digits')
];

