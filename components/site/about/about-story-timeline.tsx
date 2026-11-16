import Link from "next/link"
import {
  IconArrowRight,
  IconBrandLinkedin,
  IconExternalLink,
  IconQuote,
} from "@tabler/icons-react"

import { SectionHeading } from "@/components/site/section-heading"

const MILESTONES = [
  {
    period: "BEFORE 2024",
    title: "15+ Years in the Spreadsheet Trenches",
    description:
      "Working as a spreadsheet consultant and data strategist, Nehad tackled high-stakes business models, complex financial forecasts, and automated tracking systems. Early on, one lesson became clear: messy spreadsheets and overtime aren't solved by working harder, but by having the right formula architecture.",
  },
  {
    period: "2024",
    title: "Exceliko Was Built as an Answer to Bad Advice",
    description:
      "Too many online tutorials are bloated with filler, outdated formulas, or theoretical examples that break the moment you paste them into a real project. Exceliko was launched with a single focus: create authentic, rigorously tested guides, free calculators, and downloadable practice workbooks that solve actual user problems.",
  },
  {
    period: "TODAY & BEYOND",
    title: "A Complete Ecosystem for Modern Spreadsheet Users",
    description:
      "Today, Exceliko serves thousands of professionals every month with over 50 free calculators across finance, accounting, and statistics, hundreds of step-by-step guides, and custom spreadsheet engineering services for teams looking to automate their daily workflows.",
  },
]

export function AboutStoryTimeline() {
  return (
    <section className="py-14 sm:py-20">
      <SectionHeading
        badge="Our Story"
        title="How a spreadsheet habit became Exceliko"
        subtitle="Behind every formula, calculator, and tutorial is 15+ years of real-world problem-solving."
      />

      <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Founder Spotlight Card */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8 dark:bg-card">
            {/* Top decorative gradient bar */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand to-brand-light" />

            <div className="flex items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-chart-2 to-primary text-xl font-bold text-primary-foreground shadow-md">
                NU
              </div>
              <div className="min-w-0 space-y-1">
                <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                  Nehad Ulfat
                </h3>
                <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  Founder &amp; Strategist
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Over 15 years solving enterprise spreadsheet challenges. Specializes in advanced
              formulas, financial modeling, automated template architecture, and team workflows
              across Microsoft Excel and Google Sheets.
            </p>

            {/* Pull Quote */}
            <div className="mt-6 rounded-xl border border-border/60 bg-muted/30 p-4">
              <div className="flex items-start gap-2.5">
                <IconQuote className="size-5 shrink-0 text-brand" />
                <p className="text-xs italic leading-relaxed text-foreground/80">
                  &ldquo;Spreadsheets shouldn&apos;t be intimidating. The right formula or template
                  turns hours of exhausting manual work into a single click.&rdquo;
                </p>
              </div>
            </div>

            {/* Profile CTAs */}
            <div className="mt-6 flex flex-col gap-2.5 border-t border-border/60 pt-5">
              <Link
                href="/about/nehad-ulfat/"
                className="inline-flex items-center justify-between rounded-lg border border-border/70 bg-background px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-muted/40"
              >
                <span>Read Nehad&apos;s full story &amp; background</span>
                <IconArrowRight className="size-4 text-primary" />
              </Link>

              <a
                href="https://www.linkedin.com/in/nehad-ulfat-22042017b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between rounded-lg border border-border/70 bg-background px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-muted/40"
              >
                <div className="flex items-center gap-2">
                  <IconBrandLinkedin className="size-4 text-[#0077B5]" />
                  <span>Connect on LinkedIn</span>
                </div>
                <IconExternalLink className="size-3.5 text-muted-foreground" />
              </a>
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
