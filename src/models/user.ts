import { Schema, model, models } from "mongoose";
import { IUser } from "@/types/User";

const userSchema = new Schema<IUser>({
  login: String,
  password: String,
  email: String,
});

export default models.User || model<IUser>("User", userSchema);
