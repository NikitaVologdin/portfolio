import technologyType from "./technologyType";

export default interface projectType {
  name: string;
  github: string;
  category: string;
  duration: string;
  description: string;
  date: string;
  now: string;
  stack: technologyType[];
  color: string;
}
