declare namespace Express {
  export interface IPayload {
    name: string;
    uuid: string;
    phone: string;
  }

  export interface IJWTPayload extends IPayload, JwtPayload {}

  export interface Request {
    payload: IJWTPayload;
  }
}
