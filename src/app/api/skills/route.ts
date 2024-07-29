import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Skill, SkillsGroup } from "@/models/skills";
import mongoose from "mongoose";
import { uploadImage } from "@/lib/cloudinary";

export interface IFormDataSkill {
  _id: string;
  name: string;
  group: string;
  newSkillGroup?: string;
  image: File;
  color: string;
  description: string;
}

export interface IFormDataSkillsGroup {
  _id: string;
  name: string;
  skills: IFormDataSkill[];
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(
      formData.entries()
    ) as unknown as IFormDataSkill;

    const image = formData.get("image") as File;
    const imageName = await uploadImage(image, ["skills"]);

    if (body.group === "New group") {
      const groupId = new mongoose.Types.ObjectId();
      const skillId = new mongoose.Types.ObjectId();

      const group = new SkillsGroup({
        name: body.newSkillGroup,
        _id: groupId,
      });
      group.skills.push(skillId);

      const skill = new Skill({
        name: body.name,
        _id: skillId,
        group: groupId,
        image: imageName,
        color: body.color,
        description: body.description,
      });
      await skill.save();
      await group.save();

      return NextResponse.json({
        message: `${group.name} group and ${skill.name} skill have been created`,
        status: 200,
      });
    } else {
      const group = await SkillsGroup.findOne({ name: body.group });

      const skillId = new mongoose.Types.ObjectId();
      const skill = new Skill({
        name: body.name,
        _id: skillId,
        group: group._id,
        image: imageName,
        color: body.color,
        description: body.description,
      });

      group.skills.push(skillId);

      await group.save();
      await skill.save();

      return NextResponse.json({
        message: `${skill.name} skill has been created`,
        status: 200,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(
      formData.entries()
    ) as unknown as IFormDataSkill;

    const image = formData.get("image") as File;
    const imageName = await uploadImage(image, ["skills"]);

    const query = await Skill.findOneAndUpdate(
      { _id: body._id },
      { ...body, image: imageName },
      {
        new: true,
      }
    );
    if (query) {
      return NextResponse.json({
        message: `${query.name} skill info has been uptated`,
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
