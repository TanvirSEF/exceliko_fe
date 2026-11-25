import Image from "next/image"
import Link from "next/link"
import { IconArrowRight, IconCheck, IconQuote } from "@tabler/icons-react"

import { SectionHeading } from "@/components/site/section-heading"

const COMMITMENTS = [
  "100% tested on live Excel & Sheets workbooks",
  "Zero fluff — straight to the solution",
  "Free & openly accessible to everyone",
]

const MILESTONES = [
  {
    period: "The problem",
    title: "The frustration of inaccurate spreadsheet advice",
    description:
      "Too many online spreadsheet tutorials are bloated with SEO filler, outdated formulas, or theoretical examples that break when applied to real business data. Finding a working solution often required hours of tedious trial, error, and guesswork.",
  },
  {
    period: "The mission",
    title: "Building an independent, fluff-free platform",
    description:
      "Exceliko was created with a single, clear objective: publish authentic, thoroughly verified guides, free interactive calculators, and clean downloadable workbooks that solve actual user problems without unnecessary noise.",
  },
  {
    period: "Today & beyond",
    title: "A growing ecosystem for modern spreadsheet users",
    description:
      "Today, Exceliko serves analysts, accountants, students, and business owners every month with over 50 free calculators across finance, accounting, and statistics, alongside comprehensive guides for Microsoft Excel and Google Sheets.",
  },
]

export function AboutStoryTimeline() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <SectionHeading
        badge="Our mission"
        title="Why Exceliko exists and what drives us"
        subtitle="Behind every formula, calculator, and tutorial is a commitment to authentic, reliable spreadsheet solutions."
      />

      <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Editorial Standard Card */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40 p-2">
                <Image
                  src="/icon-192.png"
                  alt="Exceliko Logo"
                  width={40}
                  height={40}
                  className="size-full object-contain"
                />
              </div>
              <div className="min-w-0 space-y-0.5">
                <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  The Exceliko standard
                </h3>
                <p className="text-xs font-medium text-brand">
                  Editorial &amp; publishing ethics
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              We believe that spreadsheet knowledge should be accurate, easy to follow, and
              immediately useful in real-world scenarios. We build tools that save you time so you
              can focus on what truly matters.
            </p>

            <div className="mt-6 rounded-xl border border-border/70 bg-muted/30 p-4">
              <div className="flex items-start gap-2.5">
                <IconQuote className="size-5 shrink-0 stroke-[1.5] text-brand" />
                <p className="text-xs leading-relaxed text-foreground/85 sm:text-sm">
                  &ldquo;Spreadsheets shouldn&apos;t require trial and error. Finding the right
                  formula or calculator turns hours of exhausting manual work into a single
                  click.&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2.5 border-t border-border/60 pt-5">
              {COMMITMENTS.map((commitment) => (
                <div key={commitment} className="flex items-center gap-2.5 text-sm font-medium text-foreground/90">
                  <IconCheck className="size-4 shrink-0 stroke-[1.5] text-brand" />
                  <span>{commitment}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2.5 border-t border-border/60 pt-5">
              <Link
                href="/calculator/"
                className="inline-flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 hover:border-brand/40 hover:text-brand"
              >
                <span>Explore all 50+ free calculators</span>
                <IconArrowRight className="size-4 stroke-[1.5] text-brand" />
              </Link>
              <Link
                href="/blog/"
                className="inline-flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 hover:border-brand/40 hover:text-brand"
              >
                <span>Browse step-by-step formula guides</span>
                <IconArrowRight className="size-4 stroke-[1.5] text-brand" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Vertical Milestone Timeline */}
        <div className="lg:col-span-7">
          <div className="relative space-y-8 border-l border-border pl-6 sm:space-y-10 sm:pl-8">
            {MILESTONES.map((item) => (
              <div key={item.period} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-6 top-1.5 flex size-3 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand bg-background sm:-left-8"
                />

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-brand">
                    {item.period}
                  </p>
                  <h4 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
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
