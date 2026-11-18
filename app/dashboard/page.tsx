import { redirect } from "next/navigation";

// The dashboard now lives in the admin portal.
export default function OldDashboardRedirect() {
  redirect("/admin");
}
