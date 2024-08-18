import { Document } from "mongoose";

export interface IDeveloper extends Document {
  name: string;
  description: string;
}

export interface IFetchedDeveloper extends Document {
  _id: string;
  name: string;
  description: string;
}
