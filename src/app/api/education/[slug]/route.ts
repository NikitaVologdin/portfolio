import { EducationModel } from "@/models/education";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { revalidateTag } from "next/cache";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const id = params.slug;
    const education = await EducationModel.findById(id).populate("skills");
    console.log(education);
    if (education) {
      return NextResponse.json(education);
    } else {
      return NextResponse.json({
        message: "Education has not been found",
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
      const project = await EducationModel.findByIdAndDelete(id);
      revalidateTag("education");
      return NextResponse.json({
        message: `${project.name} education is deleted`,
        status: 200,
      });
    }
    return NextResponse.json({
      message: "Education id is missing",
      status: 204,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
}
