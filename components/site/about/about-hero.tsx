import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STATS = [
  { value: "15+", label: "Years spreadsheet expertise" },
  { value: "50+", label: "Free interactive calculators" },
  { value: "100+", label: "Formulas & in-depth guides" },
  { value: "2", label: "Platforms: Excel & Sheets" },
  { value: "100%", label: "Free & practical focus" },
]

export function AboutHero() {
  return (
    <section className="w-full border-b border-white/10 bg-navy-deep py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-medium text-brand-light sm:text-sm">
          About Exceliko
        </p>

        <h1 className="mt-3 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl lg:tracking-[-0.03em]">
          Empowering spreadsheet users to work{" "}
          <span className="text-brand-light">faster and smarter</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
          Exceliko is an independent digital library of free calculators, step-by-step formula
          tutorials, and practical spreadsheet templates designed to turn hours of manual crunching
          into simple, repeatable workflows.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="h-11 rounded-lg bg-white px-5 text-sm font-medium text-navy-deep transition-colors duration-150 hover:bg-white/90 active:scale-[0.98]"
          >
            <Link href="/calculator/" className="inline-flex items-center gap-2">
              <span>Try free calculators</span>
              <IconArrowRight className="size-4 stroke-[1.5]" />
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="lg"
            className="h-11 rounded-lg border border-white/15 bg-white/5 px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/10 hover:text-white active:scale-[0.98]"
          >
            <Link href="/blog/">Browse tutorials</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:mt-16 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-border/60">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-2 text-center sm:px-4",
                  index === 4 && "col-span-2 lg:col-span-1"
                )}
              >
                <p className="font-mono text-3xl font-semibold tracking-tight text-foreground tabular-nums sm:text-4xl">
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
