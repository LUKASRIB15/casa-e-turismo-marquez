import { supabase } from "@/lib/supabase";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const { is_favorite } = await req.json();

  await supabase
    .from("properties")
    .update({
      is_favorite,
    })
    .eq("id", id);
}
