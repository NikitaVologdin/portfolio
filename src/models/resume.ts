import { Schema, model, models } from "mongoose";
import { IResume } from "@/types/Resume";

const resumeSchema = new Schema<IResume>({
  name: String,
  file: String,
});

const Resume = models.Resume || model<IResume>("Resume", resumeSchema);

export { Resume };
