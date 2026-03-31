import { supabase } from "@/lib/supabase";
import { InquiryFormData } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const formData: InquiryFormData = await request.json();

    const { data, error } = await supabase
      .from("proposals")
      .insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.companyName,
        service: formData.service,
        project_description: formData.projectDescription,
        budget: formData.budget,
        timeline: formData.timeline,
        status: "generating",
      })
      .select("id")
      .single();

    if (error) throw error;

    return Response.json({ id: data.id });
  } catch {
    return Response.json({ error: "Failed to save proposal" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("proposals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return Response.json(data);
  } catch {
    return Response.json({ error: "Failed to fetch proposals" }, { status: 500 });
  }
}
