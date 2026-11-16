import Link from "next/link"
import {
  IconArrowRight,
  IconBrandLinkedin,
  IconExternalLink,
  IconMail,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export function AboutConnect() {
  return (
    <div className="space-y-16 pb-16 pt-8 sm:space-y-20 sm:pb-24 sm:pt-12">
      {/* 1. Say Hello / Let's Stay Connected (2-Card Grid) */}
      <section className="border-t border-border/60 pt-14 sm:pt-18">
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
            <IconMail className="size-3.5" />
            <span>Say Hello</span>
          </div>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Let&apos;s stay connected
          </h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Whether you have a spreadsheet question, need custom template engineering, or just
            want to follow along with what we build.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1: Problem-Solving & Direct Message */}
          <div className="flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 shadow-2xs sm:p-8">
            <div className="space-y-3">
              <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <IconMail className="size-5" />
              </div>
              <h4 className="text-xl font-bold tracking-tight text-foreground">
                Stuck on a spreadsheet problem?
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Got a broken formula, a sluggish workbook, or an idea for a calculator you would
                love to see on Exceliko? Send us a message and our team will get back to you.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/60">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/contact/" className="flex items-center gap-2">
                  <IconMail className="size-4" />
                  <span>Send us a message</span>
                  <IconArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Card 2: Follow Along & Social */}
          <div className="flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 shadow-2xs sm:p-8">
            <div className="space-y-3">
              <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <IconBrandLinkedin className="size-5 text-[#0077B5]" />
              </div>
              <h4 className="text-xl font-bold tracking-tight text-foreground">
                Connect on LinkedIn
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Connect directly with our founder Nehad Ulfat on LinkedIn for spreadsheet tips,
                formula breakdowns, industry discussions, and upcoming calculator releases.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/60">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a
                  href="https://www.linkedin.com/in/nehad-ulfat-22042017b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <IconBrandLinkedin className="size-4 text-[#0077B5]" />
                  <span>Connect with Nehad</span>
                  <IconExternalLink className="size-3.5 text-muted-foreground" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. High-Converting Bottom CTA Banner */}
      <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-bl from-navy-deep via-navy to-navy-soft px-6 py-14 text-center shadow-xl sm:px-12 sm:py-20">
        {/* Spreadsheet Grid Pattern Overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"
        />

        {/* Ambient Glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 -z-10 size-72 rounded-full bg-brand/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -right-20 -z-10 size-72 rounded-full bg-white/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-2xl space-y-6">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
            Start Learning Today
          </div>

          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to save hours on your spreadsheets?
          </h2>

          <p className="text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
            Explore our library of 50+ free financial, accounting, and statistical calculators,
            or dive into our in-depth formula guides.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-white px-7 text-sm font-semibold text-navy shadow-md hover:bg-white/90"
            >
              <Link href="/calculator/" className="flex items-center gap-2">
                <span>Try Free Calculators</span>
                <IconArrowRight className="size-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-12 rounded-xl border border-white/25 px-7 text-sm font-semibold text-white hover:bg-white/10 hover:text-white dark:hover:bg-white/10"
            >
              <Link href="/blog/">Browse All Articles</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
