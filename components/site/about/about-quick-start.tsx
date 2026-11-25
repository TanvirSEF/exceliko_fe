import Link from "next/link"
import {
  IconArrowUpRight,
  IconChartBar,
  IconChartPie,
  IconMathFunction,
  IconReceiptTax,
  IconTableShare,
  IconTool,
} from "@tabler/icons-react"

import { SectionHeading } from "@/components/site/section-heading"

const QUICK_START_LINKS = [
  {
    icon: IconChartPie,
    title: "Financial calculators",
    description: "Loan amortization, compound interest, mortgage, ROI, NPV, and IRR tools.",
    href: "/calculator/finance/",
  },
  {
    icon: IconReceiptTax,
    title: "Accounting calculators",
    description: "Depreciation schedules, break-even analysis, markup, COGS, and payroll.",
    href: "/calculator/accounting/",
  },
  {
    icon: IconChartBar,
    title: "Statistics calculators",
    description: "Standard deviation, z-score, linear regression, sample size, and variance.",
    href: "/calculator/statistics/",
  },
  {
    icon: IconMathFunction,
    title: "Excel functions & formulas",
    description: "Practical tutorials on XLOOKUP, INDEX/MATCH, SUMIFS, and dynamic arrays.",
    href: "/blog/",
  },
  {
    icon: IconTableShare,
    title: "Google Sheets guides",
    description: "Cloud collaboration, QUERY function, IMPORTRANGE, and automated workflows.",
    href: "/google-sheets/",
  },
  {
    icon: IconTool,
    title: "Custom spreadsheet services",
    description: "Tailored spreadsheet engineering, template creation, and error troubleshooting.",
    href: "/contact/",
  },
]

export function AboutQuickStart() {
  return (
    <section className="border-t border-border/60 py-12 sm:py-16 lg:py-20">
      <SectionHeading
        badge="Curated hubs"
        title="Good places to start on Exceliko"
        subtitle="Explore the most visited sections, calculators, and tutorial hubs across the site."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {QUICK_START_LINKS.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors duration-150 hover:border-brand/40"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-foreground transition-colors duration-150 group-hover:border-brand/30 group-hover:bg-brand/10 group-hover:text-brand">
                <Icon className="size-5 stroke-[1.5]" />
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors duration-150 group-hover:text-brand">
                    {item.title}
                  </h3>
                  <IconArrowUpRight className="size-4 shrink-0 stroke-[1.5] text-muted-foreground transition-colors duration-150 group-hover:text-brand" />
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {item.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
