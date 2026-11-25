import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  IconArrowRight,
  IconCircleCheck,
  IconCode,
  IconFileUpload,
  IconListCheck,
  IconRocket,
} from "@tabler/icons-react"

import { CtaBand } from "@/components/site/cta-band"
import { HowItWorks, type HowItWorksStep } from "@/components/site/how-it-works"
import { NewsletterBand } from "@/components/site/newsletter/newsletter-band"
import { PricingPlanCard } from "@/components/site/pricing/pricing-plan-card"
import { SectionHeading } from "@/components/site/section-heading"
import { Button } from "@/components/ui/button"
import { TOOL_PLANS } from "@/lib/pricing"

const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: "01",
    title: "Choose Your Plan",
    description:
      "Select the Professional or Advanced tool plan that best fits your needs.",
    icon: IconListCheck,
  },
  {
    step: "02",
    title: "Submit Your Request",
    description:
      "Share what the tool needs to accomplish — purpose, data inputs, outputs, logic, branding, timeline and integrations.",
    icon: IconFileUpload,
  },
  {
    step: "03",
    title: "We Build the Tool",
    description:
      "Our expert developers create a clean, logical, user-friendly tool tailored to your specs.",
    icon: IconCode,
  },
  {
    step: "04",
    title: "Review & Refine",
    description:
      "You'll receive a draft for review. Provide feedback and request revisions.",
    icon: IconCircleCheck,
  },
  {
    step: "05",
    title: "Finalize & Deliver",
    description:
      "After polishing, we deliver the final tool — ready for use, with support to ensure smooth deployment.",
    icon: IconRocket,
  },
]

export const metadata: Metadata = {
  title: "Custom Spreadsheet Tools & Add-ons",
  description:
    "Custom Excel and Google Sheets tools from $500, and full Google Workspace add-ons or Chrome extensions from $1200 — automation, dashboards, API integrations, delivered with revisions and docs.",
  alternates: { canonical: "/custom-tools/" },
  openGraph: {
    title: "Custom Spreadsheet Tools & Add-ons | Exceliko",
    description:
      "Expertly designed custom spreadsheet tools — delivered on time and on budget. Professional tools from $500, Workspace add-ons from $1200.",
    url: "/custom-tools/",
    images: ["/og-default.png"],
  },
}

export const revalidate = 86400

export default function CustomToolsPage() {
  return (
    <>
      <section className="w-full border-b border-white/10 bg-navy-deep">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-5 lg:col-span-6">
              <p className="text-xs font-medium text-brand-light sm:text-sm">
                Custom tools · Automation · Workspace add-ons
              </p>

              <h1 className="text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl">
                Need a custom spreadsheet tool{" "}
                <span className="text-brand-light">built just for you?</span>
              </h1>

              <p className="max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
                Expertly designed, custom spreadsheet tools — delivered on time and
                on budget.
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
                  <Link href="/spreadsheet-solutions/">Compare all services</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#f8f9fb]">
                <Image
                  src="/images/custom-tools-hero.svg"
                  alt="Raw CSV data table feeding into an automated script and formula engine to output a clean report"
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
            badge="Tool Plans"
            title="Choose the plan that fits your needs"
            subtitle="Pick a tier, tell us what your tool needs to do — and let us do the rest."
          />

          <div className="mx-auto grid max-w-4xl gap-6 pt-3 md:grid-cols-2">
            {TOOL_PLANS.map((plan) => (
              <PricingPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        <HowItWorks
          steps={HOW_IT_WORKS_STEPS}
          subtitle="From first request to deployed tool in five straightforward steps."
        />

        <div className="pt-14 sm:pt-18">
          <CtaBand
            title="Ready to get your custom spreadsheet tool?"
            description="Click the button to submit your request — tell us what you need, and we'll get working on a tailored solution."
            label="Request My Tool"
            service="automation"
          />
        </div>

        <section className="pb-14 pt-2 sm:pb-18">
          <div id="newsletter" className="scroll-mt-20">
            <NewsletterBand source="custom-tools" />
          </div>
        </section>
      </div>
    </>
  )
}
