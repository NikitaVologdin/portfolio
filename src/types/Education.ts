import { Document, Types } from "mongoose";
import { IFetchedSkill } from "./Skills";

export interface IEducation extends Document<Types.ObjectId> {
  name: string;
  university: string;
  location: string;
  start: string;
  end: string;
  present: boolean;
  duration: number;
  image: string;
  skills: string[];
  description: string;
}

export interface IFetchedEducation {
  _id: string;
  name: string;
  university: string;
  location: string;
  start: string;
  end: string;
  present: boolean;
  duration: number;
  image: string;
  skills: IFetchedSkill[];
  description: string;
}
