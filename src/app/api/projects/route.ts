import { NextRequest, NextResponse } from "next/server";
import { Projects } from "@/models/projects";
import dbConnect from "@/lib/dbConnect";
import { uploadImage } from "@/lib/cloudinary";
import { revalidateTag } from "next/cache";
import CreateNewDocument from "@/lib/createNewDocument";
import updateDocument from "@/lib/updateDocument";

export async function POST(req: NextRequest) {
  try {
    dbConnect();
    const project = await CreateNewDocument(req, Projects, "projects");
    revalidateTag("projects");
    return NextResponse.json({
      message: `${project.name} project is created`,
      status: 200,
    });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message, code: 500 });
    }
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const project = await updateDocument(req, Projects, "projects");
    revalidateTag("projects");
    return NextResponse.json({
      message: `${project.name} project info has been updated`,
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
}
