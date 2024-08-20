import { Experiences } from "@/models/experience";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { uploadImage } from "@/lib/cloudinary";
import { revalidateTag } from "next/cache";

interface IFormDataExperience {
  _id: string;
  name: string;
  start: string;
  present: string | boolean;
  end: string;
  image: File | string;
  skills: string;
  description: string;
}

async function createExperienceBody(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image") as File;
  const body = Object.fromEntries(
    formData.entries()
  ) as unknown as IFormDataExperience;
  const skills = JSON.parse(body.skills) as string[];
  skills.forEach((skill, index) => {
    new mongoose.Types.ObjectId(skill);
  });
  body.image = await uploadImage(image, ["experiences"]);
  body.start = new Date(body.start).toISOString().slice(0, 10);
  body.present = body.present === "on" ? true : false;
  if (body.end) {
    body.end = new Date(body.end).toISOString().slice(0, 10);
  }
  return { body, skills };
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    dbConnect();
    const { body, skills } = await createExperienceBody(req);
    const experience = new Experiences({
      ...body,
      skills,
    });

    await experience.save();
    revalidateTag("experiences");
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
    const { body, skills } = await createExperienceBody(req);
    await Experiences.findOneAndUpdate(
      { _id: body._id },
      {
        ...body,
        skills,
      },
      {
        new: true,
      }
    );
    revalidateTag("experiences");
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
