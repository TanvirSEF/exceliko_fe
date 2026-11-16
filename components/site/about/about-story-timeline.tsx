import Image from "next/image"
import Link from "next/link"
import { IconArrowRight, IconCheck, IconQuote } from "@tabler/icons-react"

import { SectionHeading } from "@/components/site/section-heading"

const COMMITMENTS = [
  "100% Tested on Live Excel & Sheets Workbooks",
  "Zero Fluff — Straight to the Solution",
  "Free & Openly Accessible to Everyone",
]

const MILESTONES = [
  {
    period: "THE PROBLEM",
    title: "The Frustration of Inaccurate Spreadsheet Advice",
    description:
      "Too many online spreadsheet tutorials are bloated with SEO filler, outdated formulas, or theoretical examples that break when applied to real business data. Finding a working solution often required hours of tedious trial, error, and guesswork.",
  },
  {
    period: "THE MISSION",
    title: "Building an Independent, Fluff-Free Platform",
    description:
      "Exceliko was created with a single, clear objective: publish authentic, thoroughly verified guides, free interactive calculators, and clean downloadable workbooks that solve actual user problems without unnecessary noise.",
  },
  {
    period: "TODAY & BEYOND",
    title: "A Growing Ecosystem for Modern Spreadsheet Users",
    description:
      "Today, Exceliko serves thousands of analysts, accountants, students, and business owners every month with over 50 free calculators across finance, accounting, and statistics, alongside comprehensive guides for Microsoft Excel and Google Sheets.",
  },
]

export function AboutStoryTimeline() {
  return (
    <section className="py-14 sm:py-20">
      <SectionHeading
        badge="Our Mission"
        title="Why Exceliko exists and what drives us"
        subtitle="Behind every formula, calculator, and tutorial is a commitment to authentic, reliable spreadsheet solutions."
      />

      <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Brand & Editorial Standard Card */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8 dark:bg-card">
            {/* Top decorative gradient bar */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand to-brand-light" />

            <div className="flex items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-muted/40 p-2.5 shadow-xs">
                <Image
                  src="/icon-192.png"
                  alt="Exceliko Logo"
                  width={40}
                  height={40}
                  className="size-full object-contain"
                />
              </div>
              <div className="min-w-0 space-y-1">
                <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                  The Exceliko Standard
                </h3>
                <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  Editorial &amp; Publishing Ethics
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              We believe that spreadsheet knowledge should be accurate, easy to follow, and
              immediately useful in real-world scenarios. We build tools that save you time so you
              can focus on what truly matters.
            </p>

            {/* Pull Quote */}
            <div className="mt-6 rounded-xl border border-border/60 bg-muted/30 p-4">
              <div className="flex items-start gap-2.5">
                <IconQuote className="size-5 shrink-0 text-brand" />
                <p className="text-xs italic leading-relaxed text-foreground/80">
                  &ldquo;Spreadsheets shouldn&apos;t require trial and error. Finding the right
                  formula or calculator turns hours of exhausting manual work into a single
                  click.&rdquo;
                </p>
              </div>
            </div>

            {/* Core Commitments Checklist */}
            <div className="mt-6 space-y-2.5 border-t border-border/60 pt-5">
              {COMMITMENTS.map((commitment) => (
                <div key={commitment} className="flex items-center gap-2.5 text-xs font-semibold text-foreground/90">
                  <div className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <IconCheck className="size-3 stroke-[3]" />
                  </div>
                  <span>{commitment}</span>
                </div>
              ))}
            </div>

            {/* Action Links */}
            <div className="mt-6 flex flex-col gap-2.5 border-t border-border/60 pt-5">
              <Link
                href="/calculator/"
                className="inline-flex items-center justify-between rounded-lg border border-border/70 bg-background px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-muted/40"
              >
                <span>Explore all 50+ free calculators</span>
                <IconArrowRight className="size-4 text-primary" />
              </Link>
              <Link
                href="/blog/"
                className="inline-flex items-center justify-between rounded-lg border border-border/70 bg-background px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-muted/40"
              >
                <span>Browse step-by-step formula guides</span>
                <IconArrowRight className="size-4 text-primary" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Vertical Milestone Timeline */}
        <div className="lg:col-span-7">
          <div className="relative space-y-8 border-l-2 border-border/80 pl-6 sm:pl-8 sm:space-y-10">
            {MILESTONES.map((item) => (
              <div key={item.period} className="relative group">
                {/* Timeline node */}
                <span className="absolute -left-[31px] top-1 flex size-3.5 items-center justify-center rounded-full border-2 border-brand bg-background transition-transform group-hover:scale-125 sm:-left-[39px]">
                  <span className="size-1.5 rounded-full bg-brand" />
                </span>

                <div className="space-y-1.5">
                  <span className="inline-block rounded-md bg-brand/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand">
                    {item.period}
                  </span>
                  <h4 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
