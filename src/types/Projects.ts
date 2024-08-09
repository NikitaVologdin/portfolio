import { Document, Types } from "mongoose";
import { IFetchedSkill } from "./Skills";

export interface IProject extends Document<Types.ObjectId> {
  name: string;
  category: string;
  github: string;
  link: string;
  start: string;
  end: string;
  present: boolean;
  duration: number;
  color: string;
  image: string;
  skills: string[];
  description: string;
}

export interface IFetchedProject {
  _id: string;
  name: string;
  category: string;
  github: string;
  link?: string;
  start: string;
  end: string;
  present: boolean;
  duration: number;
  color: string;
  image: string;
  skills: IFetchedSkill[];
  description: string;
}
