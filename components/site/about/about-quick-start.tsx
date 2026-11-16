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
    title: "Financial Calculators",
    description: "Loan amortization, compound interest, mortgage, ROI, NPV, and IRR tools.",
    href: "/calculator/finance/",
  },
  {
    icon: IconReceiptTax,
    title: "Accounting Calculators",
    description: "Depreciation schedules, break-even analysis, markup, COGS, and payroll.",
    href: "/calculator/accounting/",
  },
  {
    icon: IconChartBar,
    title: "Statistics Calculators",
    description: "Standard deviation, z-score, linear regression, sample size, and variance.",
    href: "/calculator/statistics/",
  },
  {
    icon: IconMathFunction,
    title: "Excel Functions & Formulas",
    description: "Practical tutorials on XLOOKUP, INDEX/MATCH, SUMIFS, and dynamic arrays.",
    href: "/blog/",
  },
  {
    icon: IconTableShare,
    title: "Google Sheets Guides",
    description: "Cloud collaboration, QUERY function, IMPORTRANGE, and automated workflows.",
    href: "/google-sheets/",
  },
  {
    icon: IconTool,
    title: "Custom Spreadsheet Services",
    description: "Tailored spreadsheet engineering, template creation, and error troubleshooting.",
    href: "/contact/",
  },
]

export function AboutQuickStart() {
  return (
    <section className="border-t border-border/60 py-14 sm:py-20">
      <SectionHeading
        badge="Curated Hubs"
        title="Good places to start on Exceliko"
        subtitle="Explore the most visited sections, calculators, and tutorial hubs across the site."
      />

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {QUICK_START_LINKS.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group relative flex items-start gap-4 rounded-xl border border-border/70 bg-card p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-xs"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/40 text-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                <Icon className="size-5" />
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <IconArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
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
