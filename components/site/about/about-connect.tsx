import Link from "next/link"
import {
  IconArrowRight,
  IconCalculator,
  IconMail,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export function AboutConnect() {
  return (
    <div className="space-y-12 pb-16 pt-4 sm:space-y-16 sm:pb-20">
      {/* 1. Say Hello / Let's Stay Connected */}
      <section className="border-t border-border/60 pt-12 sm:pt-16">
        <div className="mb-8 text-center sm:text-left">
          <p className="text-xs font-medium text-brand sm:text-sm">
            Say hello
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Let&apos;s stay connected
          </h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Whether you have a spreadsheet question, need custom template engineering, or just
            want to follow along with what we build.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-brand">
                <IconMail className="size-5 stroke-[1.5]" />
              </div>
              <h4 className="text-xl font-semibold tracking-tight text-foreground">
                Stuck on a spreadsheet problem?
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Got a broken formula, a sluggish workbook, or an idea for a calculator you would
                love to see on Exceliko? Send us a message and our team will get back to you.
              </p>
            </div>

            <div className="mt-6 border-t border-border/60 pt-4">
              <Button asChild className="h-10 w-full rounded-lg font-medium sm:w-auto">
                <Link href="/contact/" className="inline-flex items-center gap-2">
                  <IconMail className="size-4 stroke-[1.5]" />
                  <span>Send us a message</span>
                  <IconArrowRight className="size-4 stroke-[1.5]" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-brand">
                <IconCalculator className="size-5 stroke-[1.5]" />
              </div>
              <h4 className="text-xl font-semibold tracking-tight text-foreground">
                Browse our free calculator hub
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Need an immediate answer? Try our 50+ financial, accounting, and statistical
                calculators. Completely free, no login or complex setup required.
              </p>
            </div>

            <div className="mt-6 border-t border-border/60 pt-4">
              <Button asChild variant="outline" className="h-10 w-full rounded-lg font-medium sm:w-auto">
                <Link href="/calculator/" className="inline-flex items-center gap-2">
                  <IconCalculator className="size-4 stroke-[1.5]" />
                  <span>Explore calculators</span>
                  <IconArrowRight className="size-4 stroke-[1.5]" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bottom CTA Banner */}
      <section className="rounded-2xl border border-white/10 bg-navy-deep px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="mx-auto max-w-2xl space-y-5">
          <p className="text-xs font-medium text-brand-light sm:text-sm">
            Start learning today
          </p>

          <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to save hours on your spreadsheets?
          </h2>

          <p className="text-pretty text-sm leading-relaxed text-white/75 sm:text-base">
            Explore our library of 50+ free financial, accounting, and statistical calculators,
            or dive into our in-depth formula guides.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-lg bg-white px-5 text-sm font-medium text-navy-deep transition-colors duration-150 hover:bg-white/90 active:scale-[0.98]"
            >
              <Link href="/calculator/" className="inline-flex items-center gap-2">
                <span>Try free calculators</span>
                <IconArrowRight className="size-4 stroke-[1.5]" />
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-11 rounded-lg border border-white/15 bg-white/5 px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/10 hover:text-white active:scale-[0.98]"
            >
              <Link href="/blog/">Browse all articles</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
