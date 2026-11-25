import Image from "next/image"
import { IconCheck, IconMail } from "@tabler/icons-react"

import { NewsletterForm } from "@/components/site/newsletter/newsletter-form"

const BENEFITS = [
  "Instant 50+ Essential Excel Formulas Cheat Sheet PDF (XLOOKUP, INDEX/MATCH & more)",
  "1 practical 3-minute spreadsheet trick every Tuesday morning",
  "Free downloadable business templates & ready-to-use VBA workbooks",
]

export function NewsletterBand({
  source = "home-band",
}: {
  source?: string
}) {
  return (
    <section
      className="rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10"
      aria-labelledby="newsletter-heading"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-5 lg:col-span-7">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-brand sm:text-sm">
            <IconMail className="size-4 stroke-[1.5]" />
            <span>Weekly Exceliko newsletter</span>
          </div>

          <h2
            id="newsletter-heading"
            className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            Level up your spreadsheet skills —{" "}
            <span className="text-brand">get our free 50+ formula PDF guide</span>
          </h2>

          <p className="max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            Bite-sized formula breakdowns, automated templates, and practical spreadsheet tricks sent directly
            to your inbox every week. Free for analysts, accountants, and spreadsheet learners.
          </p>

          <ul className="space-y-2.5 pt-1 text-sm text-foreground/85">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5">
                <IconCheck className="mt-0.5 size-4 shrink-0 stroke-[1.5] text-brand" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <NewsletterForm source={source} variant="band" />
          </div>
        </div>

        <div className="flex items-center justify-center lg:col-span-5">
          <div className="flex w-full max-w-sm items-center justify-center sm:max-w-md lg:max-w-none">
            <Image
              src="/images/newsletter-guide-editorial.webp"
              alt="50+ Essential Excel Formulas Free PDF Guide and Spreadsheet Cheat Sheet"
              width={854}
              height={685}
              priority
              className="h-auto max-h-72 w-full object-contain sm:max-h-80"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
