import type { Metadata } from "next"
import Image from "next/image"
import { IconClock } from "@tabler/icons-react"

import { Breadcrumb } from "@/components/site/breadcrumb"
import { ContactForm } from "@/components/site/contact-form"
import { firstParam } from "@/lib/utils"

interface ContactPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const revalidate = 86400

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions, custom template requests, or spreadsheet troubleshooting — reach the Exceliko team through the contact form.",
  alternates: { canonical: "/contact/" },
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const query = await searchParams
  const service = firstParam(query.service) ?? null

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <header className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl space-y-2">
          <p className="text-xs font-medium text-brand sm:text-sm">
            Contact &amp; support
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Get in touch
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Have a question or need custom spreadsheet help? Send us a note
            using the contact form below.
          </p>
        </div>

        <div className="shrink-0">
          <Image
            src="/images/contact-handoff.svg"
            alt="Stylized hand passing a structured .xlsx spreadsheet card with an fx formula badge across a grid plane"
            width={360}
            height={180}
            priority
            className="h-auto w-full max-w-[280px] object-contain sm:w-[280px]"
          />
        </div>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-5 lg:gap-8">
        <aside className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-navy-deep p-6 text-white">
            <div className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-brand-light">
                <IconClock className="size-5 stroke-[1.5]" />
              </div>
              <p className="font-mono text-2xl font-semibold tracking-tight tabular-nums">
                24–48 hours
              </p>
              <p className="text-sm leading-relaxed text-white/75">
                We usually respond within 24–48 hours on business days.
              </p>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <ContactForm service={service} />
        </div>
      </div>
    </div>
  )
}
