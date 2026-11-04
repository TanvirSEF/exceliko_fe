import Link from "next/link"
import type { TablerIcon } from "@tabler/icons-react"
import {
  IconArrowRight,
  IconChartHistogram,
  IconChevronRight,
  IconReportMoney,
  IconScale,
} from "@tabler/icons-react"

import { SectionHeading } from "@/components/site/section-heading"
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
    <section className="py-12 sm:py-16">
      <SectionHeading
        badge={`${TOTAL_CALCULATORS} Free Tools`}
        title="Instant Browser-Based Calculators"
        subtitle="Three libraries of instant, browser-based calculators for statistics, finance, and accounting — every formula explained, every result step by step."
        action={{ label: `View All ${TOTAL_CALCULATORS} Calculators`, href: "/calculator/" }}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {HUB_CARDS.map((card) => {
          const hubHref = `/calculator/${card.hub.slug}/`
          const count = countCalculators(card.hub)
          const tools = card.featured
            .map((slug) => card.find(slug))
            .filter((tool): tool is CalculatorEntry => Boolean(tool))

          return (
            <article
              key={card.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brand-light opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex items-start justify-between gap-3">
                <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-soft text-brand-light shadow-md ring-1 ring-navy/20">
                  <card.icon className="size-6" />
                </span>
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                  {count} calculators
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-brand">
                <Link href={hubHref} prefetch={false}>
                  {card.title}
                </Link>
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground md:min-h-[4.6rem]">
                {card.description}
              </p>

              <p className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                Popular
              </p>
              <ul className="mt-2 divide-y divide-border/60 border-y border-border/60">
                {tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`${hubHref}${tool.slug}/`}
                      prefetch={false}
                      className="group/item flex items-center justify-between gap-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-brand"
                    >
                      <span className="truncate">{tool.name}</span>
                      <IconChevronRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover/item:translate-x-0.5 group-hover/item:text-brand" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5">
                <Link
                  href={hubHref}
                  prefetch={false}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                >
                  Explore all {count} tools
                  <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
