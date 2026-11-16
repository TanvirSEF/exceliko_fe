import {
  IconCheck,
  IconFileSpreadsheet,
  IconShieldCheck,
} from "@tabler/icons-react"

import { SectionHeading } from "@/components/site/section-heading"

const TRUST_PILLARS = [
  {
    icon: IconCheck,
    title: "Tested on Live Workbooks",
    description:
      "Every formula syntax, edge case, and calculator algorithm is validated on active versions of Microsoft Excel and Google Sheets before publication.",
  },
  {
    icon: IconFileSpreadsheet,
    title: "Downloadable Practice Files",
    description:
      "We believe in learning by doing. Whenever practical, we include clean sample datasets so you can inspect formulas directly in your own spreadsheet.",
  },
  {
    icon: IconShieldCheck,
    title: "Zero Artificial Fluff",
    description:
      "No robotic, copy-paste content or unverified tips. Our articles are written by practitioners who spend their days building real spreadsheets.",
  },
]

export function AboutTrustTeam() {
  return (
    <section className="border-t border-border/60 py-14 sm:py-20">
      <SectionHeading
        badge="Why Trust Us"
        title="Authentic expertise, verified on actual workbooks"
        subtitle="We build tools and write tutorials for professionals who need reliable, production-ready spreadsheet solutions."
      />

      {/* 3 Trust Pillars */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {TRUST_PILLARS.map((pillar) => {
          const Icon = pillar.icon
          return (
            <div
              key={pillar.title}
              className="rounded-2xl border border-border/70 bg-card p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">
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
