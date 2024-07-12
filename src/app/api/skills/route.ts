import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Skill, SkillsGroup } from "@/models/skills";
import mongoose from "mongoose";
import { writeFile } from "fs/promises";
import path from "path";

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

async function createImage(fd: FormData, body: IFormDataSkill) {
  const image = fd.get("image") as File;
  if (!image) {
    return NextResponse.json({ error: "No files received.", status: 400 });
  }

  if (image.size === 0) {
    const imageName = body.image.name;
    return imageName;
  }

  if (image instanceof File) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const imageName = image.name.replaceAll(" ", "_");
    await writeFile(
      path.join(process.cwd(), "public/stack/" + imageName),
      buffer
    );
    return imageName;
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(
      formData.entries()
    ) as unknown as IFormDataSkill;
    const imageName = await createImage(formData, body);

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
        image: body.image,
        color: body.color,
        description: body.description,
      });
      await skill.save();
      await group.save();

      return NextResponse.json({
        message: `${group.name} group and ${skill.name}skill have been created`,
        status: 200,
      });
    } else {
      const group = await SkillsGroup.findOne({ name: body.group });

      const skillId = new mongoose.Types.ObjectId();
      const skill = new Skill({
        name: body.name,
        _id: skillId,
        group: group._id,
        image: body.image,
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

    const imageName = await createImage(formData, body);
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
