import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";
import { createSession } from "@/lib/session";

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  const { login, password, email } = Object.fromEntries(formData.entries()) as {
    login: string;
    password: string;
    email: string;
  };
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    await dbConnect();
    const user = new User({ login, password: hash, email });
    await user.save();
    await createSession(user._id);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message, status: 400 });
    }
  }

  return NextResponse.json({ message: "User is created", status: 200 });
}
