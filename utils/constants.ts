import { JwtPayload } from 'jsonwebtoken';

export const PORT = process.env.PORT || 3000;
export const Model_Names = {
  userModel: 'User',
  orderModel: 'Order',
};
export const JWT_SECRET = process.env.JWT_SECRET ?? 'SUPER_SECRET_RECIPE';
export const JWT_EXPIRE = process.env.JWT_EXPIRES_IN ?? '7d';

export interface IPayload {
  name: string;
  uuid: string;
  phone: string;
}

export interface IJWTPayload extends IPayload, JwtPayload {}
