import { Document, Types } from "mongoose";

export interface IUser extends Document {
  login: string;
  password: string;
  email: string;
}

export interface IFetchedUser extends Document {
  _id: Types.ObjectId;
  login: string;
  password: string;
  email: string;
}
