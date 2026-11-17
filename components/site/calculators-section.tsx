import Link from "next/link"
import type { TablerIcon } from "@tabler/icons-react"
import {
  IconArrowRight,
  IconCalculator,
  IconChartHistogram,
  IconReportMoney,
  IconScale,
} from "@tabler/icons-react"

import { SectionHeading } from "@/components/site/section-heading"
import { Button } from "@/components/ui/button"
import {
  ACCOUNTING_HUB,
  FINANCE_HUB,
  STATS_HUB,
  getAccountingCalculator,
  getFinanceCalculator,
  getStatsCalculator,
  type CalculatorEntry,
  type CalculatorHub,
} from "@/lib/calculators"

interface HubCard {
  id: string
  title: string
  badgeLabel: string
  description: string
  icon: TablerIcon
  hub: CalculatorHub
  find: (slug: string) => CalculatorEntry | undefined
  featured: string[]
}

const HUB_CARDS: HubCard[] = [
  {
    id: "finance",
    title: "Financial & Investment",
    badgeLabel: "Finance Suite",
    description:
      "Model investment yields, calculate Internal Rate of Return (IRR), DRIP compounding, and analyze rental property ROI.",
    icon: IconReportMoney,
    hub: FINANCE_HUB,
    find: getFinanceCalculator,
    featured: [
      "internal-rate-of-return",
      "dividend-reinvestment-plan",
      "rental-property-roi",
      "share-profit",
    ],
  },
  {
    id: "accounting",
    title: "Accounting & Business",
    badgeLabel: "Accounting Suite",
    description:
      "Calculate retail margins, working capital cycles, overtime wages, and tiered sales commission schedules.",
    icon: IconScale,
    hub: ACCOUNTING_HUB,
    find: getAccountingCalculator,
    featured: [
      "retail-profit-margin",
      "payroll-with-overtime",
      "cash-conversion-cycle",
      "sales-commission",
    ],
  },
  {
    id: "statistics",
    title: "Statistics & Probability",
    badgeLabel: "Statistics Suite",
    description:
      "Run one-way ANOVA hypothesis tests, convert Z-scores to percentiles, and calculate weighted averages and geometric means.",
    icon: IconChartHistogram,
    hub: STATS_HUB,
    find: getStatsCalculator,
    featured: [
      "weighted-average-grade",
      "one-way-analysis-of-variance",
      "z-score-to-percentile",
      "geometric-mean",
    ],
  },
]

function countCalculators(hub: CalculatorHub) {
  return hub.groups.reduce((total, group) => total + group.calculators.length, 0)
}

const TOTAL_CALCULATORS = HUB_CARDS.reduce((total, card) => total + countCalculators(card.hub), 0)

export function CalculatorsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20" aria-labelledby="calculators-heading">
      <SectionHeading
        badge={`${TOTAL_CALCULATORS} Free Interactive Tools`}
        title="Instant Browser-Based Calculators"
        subtitle="Three dedicated calculation libraries for finance, accounting, and statistics — every formula explained, every result calculated step by step."
        action={{ label: `View All ${TOTAL_CALCULATORS} Calculators`, href: "/calculator/" }}
        className="mb-8 sm:mb-10"
      />

      {/* ── 3 Calculator Suite Cards ── */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {HUB_CARDS.map((card) => {
          const hubHref = `/calculator/${card.hub.slug}/`
          const count = countCalculators(card.hub)
          const tools = card.featured
            .map((slug) => card.find(slug))
            .filter((tool): tool is CalculatorEntry => Boolean(tool))
          const CardIcon = card.icon

          return (
            <article
              key={card.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card to-brand/5 p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-xl dark:bg-card"
            >
              <div className="space-y-5">
                {/* Top Row: Dual-Tone Brand Icon + Tool Count Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-brand">
                    <CardIcon className="size-6" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                    <span>{count} Calculators</span>
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-brand">
                    <Link href={hubHref} prefetch={false}>
                      {card.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground min-h-[2.8rem]">
                    {card.description}
                  </p>
                </div>

                {/* Featured Interactive Calculator Tiles */}
                <div className="space-y-2.5 pt-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Popular Calculators
                  </p>
                  <div className="space-y-2">
                    {tools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`${hubHref}${tool.slug}/`}
                        prefetch={false}
                        className="group/item flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/20 px-3.5 py-2.5 transition-all duration-200 hover:border-brand/40 hover:bg-brand/10 hover:shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-card text-brand transition-colors group-hover/item:border-brand/40">
                            <IconCalculator className="size-3.5" />
                          </span>
                          <span className="truncate text-xs sm:text-sm font-semibold text-foreground/90 transition-colors group-hover/item:text-brand">
                            {tool.name}
                          </span>
                        </div>
                        <IconArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-all duration-200 group-hover/item:translate-x-1 group-hover/item:text-brand" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="mt-6 border-t border-border/60 pt-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-xl h-10 text-xs sm:text-sm font-semibold transition-all group-hover:bg-brand group-hover:text-white group-hover:border-brand"
                >
                  <Link href={hubHref} prefetch={false} className="flex items-center justify-center gap-2">
                    <span>Explore all {count} tools</span>
                    <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}