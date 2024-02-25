import skillType from "./skillType";

export default interface educationCardType {
  course: string;
  university: string;
  location: string;
  duration: string;
  skills: skillType[];
  color: string;
}
