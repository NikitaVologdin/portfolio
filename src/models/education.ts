import { Schema, model, models } from "mongoose";
import { IEducation } from "@/types/Education";
import { Skill } from "./skills";

const educationSchema = new Schema<IEducation>({
  name: String,
  university: String,
  location: String,
  start: String,
  end: String,
  present: Boolean,
  duration: Number,
  image: String,
  skills: [{ type: Schema.Types.ObjectId, ref: Skill }],
  description: String,
});

const EducationModel =
  models.Education || model<IEducation>("Education", educationSchema);

export { EducationModel };
