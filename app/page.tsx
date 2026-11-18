import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SERVICE_DETAILS } from "@/lib/constants";

const STATS = [
  { value: "80+", label: "Projects delivered" },
  { value: "25", label: "Engineers & designers" },
  { value: "2019", label: "Founded in KL" },
  { value: "12 mo", label: "Code warranty" },
];

const PROCESS = [
  {
    step: "1",
    title: "Tell us about your project",
    text: "Fill in one short form — what you're building, your budget, your timeline. Takes five minutes.",
  },
  {
    step: "2",
    title: "Receive a detailed proposal",
    text: "Our team prepares a full proposal — scope, phases, timeline, and itemised pricing — within one business day.",
  },
  {
    step: "3",
    title: "Refine it together",
    text: "A discovery call to walk through the proposal, adjust scope, and lock in what matters most to you.",
  },
  {
    step: "4",
    title: "We build, you watch it ship",
    text: "Agile delivery in 2-week sprints with dedicated QA, CI/CD, and a demo at every milestone.",
  },
];

const GUARANTEES = [
  {
    title: "Dedicated QA on every project",
    text: "Nothing ships untested. Every sprint includes dedicated quality assurance, not an afterthought.",
  },
  {
    title: "30 days of post-launch fixes",
    text: "After launch, we stay. Any bug found in the first 30 days is fixed free, no discussion needed.",
  },
  {
    title: "12-month code warranty",
    text: "Your codebase is covered for a full year. If something we built breaks, we repair it.",
  },
  {
    title: "You own everything",
    text: "Source code, designs, documentation, infrastructure — handed over completely at delivery.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-blue-50/80 via-transparent to-transparent dark:from-blue-950/30" />
          <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-5">
                <span className="w-6 h-px bg-amber-500" />
                Custom software studio · Kuala Lumpur
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                From concept to code —{" "}
                <span className="text-blue-600 dark:text-blue-500">shipped.</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mb-8">
                We design and build the software your business runs on — mobile
                apps, web platforms, and internal systems. Tell us about your
                project today and receive a complete, itemised proposal within
                one business day.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/apply"
                  className="px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  Get a Free Proposal
                </Link>
                <a
                  href="#services"
                  className="px-6 py-3 rounded-lg font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  See Services & Pricing
                </a>
              </div>
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature: a proposal writing itself */}
            <div className="relative hidden lg:block" aria-hidden="true">
              <div className="hero-doc relative mx-auto w-104 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                      Proposal
                    </p>
                    <p className="text-sm font-semibold mt-1">TechVenture Sdn Bhd</p>
                    <p className="text-xs text-slate-400">Ref: CF-2026-4127</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    generating
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="h-2.5 w-2/5 rounded bg-slate-300 dark:bg-slate-600" />
                  <div className="h-2 w-full rounded bg-slate-100 dark:bg-slate-700" />
                  <div className="h-2 w-11/12 rounded bg-slate-100 dark:bg-slate-700" />
                  <div className="h-2 w-4/5 rounded bg-slate-100 dark:bg-slate-700" />
                </div>
                <div className="mt-6 rounded-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
                  <div className="grid grid-cols-3 text-[10px] font-semibold uppercase tracking-wide bg-slate-50 dark:bg-slate-700/50 px-3 py-2 text-slate-500 dark:text-slate-400">
                    <span>Phase</span>
                    <span>Duration</span>
                    <span className="text-right">Investment</span>
                  </div>
                  {[
                    ["Discovery", "2 weeks", "RM 8,500"],
                    ["Design", "3 weeks", "RM 14,000"],
                    ["Development", "8 weeks", "RM 52,000"],
                    ["Launch & QA", "2 weeks", "RM 10,000"],
                  ].map(([a, b, c]) => (
                    <div
                      key={a}
                      className="grid grid-cols-3 px-3 py-2 text-xs border-t border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                    >
                      <span>{a}</span>
                      <span>{b}</span>
                      <span className="text-right font-medium">{c}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-3 px-3 py-2 text-xs font-bold border-t-2 border-slate-200 dark:border-slate-600">
                    <span>Total</span>
                    <span>15 weeks</span>
                    <span className="text-right text-blue-600 dark:text-blue-400">RM 84,500</span>
                  </div>
                </div>
                <div className="mt-6 space-y-2.5">
                  <div className="h-2 w-full rounded bg-slate-100 dark:bg-slate-700" />
                  <div className="h-2 w-3/4 rounded bg-slate-100 dark:bg-slate-700" />
                  <div className="typing-line h-2 w-1/2 rounded" />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-900 dark:bg-slate-700 text-white text-xs font-medium shadow-lg whitespace-nowrap">
                Drafted in under a minute — reviewed by humans
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/20">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-3">
                Services & pricing
              </p>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Fixed starting prices. No mystery quotes.
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Every engagement starts from a published base price, refined to
                your exact scope in the proposal. What you see below is what we
                quote from.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICE_DETAILS.map((svc) => (
                <div
                  key={svc.name}
                  className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-lg mb-2">{svc.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1">
                    {svc.blurb}
                  </p>
                  <div className="flex items-end justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-500">from</p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {svc.price}
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{svc.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-3">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              From enquiry to kickoff in four steps
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.step} className="relative">
                <div className="w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-500 text-white font-bold flex items-center justify-center mb-4">
                  {p.step}
                </div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Guarantees */}
        <section className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/20">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-3">
                Why CodeForge
              </p>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Built like it&apos;s ours. Owned like it&apos;s yours.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg">
                Since 2019 we&apos;ve shipped software for logistics firms,
                clinics, retailers, and startups across Southeast Asia. The
                same four promises apply to every single engagement.
              </p>
              <Link
                href="/apply"
                className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              >
                Start Your Project
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {GUARANTEES.map((g) => (
                <div
                  key={g.title}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
                >
                  <h3 className="font-semibold text-sm mb-1.5">{g.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{g.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <div className="rounded-2xl bg-slate-900 dark:bg-blue-950/60 border border-slate-800 dark:border-blue-900 px-8 py-12 md:px-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-3">
              Your proposal is one form away
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Five minutes to tell us what you&apos;re building. One business
              day to a complete proposal with scope, timeline, and pricing.
            </p>
            <Link
              href="/apply"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-colors"
            >
              Get a Free Proposal
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
