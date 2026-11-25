import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  IconArrowRight,
  IconCircleCheck,
  IconFileUpload,
  IconListCheck,
  IconTable,
} from "@tabler/icons-react"

import { CtaBand } from "@/components/site/cta-band"
import { HowItWorks, type HowItWorksStep } from "@/components/site/how-it-works"
import { NewsletterBand } from "@/components/site/newsletter/newsletter-band"
import { PricingPlanCard } from "@/components/site/pricing/pricing-plan-card"
import { SectionHeading } from "@/components/site/section-heading"
import { Button } from "@/components/ui/button"
import { TEMPLATE_PLANS } from "@/lib/pricing"

const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: "01",
    title: "Pick a Plan",
    description: "Choose from Basic, Premium or Advanced.",
    icon: IconListCheck,
  },
  {
    step: "02",
    title: "Submit Your Request",
    description: "Tell us what your spreadsheet needs to do.",
    icon: IconFileUpload,
  },
  {
    step: "03",
    title: "We Build Your Template",
    description: "Clean logic, custom layout, easy to use.",
    icon: IconTable,
  },
  {
    step: "04",
    title: "Review & Finalize",
    description: "Get revisions and approve the final version.",
    icon: IconCircleCheck,
  },
]

export const metadata: Metadata = {
  title: "Custom Spreadsheet Templates",
  description:
    "Custom Excel and Google Sheets templates from $25 — from a single clean worksheet to multi-sheet automated dashboards with Power Query and VBA. Delivered in days, revisions included.",
  alternates: { canonical: "/custom-templates/" },
  openGraph: {
    title: "Custom Spreadsheet Templates | Exceliko",
    description:
      "Excel or Google Sheets templates crafted to meet every requirement — on time and within budget. Plans from $25.",
    url: "/custom-templates/",
    images: ["/og-default.png"],
  },
}

export const revalidate = 86400

export default function CustomTemplatesPage() {
  return (
    <>
      <section className="w-full border-b border-white/10 bg-navy-deep">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-5 lg:col-span-6">
              <p className="text-xs font-medium text-brand-light sm:text-sm">
                Custom templates · Excel &amp; Google Sheets
              </p>

              <h1 className="text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl">
                Need a customized{" "}
                <span className="text-brand-light">spreadsheet template?</span>
              </h1>

              <p className="max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
                Excel or Google Sheets templates crafted to meet every requirement
                — on time and within budget.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-lg bg-white px-5 text-sm font-medium text-navy-deep transition-colors duration-150 hover:bg-white/90"
                >
                  <a href="#plans" className="inline-flex items-center gap-2">
                    <span>Get started</span>
                    <IconArrowRight className="size-4 stroke-[1.5]" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="h-11 rounded-lg border border-white/15 bg-white/5 px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/spreadsheet-solutions/#templates">Browse free templates</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#f8f9fb]">
                <Image
                  src="/images/custom-templates-hero.svg"
                  alt="Modular financial model blueprint showing linked Inputs, Calculations, and Executive Summary tabs"
                  width={560}
                  height={400}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <section id="plans" className="scroll-mt-20 py-14 sm:py-18">
          <SectionHeading
            badge="Template Plans"
            title="Choose the plan that fits your needs"
            subtitle="Pick a tier, tell us what your spreadsheet needs to do — and let us do the rest."
          />

          <div className="grid gap-6 pt-3 md:grid-cols-3">
            {TEMPLATE_PLANS.map((plan) => (
              <PricingPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        <HowItWorks
          steps={HOW_IT_WORKS_STEPS}
          subtitle="From first request to finished template in four straightforward steps."
        />

        <div className="pt-14 sm:pt-18">
          <CtaBand
            title="Ready to get your custom spreadsheet?"
            description="Hit the button to submit your request and we'll review your needs and start working. It's fast, simple, and completely personalized."
            label="Request My Template"
            service="custom-template"
          />
        </div>

        <section className="pb-14 pt-2 sm:pb-18">
          <div id="newsletter" className="scroll-mt-20">
            <NewsletterBand source="custom-templates" />
          </div>
        </section>
      </div>
    </>
  )
}
