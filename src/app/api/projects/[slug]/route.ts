import { NextRequest, NextResponse } from "next/server";
import { Projects } from "@/models/projects";
import dbConnect from "@/lib/dbConnect";
import { deleteImage } from "@/lib/cloudinary";
import { revalidateTag } from "next/cache";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const id = params.slug;
    const project = await Projects.findById(id).populate("skills");
    if (project) {
      return NextResponse.json(project);
    } else {
      return NextResponse.json({
        message: "Project has not been found",
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
      const project = await Projects.findByIdAndDelete(id);
      const image = await deleteImage(project.image);
      revalidateTag("projects");
      return NextResponse.json({
        message: `${project.name} skill is deleted`,
        status: 200,
      });
    }
    return NextResponse.json({ message: "Project id is missing", status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
}
