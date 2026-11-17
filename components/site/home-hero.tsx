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

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-18">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left Column: Heading, Subhead, CTAs, and Topics */}
          <div className="space-y-4 sm:space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
              Excel &amp; Google Sheets Learning Hub
            </div>

            <h1
              id="home-hero-title"
              className="text-balance text-2xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.25rem] xl:leading-[1.12]"
            >
              Excel &amp; Google Sheets{" "}
              <span className="block text-brand-light">
                tutorials, calculators and custom solutions
              </span>
            </h1>

            <p className="max-w-xl text-pretty text-xs leading-relaxed text-white/80 sm:text-base lg:text-lg">
              Master essential formulas step by step, calculate instant results with 50+ free
              tools, or have experienced practitioners build custom spreadsheet models for you.
            </p>

            {/* CTAs: Side-by-side compact on mobile, generous flex on sm+ */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3 pt-1">
              <Button
                asChild
                size="lg"
                className="h-10 sm:h-12 rounded-xl bg-white px-3 sm:px-7 text-xs sm:text-sm font-bold text-navy shadow-md hover:bg-white/90"
              >
                <Link href="/calculator/" className="flex items-center justify-center gap-1.5">
                  <span className="truncate">Free calculators</span>
                  <IconArrowRight className="size-3.5 shrink-0" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-10 sm:h-12 rounded-xl border border-white/25 px-3 sm:px-7 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 hover:text-white dark:hover:bg-white/10"
              >
                <Link href="/blog/" className="flex items-center justify-center truncate">
                  Browse tutorials
                </Link>
              </Button>
            </div>

            {/* Trust Checklist (Single compact line on mobile, checked list on sm+) */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5 text-[11px] sm:text-sm font-medium text-white/80">
              {TRUST_POINTS.map((point, index) => (
                <div key={point} className="flex items-center gap-1.5">
                  <div className="flex size-3.5 sm:size-4 shrink-0 items-center justify-center rounded-full bg-brand/25 text-brand-light">
                    <IconCheck className="size-2.5 sm:size-3 stroke-[3]" />
                  </div>
                  <span>{point}</span>
                  {index < TRUST_POINTS.length - 1 && (
                    <span className="sm:hidden text-white/30 ml-1.5">•</span>
                  )}
                </div>
              ))}
            </div>

            {/* Topic Navigation Pills (Hidden on mobile to save vertical space; visible on sm+) */}
            <div className="hidden sm:block pt-1">
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

          {/* Right Column: Live Glassmorphic Spreadsheet Workbench (Desktop only) */}
          <div className="hidden lg:block w-full">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}