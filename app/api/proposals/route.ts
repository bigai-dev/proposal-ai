import { after } from "next/server";
import OpenAI from "openai";
import { turso } from "@/lib/turso";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";
import { InquiryFormData } from "@/lib/constants";

async function generateAndSave(id: string, formData: InquiryFormData) {
  try {
    await turso.execute({
      sql: "UPDATE proposals SET status = ? WHERE id = ?",
      args: ["generating", id],
    });

    const client = new OpenAI({
      apiKey: process.env.ARK_API_KEY,
      baseURL: "https://ark.ap-southeast.bytepluses.com/api/v3",
    });

    const completion = await client.chat.completions.create({
      model: "ep-20260103034841-vrwmk",
      max_tokens: 4096,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(formData) },
      ],
    });

    const content = completion.choices[0]?.message?.content ?? "";

    await turso.execute({
      sql: "UPDATE proposals SET proposal_content = ?, status = ? WHERE id = ?",
      args: [content, "completed", id],
    });
  } catch (err) {
    console.error("Proposal generation failed", err);
    await turso.execute({
      sql: "UPDATE proposals SET status = ? WHERE id = ?",
      args: ["failed", id],
    });
  }
}

export async function POST(request: Request) {
  try {
    const formData: InquiryFormData = await request.json();
    const id = crypto.randomUUID();

    await turso.execute({
      sql: `INSERT INTO proposals (id, full_name, email, phone, company_name, service, project_description, budget, timeline, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        formData.fullName,
        formData.email,
        formData.phone,
        formData.companyName,
        formData.service,
        formData.projectDescription,
        formData.budget,
        formData.timeline,
        "pending",
      ],
    });

    after(() => generateAndSave(id, formData));

    return Response.json({ id });
  } catch {
    return Response.json({ error: "Failed to save proposal" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await turso.execute(
      "SELECT * FROM proposals ORDER BY created_at DESC"
    );

    return Response.json(result.rows);
  } catch {
    return Response.json({ error: "Failed to fetch proposals" }, { status: 500 });
  }
}
