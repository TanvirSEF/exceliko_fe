import Image from "next/image"
import { IconCheck, IconMail } from "@tabler/icons-react"

import { NewsletterForm } from "@/components/site/newsletter/newsletter-form"

const BENEFITS = [
  "Instant 50+ Essential Excel Formulas Cheat Sheet PDF (XLOOKUP, INDEX/MATCH & more)",
  "1 Practical 3-minute spreadsheet trick every Tuesday morning",
  "Free downloadable business templates & ready-to-use VBA workbooks",
]

export function NewsletterBand({
  source = "home-band",
}: {
  source?: string
}) {
  return (
    <section
      className="relative my-8 sm:my-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-brand/5 p-6 sm:p-10 lg:p-12 shadow-xs"
      aria-labelledby="newsletter-heading"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
        {/* ── Left Column: Value Copy & Signup Form ── */}
        <div className="space-y-5 lg:col-span-7">
          {/* Brand Kicker */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            <IconMail className="size-3.5" />
            <span>WEEKLY EXCELIKO NEWSLETTER</span>
          </div>

          {/* Heading */}
          <h2
            id="newsletter-heading"
            className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            Level Up Your Spreadsheet Skills —{" "}
            <span className="text-brand">Get Our Free 50+ Formula PDF Guide</span>
          </h2>

          {/* Subtitle */}
          <p className="max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            Bite-sized formula breakdowns, automated templates, and practical spreadsheet tricks sent directly
            to your inbox every week. 100% free for analysts, accountants, and spreadsheet learners.
          </p>

          {/* Clean 3-Item Benefit Checklist */}
          <ul className="space-y-2.5 pt-1 text-xs sm:text-sm font-medium text-foreground/85">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand mt-0.5">
                  <IconCheck className="size-3.5 stroke-[2.5]" />
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Signup Form */}
          <div className="pt-2">
            <NewsletterForm source={source} variant="band" />
          </div>
        </div>

        {/* ── Right Column: Clean 2D Flat Editorial Vector Artwork ── */}
        <div className="relative flex items-center justify-center lg:col-span-5">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none flex items-center justify-center">
            <Image
              src="/images/newsletter-guide-editorial.webp"
              alt="50+ Essential Excel Formulas Free PDF Guide and Spreadsheet Cheat Sheet"
              width={854}
              height={685}
              priority
              className="w-full h-auto max-h-[280px] sm:max-h-[340px] object-contain drop-shadow-xs transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
