import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { Projects } from "@/models/projects";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

interface IFormDataProject {
  _id: string;
  name: string;
  github: string;
  start: string;
  end: string;
  image: File;
  skills: string;
  description: string;
}

async function createImage(fd: FormData, body: IFormDataProject) {
  const image = fd.get("image") as File;
  if (!image || !(image instanceof File)) {
    throw new Error("No image received");
  }

  if (image.size === 0) {
    const imageName = body.image.name;
    return imageName;
  }

  const buffer = Buffer.from(await image.arrayBuffer());
  const imageName = image.name.replaceAll(" ", "_");
  await writeFile(
    path.join(process.cwd(), "public/projects/" + imageName),
    buffer
  );
  return imageName;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(
      formData.entries()
    ) as unknown as IFormDataProject;
    const skills = JSON.parse(body.skills) as string[];
    const imageName = await createImage(formData, body);
    const startDate = new Date(body.start);
    const endDate = new Date(body.end);
    const difTime = endDate.getTime() - startDate.getTime();
    skills.forEach((skill, index) => {
      new mongoose.Types.ObjectId(skill);
    });
    const project = new Projects({
      ...body,
      image: imageName,
      start: startDate.toISOString().slice(0, 10),
      end: endDate.toISOString().slice(0, 10),
      duration: difTime,
      skills,
    });
    await project.save();
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
    const imageName = await createImage(formData, body);
    console.log(body);
    const startDate = new Date(body.start);
    const endDate = new Date(body.end);
    const difTime = endDate.getTime() - startDate.getTime();
    const query = await Projects.findOneAndUpdate(
      { _id: body._id },
      {
        ...body,
        image: imageName,
        start: startDate.toISOString().slice(0, 10),
        end: endDate.toISOString().slice(0, 10),
        duration: difTime,
        skills,
      },
      {
        new: true,
      }
    );
    if (query) {
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
