import { Request } from "express";


export interface IUser {
    _id?: string;
    userId?: string;
    username: string;
    email: string;
    password: string;
  }

  export interface AuthRequest extends Request {
    user?: IUser; 
  }