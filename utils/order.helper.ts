import { verify } from 'jsonwebtoken';
import { IJWTPayload, JWT_SECRET } from './constants';

export const verifyToken = (token: string) => {
  try {
    const decoded = verify(token, JWT_SECRET) as IJWTPayload;
    return decoded;
  } catch (error) {
    throw error;
  }
};
