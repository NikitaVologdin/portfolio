import { NextRequest } from "next/server";
import { Model } from "mongoose";
import { uploadImage, uploadScreenshots } from "@/lib/cloudinary";

interface IFormData {
  name: string;
  github?: string;
  start: string;
  present?: string | boolean;
  end?: string;
  image: File | string;
  skills: string;
  preview?: string;
  description: string;
  screenshots: File[] | string[];
}

export default async function createNewDocument<TModel>(
  req: NextRequest,
  Model: Model<TModel>,
  cloudinaryTag: string
) {
  const formData = await req.formData();
  const image = formData.get("image") as File;
  const screenshots = formData.getAll("screenshots");
  const body = Object.fromEntries(formData.entries()) as unknown as IFormData;
  const skills = JSON.parse(body.skills) as string[];
  if (screenshots.length) {
    body.screenshots = await uploadScreenshots(screenshots, [
      `${cloudinaryTag}-screenshots`,
    ]);
  }
  body.image = await uploadImage(image, [cloudinaryTag]);
  body.start = new Date(body.start).toISOString().slice(0, 10);
  body.present = body.present === "on" ? true : false;
  if (body.end) {
    body.end = new Date(body.end).toISOString().slice(0, 10);
  }

  const document = new Model({ ...body, skills });
  await document.save();
  return document;
}
