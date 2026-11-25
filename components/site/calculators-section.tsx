import Image from "next/image"
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
  image: string
  icon: TablerIcon
  hub: CalculatorHub
  find: (slug: string) => CalculatorEntry | undefined
  featured: string[]
}

const HUB_CARDS: HubCard[] = [
  {
    id: "finance",
    title: "Financial & Investment",
    badgeLabel: "Finance suite",
    description:
      "Model investment yields, calculate Internal Rate of Return (IRR), DRIP compounding, and analyze rental property ROI.",
    image: "/images/calculators/finance.svg",
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
    badgeLabel: "Accounting suite",
    description:
      "Calculate retail margins, working capital cycles, overtime wages, and tiered sales commission schedules.",
    image: "/images/calculators/accounting.svg",
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
    badgeLabel: "Statistics suite",
    description:
      "Run one-way ANOVA hypothesis tests, convert Z-scores to percentiles, and calculate weighted averages and geometric means.",
    image: "/images/calculators/statistics.svg",
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
    <section className="py-8 sm:py-10 lg:py-12" aria-labelledby="calculators-heading">
      <SectionHeading
        badge={`${TOTAL_CALCULATORS} free interactive tools`}
        title="Instant browser-based calculators"
        subtitle="Three dedicated calculation libraries for finance, accounting, and statistics — every formula explained, every result calculated step by step."
        action={{ label: `View all ${TOTAL_CALCULATORS} calculators`, href: "/calculator/" }}
        className="mb-6 sm:mb-8"
      />

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
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors duration-150 hover:border-brand/40 sm:p-7"
            >
              <div className="space-y-5">
                <div className="overflow-hidden rounded-xl border border-border/70 bg-[#f8f9fb]">
                  <Image
                    src={card.image}
                    alt={`${card.title} calculators illustration`}
                    width={400}
                    height={200}
                    className="h-auto w-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-brand">
                    <CardIcon className="size-5 stroke-[1.5]" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {count} calculators
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors duration-150 group-hover:text-brand">
                    <Link href={hubHref} prefetch={false}>
                      {card.title}
                    </Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Popular calculators
                  </p>
                  <div className="space-y-2">
                    {tools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`${hubHref}${tool.slug}/`}
                        prefetch={false}
                        className="group/item flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-muted/30 px-3 py-2.5 transition-colors duration-150 hover:border-brand/40 hover:bg-muted/60"
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <IconCalculator className="size-4 shrink-0 stroke-[1.5] text-muted-foreground transition-colors duration-150 group-hover/item:text-brand" />
                          <span className="truncate text-sm font-medium text-foreground/90 transition-colors duration-150 group-hover/item:text-brand">
                            {tool.name}
                          </span>
                        </div>
                        <IconArrowRight className="size-3.5 shrink-0 stroke-[1.5] text-muted-foreground transition-colors duration-150 group-hover/item:text-brand" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-border/60 pt-4">
                <Button
                  asChild
                  variant="outline"
                  className="h-10 w-full rounded-lg text-sm font-medium transition-colors duration-150 group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground"
                >
                  <Link href={hubHref} prefetch={false} className="inline-flex items-center justify-center gap-2">
                    <span>Explore all {count} tools</span>
                    <IconArrowRight className="size-4 stroke-[1.5]" />
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
