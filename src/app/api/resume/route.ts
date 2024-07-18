import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { Resume } from "@/models/resume";
import dbConnect from "@/lib/dbConnect";

interface IFormDataResume {
  _id?: string;
  name: string;
  file: File;
}

async function createImage(fd: FormData, body: IFormDataResume) {
  const file = fd.get("file") as File;
  if (!file || !(file instanceof File)) {
    throw new Error("No file received");
  }

  if (file.size === 0) {
    const fileName = body.file.name;
    return fileName;
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.replaceAll(" ", "_");
  await writeFile(
    path.join(process.cwd(), "public/resume/" + fileName),
    buffer
  );
  return fileName;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(
      formData.entries()
    ) as unknown as IFormDataResume;
    const file = await createImage(formData, body);
    const resume = new Resume({
      name: body.name,
      file,
    });
    await resume.save();
    return NextResponse.json({
      message: `${resume.name} resume is created`,
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
    ) as unknown as IFormDataResume;
    console.log("body", body);
    const file = await createImage(formData, body);
    console.log("file", file);
    const query = await Resume.findOneAndUpdate(
      { _id: body._id },
      {
        name: body.name,
        file: file,
      },
      {
        new: true,
      }
    );
    if (query) {
      return NextResponse.json({
        message: `${query.name} project info has been uptated`,
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
