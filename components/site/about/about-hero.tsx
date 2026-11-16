import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STATS = [
  { value: "15+", label: "Years Spreadsheet Expertise" },
  { value: "50+", label: "Free Interactive Calculators" },
  { value: "100+", label: "Formulas & In-Depth Guides" },
  { value: "2", label: "Platforms: Excel & Sheets" },
  { value: "100%", label: "Free & Practical Focus" },
]

export function AboutHero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-gradient-to-bl from-navy-deep via-navy to-navy-soft pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      {/* Spreadsheet Grid Pattern Overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:28px_28px]"
      />

      {/* Ambient Gradient Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-brand/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 left-1/4 -z-10 h-80 w-80 rounded-full bg-brand-light/10 blur-3xl"
      />

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Pill Badge */}
        <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
          About Exceliko
        </div>

        {/* Main Heading */}
        <h1 className="mt-6 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Empowering spreadsheet users to work{" "}
          <span className="text-brand-light">faster and smarter.</span>
        </h1>

        {/* Subhead */}
        <p className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">
          Founded by spreadsheet consultant Nehad Ulfat, Exceliko is a comprehensive library
          of free calculators, step-by-step formula tutorials, and practical templates designed
          to turn hours of manual spreadsheet crunching into simple, repeatable workflows.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl bg-white px-7 text-sm font-semibold text-navy shadow-md hover:bg-white/90"
          >
            <Link href="/calculator/" className="flex items-center gap-2">
              <span>Try Free Calculators</span>
              <IconArrowRight className="size-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="lg"
            className="h-12 rounded-xl border border-white/25 px-7 text-sm font-semibold text-white hover:bg-white/10 hover:text-white dark:hover:bg-white/10"
          >
            <Link href="/blog/">Browse Tutorials</Link>
          </Button>
        </div>
      </div>

      {/* Floating Metric Card (Full-width max-w-7xl, clean responsive layout) */}
      <div className="mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:mt-16 lg:px-8">
        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-xl backdrop-blur-md sm:rounded-3xl sm:p-7 lg:p-8 dark:bg-card/95">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-border/60">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-3 text-center sm:px-4 sm:py-2",
                  index === 4 && "col-span-2 lg:col-span-1"
                )}
              >
                <p className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
