import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";
import { IFetchedUser } from "@/types/User";
import { createSession } from "@/lib/session";

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  const { login, password } = Object.fromEntries(formData.entries()) as {
    login: string;
    password: string;
  };
  try {
    await dbConnect();
    const user = (await User.find({ login }))[0] as IFetchedUser;
    if (!user) {
      return NextResponse.json({ message: "User not found", status: 400 });
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      await createSession(user._id.toString());
      return NextResponse.json({ message: `Welcome back!`, status: 200 });
    }
    return NextResponse.json({ message: `Wrong credentials!`, status: 401 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message, status: 400 });
    }
  }
}
