import { body } from 'express-validator';
import UserModel from '../models/user.model';

export const addUserValidation = [
  body('name', 'Please enter a valid name')
    .isString()
    .withMessage('Name must be a string')
    .isLength({
      min: 3,
    })
    .withMessage('Name must be at least 3 characters')
    .custom(async value => {
      // check the name value for regex - like only alphabets with spaces e.g - John Doe
      const regex = /^[a-zA-Z ]{2,30}$/;
      if (!regex.test(value)) {
        return Promise.reject('Name must be alphabets only');
      }
    }),
  body('phone', 'Invalid phone')
    .isInt()
    .withMessage('Phone must be a number')
    .custom(async value => {
      const doc = await UserModel.findOne({
        phone: value,
      });

      if (doc) {
        return Promise.reject('Account already exists with this phone number');
      }
    }),
  body('password')
    .isLength({
      min: 8,
    })
    .withMessage('Password must contain at least 8 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('must contain alphabets')
    .matches(/[A-Z]/)
    .withMessage('must contain an uppercase letter')
    .matches(/\d/)
    .withMessage('must contain a number')
    .matches(/[~!@#$%^&*()_+-=\\]/)
    .withMessage('must contain a special character'),
];

export const loginUserValidation = [
  body('phone', 'Invalid phone').isInt().withMessage('Phone must be a number'),
  body('password')
    .isLength({
      min: 8,
    })
    .withMessage('Password must contain at least 8 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('must contain alphabets')
    .matches(/[A-Z]/)
    .withMessage('must contain an uppercase letter')
    .matches(/\d/)
    .withMessage('must contain a number')
    .matches(/[~!@#$%^&*()_+-=\\]/)
    .withMessage('must contain a special character'),
];
