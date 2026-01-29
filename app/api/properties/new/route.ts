import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    area_size,
    category,
    description,
    is_favorite,
    locale,
    price,
    qtd_bathroom,
    qtd_beds,
    qtd_cars,
    status,
    title,
    images,
  } = await req.json();

  const { data: property, error } = await supabase
    .from("properties")
    .insert({
      status,
      price,
      title,
      description,
      locale,
      qtd_bathroom,
      qtd_beds,
      qtd_cars,
      area_size,
      is_favorite,
      category,
      updated_at: new Date(),
      images,
    })
    .select()
    .maybeSingle();

  if (!property) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  return NextResponse.json({ ok: true, property_id: property.id });
}
