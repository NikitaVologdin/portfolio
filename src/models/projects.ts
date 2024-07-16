import { Schema, model, models } from "mongoose";
import { IProject } from "@/types/Projects";

const projectSchema = new Schema<IProject>({
  name: String,
  category: String,
  github: String,
  start: String,
  end: String,
  duration: Number,
  present: Boolean,
  image: String,
  color: String,
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  description: String,
});

const Projects = models.Project || model<IProject>("Project", projectSchema);

export { Projects };
