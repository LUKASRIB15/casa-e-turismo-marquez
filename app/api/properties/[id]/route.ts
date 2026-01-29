import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!property) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    property,
  });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { data: property } = await supabase
    .from("properties")
    .select()
    .eq("id", id)
    .maybeSingle();

  if (!property) {
    return NextResponse.json(
      { ok: false, message: "Essa propriedade não existe na base de dados" },
      { status: 404 },
    );
  }

  const propertyImagePaths = JSON.parse(property.images);

  const { error } = await supabase.storage
    .from("properties_images")
    .remove([...propertyImagePaths]);

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Não foi possível deletar a imagens na base de dados!",
      },
      { status: 400 },
    );
  }

  await supabase.from("properties").delete().eq("id", id);

  return NextResponse.json({ ok: true });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

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

  const { data: property } = await supabase
    .from("properties")
    .select()
    .eq("id", id)
    .maybeSingle();

  if (!property) {
    return NextResponse.json(
      { ok: false, message: "Imóvel não encontrado." },
      { status: 404 },
    );
  }

  await supabase
    .from("properties")
    .update({
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
    .eq("id", property.id);

  return NextResponse.json({ ok: true });
}
