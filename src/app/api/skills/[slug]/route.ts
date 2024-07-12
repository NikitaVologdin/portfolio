import { NextRequest, NextResponse } from "next/server";
import { Skill as Skills } from "@/models/skills";
import dbConnect from "@/lib/dbConnect";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const id = params.slug;
    const skill = await Skills.findById(id).populate("group");
    if (skill) {
      return NextResponse.json(skill);
    } else {
      return NextResponse.json({
        message: "skill has not been found",
        status: 404,
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({
        message: e.message,
        status: 500,
      });
    }
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const id = params.slug;
    if (id) {
      const skill = await Skills.findByIdAndDelete(id);
      return NextResponse.json({
        message: `${skill.name} skill is deleted`,
        status: 200,
      });
    }
    return NextResponse.json({ message: "Skill id is missing", status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
}
