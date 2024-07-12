import { Schema, model, models, Document } from "mongoose";
import { IEducation } from "@/types/Education";

const educationSchema = new Schema<IEducation>({
  name: String,
  start: String,
  end: String,
  present: Boolean,
  duration: Number,
  image: String,
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
});

const EducationModel =
  models.Education || model<IEducation>("Education", educationSchema);

export { EducationModel };
