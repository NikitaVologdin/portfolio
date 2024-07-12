import { Document, Types } from "mongoose";
import { IFetchedSkill } from "./Skills";

export interface IProject extends Document<Types.ObjectId> {
  name: string;
  github: string;
  start: string;
  end: string;
  duration: number;
  color: string;
  image: string;
  skills: string[];
  description: string;
}

export interface IFetchedProject {
  _id: string;
  name: string;
  github: string;
  start: string;
  end: string;
  duration: number;
  color: string;
  image: string;
  skills: IFetchedSkill[];
  description: string;
}
