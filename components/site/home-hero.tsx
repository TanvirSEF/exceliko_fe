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
      className="w-full border-b border-white/10 bg-navy-deep"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-6">
            <h1
              id="home-hero-title"
              className="text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl lg:tracking-[-0.03em]"
            >
              Excel &amp; Google Sheets{" "}
              <span className="block text-brand-light">
                tutorials, calculators and custom solutions
              </span>
            </h1>

            <p className="max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
              Master essential formulas step by step, calculate instant results with 50+ free
              tools, or have experienced practitioners build custom spreadsheet models for you.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-lg bg-white px-5 text-sm font-medium text-navy-deep transition-colors duration-150 hover:bg-white/90 active:scale-[0.98]"
              >
                <Link href="/calculator/" className="inline-flex items-center gap-2">
                  <span>Free calculators</span>
                  <IconArrowRight className="size-4 shrink-0 stroke-[1.5]" />
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

            <div className="hidden sm:block pt-2">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {topics.map((topic) => (
                  <li key={topic.href}>
                    <Link
                      href={topic.href}
                      className="text-xs font-medium text-white/65 transition-colors duration-150 hover:text-white"
                    >
                      {topic.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-6 w-full">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
