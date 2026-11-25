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
    <section className="py-8 sm:py-10 lg:py-12">
      <SectionHeading
        badge="Custom solutions & consulting"
        title="Professional Excel & Sheets services"
        subtitle="From diagnosing stubborn formula bugs to building executive dashboards and automated pipelines, get fast, expert spreadsheet solutions."
        action={{ label: "Request a custom quote", href: "/spreadsheet-solutions/" }}
        className="mb-6 sm:mb-8"
      />

      {/* Tier 1: Flagship Service Showcase */}
      <article className="group rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10 transition-colors duration-150 hover:border-brand/40">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-5 lg:col-span-7">
            <div className="space-y-2">
              <p className="text-xs font-medium text-brand">
                Flagship service · Custom modeling
              </p>

              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
                <Link
                  href="/custom-templates/"
                  className="transition-colors duration-150 group-hover:text-brand"
                >
                  Executive dashboards &amp; custom financial models
                </Link>
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Transform messy raw spreadsheets into boardroom-ready models. We architect automated
                P&amp;L trackers, revenue forecasts, and dynamic visual dashboards tailored to your
                exact business workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-sm font-medium text-foreground/85">
              <div className="flex items-center gap-2.5">
                <IconCheck className="size-4 shrink-0 stroke-[1.5] text-brand" />
                <span>Executive KPI &amp; revenue trackers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <IconCheck className="size-4 shrink-0 stroke-[1.5] text-brand" />
                <span>Automated budgeting &amp; P&amp;L models</span>
              </div>
              <div className="flex items-center gap-2.5">
                <IconCheck className="size-4 shrink-0 stroke-[1.5] text-brand" />
                <span>Interactive Pivot Tables &amp; slicers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <IconCheck className="size-4 shrink-0 stroke-[1.5] text-brand" />
                <span>Full formula documentation &amp; handover</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-11 w-full rounded-lg px-5 text-sm font-medium sm:w-auto"
              >
                <Link href="/custom-templates/" className="inline-flex items-center justify-center gap-2">
                  <span>Order custom dashboard</span>
                  <IconArrowRight className="size-4 stroke-[1.5]" />
                </Link>
              </Button>

              <span className="flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground sm:justify-start">
                <IconFileSpreadsheet className="size-4 stroke-[1.5] text-brand" />
                <span>Tailored to your company branding</span>
              </span>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-sm items-center justify-center sm:max-w-md lg:col-span-5 lg:max-w-none">
            <Image
              src="/images/services/consulting-editorial.webp"
              alt="Excel and Google Sheets custom financial modeling and dashboard consulting illustration"
              width={1192}
              height={864}
              className="h-auto max-h-56 w-full object-contain sm:max-h-80"
            />
          </div>
        </div>
      </article>

      {/* Tier 2: Specialty Services Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <article className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-8 transition-colors duration-150 hover:border-brand/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-brand">
                <IconTool className="size-5 stroke-[1.5]" />
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground tabular-nums">
                <IconClock className="size-3.5 stroke-[1.5] text-brand" />
                <span>24–48h turnaround</span>
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-150 group-hover:text-brand sm:text-xl">
                <Link href="/spreadsheet-solutions/">
                  Formula troubleshooting &amp; workbook repair
                </Link>
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Facing stubborn #VALUE!, #N/A errors, circular calculations, or bloated, slow-loading
                files? We diagnose the root cause and deliver production-ready fixes fast.
              </p>
            </div>

            <ul className="space-y-2 pt-1 text-sm font-medium text-foreground/85">
              <li className="flex items-center gap-2.5">
                <IconCheck className="size-4 shrink-0 stroke-[1.5] text-brand" />
                <span>Fix broken formulas, circular logic &amp; errors</span>
              </li>
              <li className="flex items-center gap-2.5">
                <IconCheck className="size-4 shrink-0 stroke-[1.5] text-brand" />
                <span>Speed up and compress heavy, laggy workbooks</span>
              </li>
              <li className="flex items-center gap-2.5">
                <IconCheck className="size-4 shrink-0 stroke-[1.5] text-brand" />
                <span>Clear formula explanations so you stay in control</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 border-t border-border/60 pt-4">
            <Link
              href="/spreadsheet-solutions/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors duration-150 hover:text-primary/80"
            >
              <span>Request troubleshooting diagnostic</span>
              <IconArrowRight className="size-4 stroke-[1.5]" />
            </Link>
          </div>
        </article>

        <article className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-8 transition-colors duration-150 hover:border-brand/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-brand">
                <IconCode className="size-5 stroke-[1.5]" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                Workflow automation
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-150 group-hover:text-brand sm:text-xl">
                <Link href="/custom-tools/">
                  VBA macros &amp; Google Apps Script
                </Link>
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Stop manual copy-pasting. We engineer automated scripts that consolidate multi-sheet
                datasets, generate automated PDF reports, and sync with third-party APIs.
              </p>
            </div>

            <ul className="space-y-2 pt-1 text-sm font-medium text-foreground/85">
              <li className="flex items-center gap-2.5">
                <IconCheck className="size-4 shrink-0 stroke-[1.5] text-brand" />
                <span>One-click automated VBA macro buttons</span>
              </li>
              <li className="flex items-center gap-2.5">
                <IconCheck className="size-4 shrink-0 stroke-[1.5] text-brand" />
                <span>Google Apps Script &amp; cross-sheet data pipelines</span>
              </li>
              <li className="flex items-center gap-2.5">
                <IconCheck className="size-4 shrink-0 stroke-[1.5] text-brand" />
                <span>Clean, well-commented code with zero bloated deps</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 border-t border-border/60 pt-4">
            <Link
              href="/custom-tools/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors duration-150 hover:text-primary/80"
            >
              <span>Build custom automated tool</span>
              <IconArrowRight className="size-4 stroke-[1.5]" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
