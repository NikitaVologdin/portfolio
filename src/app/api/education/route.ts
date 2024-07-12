import { EducationModel } from "@/models/education";
import { NextRequest, NextResponse } from "next/server";
import createImage from "@/lib/createImage";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

interface IFormDataEducation {
  _id: string;
  name: string;
  start: string;
  present: string;
  end: string;
  image: File;
  skills: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(
      formData.entries()
    ) as unknown as IFormDataEducation;
    const skills = JSON.parse(body.skills) as string[];
    skills.forEach((skill, index) => {
      new mongoose.Types.ObjectId(skill);
    });
    const imageName = await createImage(formData, body);
    const startDate = new Date(body.start);
    let endDate;
    let difTime;
    let education;
    let present = body.present === "on" ? true : false;
    if (body.end) {
      endDate = new Date(body.end);
      difTime = endDate.getTime() - startDate.getTime();

      education = new EducationModel({
        ...body,
        image: imageName,
        start: startDate.toISOString().slice(0, 10),
        end: endDate.toISOString().slice(0, 10),
        duration: difTime,
        skills,
        present,
      });
    } else {
      education = new EducationModel({
        ...body,
        image: imageName,
        start: startDate.toISOString().slice(0, 10),
        end: undefined,
        duration: undefined,
        skills,
        present,
      });
    }
    await education.save();
    return NextResponse.json({
      message: `${education.name} education is created`,
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
    ) as unknown as IFormDataEducation;

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
      await EducationModel.findOneAndUpdate(
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
      await EducationModel.findOneAndUpdate(
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
