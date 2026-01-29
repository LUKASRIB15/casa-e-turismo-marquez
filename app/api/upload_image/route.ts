import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const path = formData.get("path") as string;

  if (!file) {
    return NextResponse.json({ error: "File not provided" }, { status: 400 });
  }

  // const fileExt = file.name.split(".").pop();
  // const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = path;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("properties_images")
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage
    .from("properties_images")
    .getPublicUrl(filePath);

  return NextResponse.json({
    path: filePath,
    publicUrl: data.publicUrl,
  });
}

export async function DELETE(req: Request) {
  const { imagesToDelete } = await req.json();

  if (imagesToDelete.length > 0) {
    const { error } = await supabase.storage
      .from("properties_images")
      .remove([...imagesToDelete]);

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          message: "Não foi possível deletar a imagens na base de dados!",
        },
        { status: 400 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
