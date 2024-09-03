import { NextRequest } from "next/server";
import { Model } from "mongoose";
import { uploadImage } from "@/lib/cloudinary";

interface IFormData {
  _id: string;
  name: string;
  github?: string;
  start: string;
  present?: string | boolean;
  end?: string;
  image: File | string;
  skills: string;
  preview?: string;
  description: string;
}

export default async function updateDocument<TModel>(
  req: NextRequest,
  Model: Model<TModel>,
  cloudinaryFolder: string
) {
  const formData = await req.formData();
  const image = formData.get("image") as File;
  const body = Object.fromEntries(formData.entries()) as unknown as IFormData;
  const skills = JSON.parse(body.skills) as string[];
  body.image = await uploadImage(image, [cloudinaryFolder]);
  if (screenshots.length) {
    body.screenshots = await uploadScreenshots(screenshots, [
      `${cloudinaryTag}-screenshots`,
    ]);
  }
  body.start = new Date(body.start).toISOString().slice(0, 10);
  body.present = body.present === "on" ? true : false;
  if (body.end) {
    body.end = new Date(body.end).toISOString().slice(0, 10);
  }
  const document = await Model.findOneAndUpdate(
    { _id: body._id },
    {
      ...body,
      skills,
    },
    {
      new: true,
    }
  );
  if (!document) {
    throw new Error("Cannot find document to update");
  }
  await document.save();
  return document;
}
