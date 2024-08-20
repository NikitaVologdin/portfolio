import { Experiences } from "@/models/experience";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { revalidateTag } from "next/cache";
import CreateNewDocument from "@/lib/createNewDocument";
import updateDocument from "@/lib/updateDocument";

export async function POST(req: NextRequest) {
  try {
    dbConnect();
    const experience = await CreateNewDocument(req, Experiences, "experiences");
    revalidateTag("experiences");
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

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const experience = await updateDocument(req, Experiences, "experiences");
    revalidateTag("experiences");
    return NextResponse.json({
      message: `${experience.name}experience info has been uptated`,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
}
