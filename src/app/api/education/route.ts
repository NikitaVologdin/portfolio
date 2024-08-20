import { EducationModel } from "@/models/education";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { revalidateTag } from "next/cache";
import { verifySession } from "@/lib/dal";
import CreateNewDocument from "@/lib/createNewDocument";
import updateDocument from "@/lib/updateDocument";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    dbConnect();
    const education = await CreateNewDocument(req, EducationModel, "education");
    revalidateTag("education");
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

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const education = await updateDocument(req, EducationModel, "education");
    revalidateTag("education");
    return NextResponse.json({
      message: `${education.name} education info has been uptated`,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
}
