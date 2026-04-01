import { turso } from "@/lib/turso";
import { InquiryFormData } from "@/lib/constants";

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
        "generating",
      ],
    });

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
