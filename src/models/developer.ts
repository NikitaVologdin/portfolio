import { Schema, model, models, Document } from "mongoose";

export interface IDeveloper extends Document {
  name: string;
  description: string;
}

const developerSchema = new Schema<IDeveloper>({
  name: String,
  description: String,
});

export default models.Developer ||
  model<IDeveloper>("Developer", developerSchema);
