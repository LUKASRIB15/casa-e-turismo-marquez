import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data: properties } = await supabase.from("properties").select("*");

  return NextResponse.json({
    ok: true,
    properties,
  });
}
