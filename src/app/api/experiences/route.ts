import { Experiences } from "@/models/experience";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

interface IFormDataExperience {
  _id: string;
  name: string;
  start: string;
  present: string;
  end: string;
  image: File;
  skills: string;
  description: string;
}

async function createImage(fd: FormData, body: IFormDataExperience) {
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
    path.join(process.cwd(), "public/experiences/" + imageName),
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
    ) as unknown as IFormDataExperience;
    const skills = JSON.parse(body.skills) as string[];
    skills.forEach((skill, index) => {
      new mongoose.Types.ObjectId(skill);
    });
    const imageName = await createImage(formData, body);
    const startDate = new Date(body.start);
    let endDate;
    let diffTime;
    let experience;
    let present = body.present === "on" ? true : false;
    if (body.end) {
      endDate = new Date(body.end);
      diffTime = endDate.getTime() - startDate.getTime();

      experience = new Experiences({
        ...body,
        image: imageName,
        start: startDate.toISOString().slice(0, 10),
        end: endDate.toISOString().slice(0, 10),
        duration: diffTime,
        skills,
        present,
      });
    } else {
      experience = new Experiences({
        ...body,
        image: imageName,
        start: startDate.toISOString().slice(0, 10),
        end: undefined,
        duration: undefined,
        skills,
        present,
      });
    }
    await experience.save();
    return NextResponse.json({
      message: `${experience.name} experience is created`,
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
    ) as unknown as IFormDataExperience;

    const skills = JSON.parse(body.skills) as string[];
    skills.forEach((skill, index) => {
      new mongoose.Types.ObjectId(skill);
    });
    const imageName = await createImage(formData, body);
    const startDate = new Date(body.start);
    let endDate;
    let difTime;
    let present = body.present === "on" ? true : false;
    if (body.end) {
      endDate = new Date(body.end);
      difTime = endDate.getTime() - startDate.getTime();
      await Experiences.findOneAndUpdate(
        { _id: body._id },
        {
          ...body,
          image: imageName,
          start: startDate.toISOString().slice(0, 10),
          end: endDate.toISOString().slice(0, 10),
          duration: difTime,
          skills,
          present,
        },
        {
          new: true,
        }
      );
    } else {
      await Experiences.findOneAndUpdate(
        { _id: body._id },
        {
          ...body,
          image: imageName,
          start: startDate.toISOString().slice(0, 10),
          end: undefined,
          duration: undefined,
          skills,
          present,
        },
        {
          new: true,
        }
      );
    }

    return NextResponse.json({
      message: "Experience info has been uptated",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
}
