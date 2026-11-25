import {
  IconCheck,
  IconFileSpreadsheet,
  IconShieldCheck,
} from "@tabler/icons-react"

import { SectionHeading } from "@/components/site/section-heading"

const TRUST_PILLARS = [
  {
    icon: IconCheck,
    title: "Tested on live workbooks",
    description:
      "Every formula syntax, edge case, and calculator algorithm is validated on active versions of Microsoft Excel and Google Sheets before publication.",
  },
  {
    icon: IconFileSpreadsheet,
    title: "Downloadable practice files",
    description:
      "We believe in learning by doing. Whenever practical, we include clean sample datasets so you can inspect formulas directly in your own spreadsheet.",
  },
  {
    icon: IconShieldCheck,
    title: "Zero artificial fluff",
    description:
      "No robotic, copy-paste content or unverified tips. Our articles are written by practitioners who spend their days building real spreadsheets.",
  },
]

export function AboutTrustTeam() {
  return (
    <section className="border-t border-border/60 py-12 sm:py-16 lg:py-20">
      <SectionHeading
        badge="Why trust us"
        title="Authentic expertise, verified on actual workbooks"
        subtitle="We build tools and write tutorials for professionals who need reliable, production-ready spreadsheet solutions."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {TRUST_PILLARS.map((pillar) => {
          const Icon = pillar.icon
          return (
            <div
              key={pillar.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors duration-150 hover:border-brand/40"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-brand">
                <Icon className="size-5 stroke-[1.5]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
