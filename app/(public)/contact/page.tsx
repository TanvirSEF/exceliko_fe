import type { Metadata } from "next"
import { IconClock } from "@tabler/icons-react"

import { Breadcrumb } from "@/components/site/breadcrumb"
import { ContactForm } from "@/components/site/contact-form"
import { firstParam } from "@/lib/utils"

interface ContactPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const revalidate = 86400

export const metadata: Metadata = {
  title: "Contact Us | Excel Insider",
  description:
    "Questions, custom template requests, or spreadsheet troubleshooting — reach the Excel Insider team through the contact form.",
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

      <header className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Contact &amp; Support</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Get in Touch
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Have a question or want to get in touch with us? We&apos;d love to
          hear from you! Please use the contact form below.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-5 lg:gap-8">
        <aside className="space-y-5 lg:col-span-2">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-deep via-navy to-navy-soft p-6 text-primary-foreground shadow-lg">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl"
            />
            <div className="relative space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary-foreground/25 bg-primary-foreground/10">
                <IconClock className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold tracking-tight">24–48 hours</p>
              <p className="text-sm leading-relaxed text-primary-foreground/75">
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
