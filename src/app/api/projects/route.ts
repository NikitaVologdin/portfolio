import { NextRequest, NextResponse } from "next/server";
import { Projects } from "@/models/projects";
import dbConnect from "@/lib/dbConnect";
import mongoose, { Model } from "mongoose";
import { uploadImage } from "@/lib/cloudinary";
import { revalidateTag } from "next/cache";

interface IFormDataProject {
  _id: string;
  name: string;
  github: string;
  start: string;
  present: string | boolean;
  end: string;
  image: File | string;
  skills: string;
  description: string;
}

async function createProjectBody<T>(
  req: NextRequest,
  Model: Model<T>,
  cloudinaryFolder: string
) {
  const formData = await req.formData();
  const image = formData.get("image") as File;
  const body = Object.fromEntries(
    formData.entries()
  ) as unknown as IFormDataProject;
  const skills = JSON.parse(body.skills) as string[];
  body.image = await uploadImage(image, [cloudinaryFolder]);
  body.start = new Date(body.start).toISOString().slice(0, 10);
  body.present = body.present === "on" ? true : false;
  if (body.end) {
    body.end = new Date(body.end).toISOString().slice(0, 10);
  }
  const document = new Model({ ...body, skills });
  await document.save();
  return document;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(
      formData.entries()
    ) as unknown as IFormDataProject;
    const skills = JSON.parse(body.skills) as string[];
    const image = formData.get("image") as File;
    const imageName = await uploadImage(image, ["projects"]);
    const startDate = new Date(body.start);
    let endDate;
    let diffTime;
    let project;
    const present = body.present === "on" ? true : false;
    if (body.end) {
      endDate = new Date(body.end);
      diffTime = endDate.getTime() - startDate.getTime();
      project = new Projects({
        ...body,
        image: imageName,
        start: startDate.toISOString().slice(0, 10),
        present,
        end: endDate.toISOString().slice(0, 10),
        duration: diffTime,
        skills,
      });
    } else {
      project = new Projects({
        ...body,
        image: imageName,
        start: startDate.toISOString().slice(0, 10),
        present,
        skills,
      });
    }
    skills.forEach((skill, index) => {
      new mongoose.Types.ObjectId(skill);
    });

    await project.save();
    revalidateTag("projects");
    return NextResponse.json({
      message: `${project.name} Project is created`,
      status: 200,
    });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message, code: 500 });
    }
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(
      formData.entries()
    ) as unknown as IFormDataProject;

    let skills = JSON.parse(body.skills) as string[];
    const image = formData.get("image") as File;
    const imageName = await uploadImage(image, ["projects"]);
    const startDate = new Date(body.start);
    const present = body.present === "on" ? true : false;
    let endDate;
    let diffTime;
    let query;
    if (body.end) {
      endDate = new Date(body.end);
      diffTime = endDate.getTime() - startDate.getTime();
      query = await Projects.findOneAndUpdate(
        { _id: body._id },
        {
          ...body,
          image: imageName,
          start: startDate.toISOString().slice(0, 10),
          present,
          end: endDate.toISOString().slice(0, 10),
          duration: diffTime,
          skills,
        }
      );
    } else {
      query = await Projects.findOneAndUpdate(
        { _id: body._id },
        {
          ...body,
          image: imageName,
          start: startDate.toISOString().slice(0, 10),
          present,
          skills,
        }
      );
    }
    if (query) {
      revalidateTag("projects");
      return NextResponse.json({
        message: `${query.name} project info has been uptated`,
        status: 200,
      });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
}
