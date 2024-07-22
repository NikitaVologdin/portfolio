import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Developer from "@/models/developer";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const body = await req.json();
    const developer = new Developer(body);
    await developer.save();
    return NextResponse.json({
      revalidated: true,
      message: `${body.name} developer is created`,
      code: 201,
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
    const body = await req.json();
    if (body._id) {
      await Developer.findOneAndUpdate({ _id: body._id }, body, {
        new: true,
      });
      return NextResponse.json({
        message: "Developer info has been uptated",
        status: 200,
      });
    }
    return NextResponse.json({
      message: "Current developer info is missing",
      status: 400,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
}
