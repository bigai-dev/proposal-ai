import { turso } from "@/lib/turso";
import { type InValue } from "@libsql/client";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await turso.execute({
      sql: "SELECT * FROM proposals WHERE id = ?",
      args: [id],
    });

    if (result.rows.length === 0) {
      return Response.json({ error: "Proposal not found" }, { status: 404 });
    }

    return Response.json(result.rows[0]);
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

    const setClauses = Object.keys(body)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(body), id] as InValue[];

    await turso.execute({
      sql: `UPDATE proposals SET ${setClauses} WHERE id = ?`,
      args: values,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to update proposal" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await turso.execute({
      sql: "DELETE FROM proposals WHERE id = ?",
      args: [id],
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to delete proposal" }, { status: 500 });
  }
}
