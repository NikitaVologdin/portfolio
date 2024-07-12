import { Schema, model, models, Document } from "mongoose";
import { IExperience } from "@/types/Experience";

const experienceSchema = new Schema<IExperience>({
  name: String,
  start: String,
  end: String,
  present: Boolean,
  duration: Number,
  color: String,
  image: String,
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  description: String,
});

const Experiences =
  models.Experience || model<IExperience>("Experience", experienceSchema);

export { Experiences };
