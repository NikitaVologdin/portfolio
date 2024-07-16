import { Document, Types } from "mongoose";
import { IFetchedSkill } from "./Skills";

export interface IExperience extends Document<Types.ObjectId> {
  name: string;
  company: string;
  location: string;
  contract: string;
  start: string;
  end: string;
  present: boolean;
  duration: number;
  color: string;
  image: string;
  skills: string[];
  description: string;
}

export interface IFetchedExperience {
  _id: string;
  name: string;
  company: string;
  location: string;
  contract: string;
  start: string;
  present: boolean;
  end: string;
  duration: number;
  color: string;
  image: string;
  skills: IFetchedSkill[];
  description: string;
}
