import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase
      .from("proposals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return Response.json(data);
  } catch {
    return Response.json({ error: "Proposal not found" }, { status: 404 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { error } = await supabase
      .from("proposals")
      .update(body)
      .eq("id", id);

    if (error) throw error;

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to update proposal" }, { status: 500 });
  }
}
