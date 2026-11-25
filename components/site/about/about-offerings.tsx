import Link from "next/link"
import {
  IconArrowRight,
  IconBook2,
  IconBriefcase,
  IconCalculator,
  IconFileSpreadsheet,
} from "@tabler/icons-react"

import { SectionHeading } from "@/components/site/section-heading"

const OFFERINGS = [
  {
    badge: "Instant math",
    icon: IconCalculator,
    title: "50+ free calculators",
    description:
      "Financial, accounting, and statistical calculators that do the heavy lifting instantly. No spreadsheet errors, no setup required.",
    cta: "Explore calculators",
    href: "/calculator/",
  },
  {
    badge: "Step-by-step",
    icon: IconBook2,
    title: "Excel & Sheets guides",
    description:
      "In-depth, illustrated tutorials covering essentials like XLOOKUP, INDEX/MATCH, dynamic arrays, and Google Sheets QUERY formulas.",
    cta: "Browse tutorials",
    href: "/blog/",
  },
  {
    badge: "Ready to use",
    icon: IconFileSpreadsheet,
    title: "Practical templates",
    description:
      "Clean, pre-built workbooks for budgeting, project management, sales tracking, and financial analysis that you can use right away.",
    cta: "Find templates",
    href: "/blog/",
  },
  {
    badge: "Bespoke help",
    icon: IconBriefcase,
    title: "Custom solutions",
    description:
      "Need a complex formula fixed or an automated dashboard built for your business? We offer dedicated spreadsheet engineering.",
    cta: "Request a solution",
    href: "/contact/",
  },
]

export function AboutOfferings() {
  return (
    <section className="border-t border-border/60 py-12 sm:py-16 lg:py-20">
      <SectionHeading
        badge="What we offer"
        title="Everything you need to master your spreadsheets"
        subtitle="Built for analysts, accountants, small business owners, and everyday spreadsheet users."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERINGS.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors duration-150 hover:border-brand/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-brand transition-colors duration-150 group-hover:bg-brand group-hover:text-brand-foreground">
                    <Icon className="size-5 stroke-[1.5]" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 border-t border-border/60 pt-4">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-150 hover:text-brand/80"
                >
                  <span>{item.cta}</span>
                  <IconArrowRight className="size-4 stroke-[1.5]" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
