import "server-only";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import User from "@/models/user";

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return redirect("/admin/authentication");
  }

  const user = await User.findById(session.userId);
  if (user) {
    return { isAuth: true, userId: session.userId };
  } else {
    return { isAuth: false };
  }
});
