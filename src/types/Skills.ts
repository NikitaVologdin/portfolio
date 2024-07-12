import { Document, Types } from "mongoose";
export default interface skillType {
  name: string;
}
export interface ISkillsGroup extends Document<Types.ObjectId> {
  name: string;
  skills: ISkill[];
}

export interface ISkill extends Document<Types.ObjectId> {
  name: string;
  group: ISkillsGroup;
  image: string;
  color: string;
  description: string;
}

export interface IFetchedSkill {
  _id: string;
  name: string;
  group: IFetchedSkillsGroup;
  image: string;
  color: string;
  description: string;
}

export interface IFetchedSkillsGroup {
  _id: string;
  name: string;
  skills: IFetchedSkill[];
}
