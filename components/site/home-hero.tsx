import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"

import { HeroVisual } from "@/components/site/hero-visual"
import { Button } from "@/components/ui/button"
import type { Category } from "@/types/api"

const CALCULATOR_TOPICS = [
  { label: "Finance calculators", href: "/calculator/finance/" },
  { label: "Accounting calculators", href: "/calculator/accounting/" },
  { label: "Statistics calculators", href: "/calculator/statistics/" },
]

export function HomeHero({ categories = [] }: { categories?: Category[] }) {
  const topics =
    categories.length > 0
      ? categories.slice(0, 4).map((category) => ({
          label: category.name,
          href: `/${category.slug}/`,
        }))
      : CALCULATOR_TOPICS

  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate w-full overflow-hidden bg-gradient-to-bl from-navy-deep via-navy to-navy-soft"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(48rem_32rem_at_88%_0%,color-mix(in_oklab,var(--brand-light)_18%,transparent),transparent)]"
      />
      <div
        aria-hidden
        className="absolute -left-24 -top-1/3 -z-10 h-[170%] w-56 rotate-[20deg] bg-gradient-to-b from-brand-light/10 to-transparent"
      />
      <div
        aria-hidden
        className="absolute left-1/4 -top-1/3 -z-10 h-[170%] w-40 rotate-[20deg] bg-gradient-to-b from-white/6 to-transparent"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-14 lg:px-12 xl:grid-cols-[1.3fr_1fr] xl:py-12">
        <div className="space-y-5">
          <h1
            id="home-hero-title"
            className="text-balance text-[1.85rem] font-bold leading-[1.15] tracking-tight text-white sm:text-4xl xl:text-[2.6rem]"
          >
            Excel &amp; Google Sheets
            <span className="block text-brand-light">
              tutorials, calculators and custom solutions
            </span>
          </h1>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
            Learn formulas step by step, use free calculators, or have an expert build the
            spreadsheet for you.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
            <Button
              asChild
              className="h-11 w-full rounded-lg bg-white px-6 text-[15px] font-semibold text-navy hover:bg-white/90 sm:w-auto"
            >
              <Link href="/calculator/">
                Try free calculators
                <IconArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-11 w-full rounded-lg border border-white/25 px-6 text-[15px] font-semibold text-white hover:bg-white/10 hover:text-white dark:hover:bg-white/10 sm:w-auto"
            >
              <Link href="/blog/">Browse tutorials</Link>
            </Button>
          </div>

          <ul className="flex flex-wrap gap-2 pt-1">
            {topics.map((topic) => (
              <li key={topic.href}>
                <Link
                  href={topic.href}
                  className="inline-flex rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:border-white/40 hover:bg-white/12 hover:text-white"
                >
                  {topic.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden xl:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
