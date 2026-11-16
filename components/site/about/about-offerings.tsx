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
    badge: "INSTANT MATH",
    icon: IconCalculator,
    title: "50+ Free Calculators",
    description:
      "Financial, accounting, and statistical calculators that do the heavy lifting instantly. No spreadsheet errors, no setup required.",
    cta: "Explore calculators",
    href: "/calculator/",
  },
  {
    badge: "STEP-BY-STEP",
    icon: IconBook2,
    title: "Excel & Sheets Guides",
    description:
      "In-depth, illustrated tutorials covering essentials like XLOOKUP, INDEX/MATCH, dynamic arrays, and Google Sheets QUERY formulas.",
    cta: "Browse tutorials",
    href: "/blog/",
  },
  {
    badge: "READY TO USE",
    icon: IconFileSpreadsheet,
    title: "Practical Templates",
    description:
      "Clean, pre-built workbooks for budgeting, project management, sales tracking, and financial analysis that you can use right away.",
    cta: "Find templates",
    href: "/blog/",
  },
  {
    badge: "BESPOKE HELP",
    icon: IconBriefcase,
    title: "Custom Solutions",
    description:
      "Need a complex formula fixed or an automated dashboard built for your business? We offer dedicated spreadsheet engineering.",
    cta: "Request a solution",
    href: "/contact/",
  },
]

export function AboutOfferings() {
  return (
    <section className="border-t border-border/60 py-14 sm:py-20">
      <SectionHeading
        badge="What We Offer"
        title="Everything you need to master your spreadsheets"
        subtitle="Built for analysts, accountants, small business owners, and everyday spreadsheet users."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERINGS.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <span className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  <span>{item.cta}</span>
                  <IconArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
