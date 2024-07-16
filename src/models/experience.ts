import { Schema, model, models, Document } from "mongoose";
import { IExperience } from "@/types/Experience";

const experienceSchema = new Schema<IExperience>({
  name: String,
  company: String,
  location: String,
  contract: String,
  start: String,
  present: Boolean,
  end: String,
  duration: Number,
  color: String,
  image: String,
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  description: String,
});

const Experiences =
  models.Experience || model<IExperience>("Experience", experienceSchema);

export { Experiences };
