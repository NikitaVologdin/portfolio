import { Schema, model, models, Document } from "mongoose";
import { IDeveloper } from "@/types/Developer";

const developerSchema = new Schema<IDeveloper>({
  name: String,
  description: String,
});

export default models.Developer ||
  model<IDeveloper>("Developer", developerSchema);
