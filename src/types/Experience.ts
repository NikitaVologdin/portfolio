import { Document, Types } from "mongoose";
import { IFetchedSkill } from "./Skills";

export interface IExperience extends Document<Types.ObjectId> {
  name: string;
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
  start: string;
  end: string;
  present: boolean;
  duration: number;
  color: string;
  image: string;
  skills: IFetchedSkill[];
  description: string;
}
