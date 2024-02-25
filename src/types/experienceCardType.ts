import technologyType from "./technologyType";

export default interface experienceCardType {
  position: string;
  company: string;
  location: string;
  contract: string;
  description: string;
  stack: technologyType[];
  color: string;
}
