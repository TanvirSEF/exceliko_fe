import Image from "next/image"
import Link from "next/link"
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconCode,
  IconFileSpreadsheet,
  IconTool,
} from "@tabler/icons-react"

import { SectionHeading } from "@/components/site/section-heading"
import { Button } from "@/components/ui/button"

export function ServicesSection() {
  return (
    <section className="py-8 sm:py-14 lg:py-20">
      <SectionHeading
        badge="Custom Solutions & Consulting"
        title="Professional Excel & Sheets Services"
        subtitle="Need customized help? From diagnosing stubborn formula bugs to building executive dashboards and automated pipelines — get fast, expert spreadsheet solutions."
        action={{ label: "Request a Custom Quote", href: "/spreadsheet-solutions/" }}
        className="mb-6 sm:mb-10"
      />

      {/* ── Tier 1: Flagship Service Showcase (50/50 Editorial Split) ── */}
      <article className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-brand/5 p-5 sm:p-8 lg:p-10 shadow-xs transition-all duration-300 hover:border-brand/50 hover:shadow-lg dark:bg-card">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Copy, Capabilities & Action (7 cols) */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-7">
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/10 px-3 py-0.5 text-[11px] sm:text-xs font-semibold text-brand">
                <span className="size-1.5 rounded-full bg-brand" />
                <span>Flagship Service • Custom Modeling</span>
              </div>

              <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                <Link href="/custom-templates/" className="transition-colors group-hover:text-brand">
                  Executive Dashboards &amp; Custom Financial Models
                </Link>
              </h3>

              <p className="text-xs leading-relaxed text-muted-foreground sm:text-base">
                Transform messy raw spreadsheets into boardroom-ready models. We architect automated
                P&amp;L trackers, revenue forecasts, and dynamic visual dashboards customized to your
                exact business workflow.
              </p>
            </div>

            {/* Feature Checklist (2-col grid on tablet+, 1-col on mobile) */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs sm:text-sm font-semibold text-foreground/85">
              <div className="flex items-center gap-2">
                <span className="flex size-4.5 sm:size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <IconCheck className="size-3 sm:size-3.5 stroke-[3]" />
                </span>
                <span>Executive KPI &amp; revenue trackers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex size-4.5 sm:size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <IconCheck className="size-3 sm:size-3.5 stroke-[3]" />
                </span>
                <span>Automated budgeting &amp; P&amp;L models</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex size-4.5 sm:size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <IconCheck className="size-3 sm:size-3.5 stroke-[3]" />
                </span>
                <span>Interactive Pivot Tables &amp; slicers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex size-4.5 sm:size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <IconCheck className="size-3 sm:size-3.5 stroke-[3]" />
                </span>
                <span>Full formula documentation &amp; handover</span>
              </div>
            </div>

            {/* Action & Trust Note */}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="rounded-xl h-10 sm:h-11 px-5 sm:px-6 text-xs sm:text-sm font-semibold w-full sm:w-auto">
                <Link href="/custom-templates/" className="flex items-center justify-center gap-2">
                  <span>Order Custom Dashboard</span>
                  <IconArrowRight className="size-4" />
                </Link>
              </Button>

              <span className="text-[11px] sm:text-xs font-medium text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
                <IconFileSpreadsheet className="size-3.5 sm:size-4 text-brand" />
                <span>Tailored to your company branding</span>
              </span>
            </div>
          </div>

          {/* Right Column: Large, Seamless 2D Editorial Vector Illustration (5 cols) */}
          <div className="relative mx-auto flex w-full max-w-sm sm:max-w-md items-center justify-center lg:col-span-5 lg:max-w-none">
            <Image
              src="/images/services/consulting-editorial.webp"
              alt="Excel and Google Sheets custom financial modeling and dashboard consulting vector illustration"
              width={1192}
              height={864}
              className="w-full h-auto max-h-[220px] sm:max-h-[340px] object-contain drop-shadow-xs transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </article>

      {/* ── Tier 2: Specialty Services Grid (2 Equal Balanced Cards) ── */}
      <div className="mt-5 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
        {/* Card 1: Formula Troubleshooting & Workbook Repair */}
        <article className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-5 sm:p-8 shadow-xs transition-all duration-300 hover:border-brand/60 hover:shadow-xl dark:bg-card">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex size-10 sm:size-11 items-center justify-center rounded-xl sm:rounded-2xl border border-brand/20 bg-brand/10 text-brand">
                <IconTool className="size-4.5 sm:size-5" />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/40 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold text-muted-foreground">
                <IconClock className="size-3 sm:size-3.5 text-brand" />
                <span>24–48h Turnaround</span>
              </span>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <h4 className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-brand">
                <Link href="/spreadsheet-solutions/">
                  Formula Troubleshooting &amp; Workbook Repair
                </Link>
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Facing stubborn #VALUE!, #N/A errors, circular calculations, or bloated, slow-loading
                files? We diagnose the root cause and deliver production-ready fixes fast.
              </p>
            </div>

            <ul className="space-y-1.5 sm:space-y-2 pt-0.5 text-xs sm:text-sm font-semibold text-foreground/85">
              <li className="flex items-center gap-2">
                <IconCheck className="size-3.5 sm:size-4 shrink-0 text-brand" />
                <span>Fix broken formulas, circular logic &amp; errors</span>
              </li>
              <li className="flex items-center gap-2">
                <IconCheck className="size-3.5 sm:size-4 shrink-0 text-brand" />
                <span>Speed up and compress heavy, laggy workbooks</span>
              </li>
              <li className="flex items-center gap-2">
                <IconCheck className="size-3.5 sm:size-4 shrink-0 text-brand" />
                <span>Clear formula explanations so you stay in control</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 border-t border-border/60 pt-3 sm:pt-4">
            <Link
              href="/spreadsheet-solutions/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              <span>Request troubleshooting diagnostic</span>
              <IconArrowRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </article>

        {/* Card 2: VBA Macros & Google Apps Script Automation */}
        <article className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-5 sm:p-8 shadow-xs transition-all duration-300 hover:border-brand/60 hover:shadow-xl dark:bg-card">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex size-10 sm:size-11 items-center justify-center rounded-xl sm:rounded-2xl border border-brand/20 bg-brand/10 text-brand">
                <IconCode className="size-4.5 sm:size-5" />
              </div>
              <span className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold text-muted-foreground">
                Workflow Automation
              </span>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <h4 className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-brand">
                <Link href="/custom-tools/">
                  VBA Macros &amp; Google Apps Script
                </Link>
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Stop manual copy-pasting. We engineer automated scripts that consolidate multi-sheet
                datasets, generate automated PDF reports, and sync with third-party APIs.
              </p>
            </div>

            <ul className="space-y-1.5 sm:space-y-2 pt-0.5 text-xs sm:text-sm font-semibold text-foreground/85">
              <li className="flex items-center gap-2">
                <IconCheck className="size-3.5 sm:size-4 shrink-0 text-brand" />
                <span>One-click automated VBA macro buttons</span>
              </li>
              <li className="flex items-center gap-2">
                <IconCheck className="size-3.5 sm:size-4 shrink-0 text-brand" />
                <span>Google Apps Script &amp; cross-sheet data pipelines</span>
              </li>
              <li className="flex items-center gap-2">
                <IconCheck className="size-3.5 sm:size-4 shrink-0 text-brand" />
                <span>Clean, well-commented code with zero bloated deps</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 border-t border-border/60 pt-3 sm:pt-4">
            <Link
              href="/custom-tools/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              <span>Build custom automated tool</span>
              <IconArrowRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}