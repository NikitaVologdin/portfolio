import { NextRequest, NextResponse } from "next/server";
import { Resume } from "@/models/resume";
import dbConnect from "@/lib/dbConnect";
import { revalidateTag } from "next/cache";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const id = params.slug;
    const resume = await Resume.findById(id);
    if (resume) {
      return NextResponse.json(resume);
    } else {
      return NextResponse.json({
        message: "Resume has not been found",
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
      const resume = await Resume.findByIdAndDelete(id);
      revalidateTag("resume");
      return NextResponse.json({
        message: `${resume.name} skill is deleted`,
        status: 200,
      });
    }
    return NextResponse.json({ message: "Resume id is missing", status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
}
