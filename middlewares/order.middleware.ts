import { NextFunction, Request, Response } from 'express';
import { body, check, param } from 'express-validator';
import { verifyToken } from '../utils/order.helper';

const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const bearerToken = req.headers.authorization;
    const jwtToken = bearerToken.split(' ')[1];
    try {
      const payload = verifyToken(jwtToken);
      req.payload = payload;
      next();
    } catch (error) {
      return res.status(403).json({
        message: 'Invalid jwt token in the header',
      });
    }
  } else {
    return res.status(403).json({
      message: 'No jwt token in the header',
    });
  }
};

export const addOrderValidation = [
  verifyTokenMiddleware,
  body('sub_total', 'Sub total is required').exists().isInt().withMessage('Sub total must be a number'),
];

export const getOrderValidation = [
  verifyTokenMiddleware,
  param('user_id', 'User id is required').exists().isString().withMessage('User id must be a string'),
];
