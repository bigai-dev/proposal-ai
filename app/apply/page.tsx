"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import ProposalOutput from "@/components/ProposalOutput";
import { InquiryFormData } from "@/lib/constants";

export default function ApplyPage() {
  const [formData, setFormData] = useState<InquiryFormData | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Header />
      <main className="flex-1 px-4 py-8 md:py-12">
        {formData ? (
          <ProposalOutput
            key={JSON.stringify(formData)}
            formData={formData}
            onReset={() => setFormData(null)}
          />
        ) : (
          <InquiryForm onSubmit={setFormData} />
        )}
      </main>
      <Footer />
    </div>
  );
}
