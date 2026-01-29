import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { images } = await req.json();
  const { id } = await params;

  if (!Array.isArray(images)) {
    return NextResponse.json(
      { error: "images must be an array" },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from("properties")
    .update({ images })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
