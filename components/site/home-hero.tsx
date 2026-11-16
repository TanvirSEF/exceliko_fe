import Link from "next/link"
import { IconArrowRight, IconCheck } from "@tabler/icons-react"

import { HeroVisual } from "@/components/site/hero-visual"
import { Button } from "@/components/ui/button"
import type { Category } from "@/types/api"

const CALCULATOR_TOPICS = [
  { label: "Finance calculators", href: "/calculator/finance/" },
  { label: "Accounting calculators", href: "/calculator/accounting/" },
  { label: "Statistics calculators", href: "/calculator/statistics/" },
]

const TRUST_POINTS = [
  "50+ Free Calculators",
  "Real-World Tested Formulas",
  "100% Free & Open Access",
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
      {/* Background Lighting & Grid Matrix */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(48rem_32rem_at_88%_0%,color-mix(in_oklab,var(--brand-light)_18%,transparent),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-1/3 -z-10 h-[170%] w-56 rotate-[20deg] bg-gradient-to-b from-brand-light/10 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 -top-1/3 -z-10 h-[170%] w-40 rotate-[20deg] bg-gradient-to-b from-white/6 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left Column: Heading, Subhead, CTAs, and Topics */}
          <div className="space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
              Excel &amp; Google Sheets Learning Hub
            </div>

            <h1
              id="home-hero-title"
              className="text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl xl:text-[3.25rem]"
            >
              Excel &amp; Google Sheets{" "}
              <span className="block text-brand-light">
                tutorials, calculators and custom solutions
              </span>
            </h1>

            <p className="max-w-xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
              Master essential formulas step by step, calculate instant results with 50+ free
              tools, or have experienced practitioners build custom spreadsheet models for you.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Button
                asChild
                size="lg"
                className="h-12 w-full rounded-xl bg-white px-7 text-sm font-semibold text-navy shadow-md hover:bg-white/90 sm:w-auto"
              >
                <Link href="/calculator/" className="flex items-center gap-2">
                  <span>Try free calculators</span>
                  <IconArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-12 w-full rounded-xl border border-white/25 px-7 text-sm font-semibold text-white hover:bg-white/10 hover:text-white dark:hover:bg-white/10 sm:w-auto"
              >
                <Link href="/blog/">Browse tutorials</Link>
              </Button>
            </div>

            {/* Trust Checklist */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs font-medium text-white/85 sm:text-sm">
              {TRUST_POINTS.map((point) => (
                <div key={point} className="flex items-center gap-1.5">
                  <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-brand/25 text-brand-light">
                    <IconCheck className="size-3 stroke-[3]" />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Topic Navigation Pills */}
            <div className="pt-2">
              <ul className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <li key={topic.href}>
                    <Link
                      href={topic.href}
                      className="inline-flex rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-white/40 hover:bg-white/12 hover:text-white"
                    >
                      {topic.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Live Glassmorphic Spreadsheet Workbench */}
          <div>
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
