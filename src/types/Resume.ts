import { Document, Types } from "mongoose";

export interface IResume extends Document<Types.ObjectId> {
  name: string;
  file: string;
}

export interface IFetchedResume {
  _id: string;
  name: string;
  file: string;
}
