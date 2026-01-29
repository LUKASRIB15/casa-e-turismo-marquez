import { supabase } from "@/lib/supabase";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data: admin } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (!admin) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const isPasswordMatched = await compare(password, admin.password);

  if (!isPasswordMatched) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const accessToken = jwt.sign(
    {
      sub: admin.id,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" },
  );

  const response = NextResponse.json({ ok: true });

  response.cookies.set("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return response;
}
