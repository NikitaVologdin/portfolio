import { Experiences } from "@/models/experience";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import createImage from "@/lib/createImage";

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
    const imageName = await createImage(formData, body, "expeeriences");
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
    const imageName = await createImage(formData, body, "expeeriences");
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
