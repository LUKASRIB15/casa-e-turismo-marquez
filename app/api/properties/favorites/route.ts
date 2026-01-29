import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .eq("is_favorite", true);

  return NextResponse.json({
    ok: true,
    properties,
  });
}
