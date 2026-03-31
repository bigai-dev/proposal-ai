"use client";

import { useState } from "react";
import { SERVICES, BUDGETS, TIMELINES, InquiryFormData } from "@/lib/constants";

interface InquiryFormProps {
  onSubmit: (data: InquiryFormData) => void;
}

export default function InquiryForm({ onSubmit }: InquiryFormProps) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    service: "",
    projectDescription: "",
    budget: "",
    timeline: "",
  });

  const isValid =
    form.fullName.length >= 2 &&
    form.email.includes("@") &&
    form.phone.replace(/\D/g, "").length >= 8 &&
    form.companyName.length >= 2 &&
    form.service !== "" &&
    form.projectDescription.length > 0 &&
    form.budget !== "" &&
    form.timeline !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isValid) onSubmit(form);
  }

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";

  const labelClass = "block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Project Inquiry
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Tell us about your project and we&apos;ll generate a proposal instantly.
        </p>
      </div>

      {/* Contact Information */}
      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Contact Information
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className={labelClass}>Full Name</label>
            <input
              id="fullName"
              type="text"
              required
              minLength={2}
              placeholder="e.g. Ahmad Razak"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email Address</label>
            <input
              id="email"
              type="email"
              required
              placeholder="e.g. ahmad@company.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Phone Number</label>
            <input
              id="phone"
              type="tel"
              required
              placeholder="e.g. +60 12-345 6789"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="companyName" className={labelClass}>Company Name</label>
            <input
              id="companyName"
              type="text"
              required
              minLength={2}
              placeholder="e.g. TechVenture Sdn Bhd"
              value={form.companyName}
              onChange={(e) => update("companyName", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Project Details
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="service" className={labelClass}>Service Required</label>
            <select
              id="service"
              required
              value={form.service}
              onChange={(e) => update("service", e.target.value)}
              className={inputClass}
            >
              <option value="">Select a service...</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="projectDescription" className={labelClass}>
              Project Description
            </label>
            <textarea
              id="projectDescription"
              required
              maxLength={1000}
              rows={5}
              placeholder="Describe your project idea in detail. What problem does it solve? Who are the target users? Any reference apps?"
              value={form.projectDescription}
              onChange={(e) => update("projectDescription", e.target.value)}
              className={inputClass + " resize-none"}
            />
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 text-right">
              {form.projectDescription.length}/1000
            </p>
          </div>
          <div>
            <label htmlFor="budget" className={labelClass}>Estimated Budget</label>
            <select
              id="budget"
              required
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              className={inputClass}
            >
              <option value="">Select a budget range...</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="timeline" className={labelClass}>Expected Timeline</label>
            <select
              id="timeline"
              required
              value={form.timeline}
              onChange={(e) => update("timeline", e.target.value)}
              className={inputClass}
            >
              <option value="">Select a timeline...</option>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Generate Proposal
      </button>
    </form>
  );
}
