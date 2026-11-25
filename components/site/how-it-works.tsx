import Image from "next/image"
import type { TablerIcon } from "@tabler/icons-react"

import { SectionHeading } from "@/components/site/section-heading"
import { cn } from "@/lib/utils"

export interface HowItWorksStep {
  step: string
  title: string
  description: string
  icon: TablerIcon
  image?: string
}

interface HowItWorksProps {
  steps: HowItWorksStep[]
  badge?: string
  title?: string
  subtitle?: string
}

const DEFAULT_STEP_IMAGES = [
  "/images/how-it-works/step-1-submit.svg",
  "/images/how-it-works/step-2-audit.svg",
  "/images/how-it-works/step-3-delivery.svg",
]

export function HowItWorks({
  steps,
  badge = "Simple process",
  title = "How it works",
  subtitle,
}: HowItWorksProps) {
  return (
    <section className="border-t border-border/60 py-12 sm:py-16 lg:py-20">
      <SectionHeading badge={badge} title={title} subtitle={subtitle} />

      <div
        className={cn(
          "grid gap-6",
          steps.length === 4
            ? "md:grid-cols-2 lg:grid-cols-4"
            : steps.length === 3
              ? "md:grid-cols-3"
              : "sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {steps.map((step, index) => {
          const Icon = step.icon
          const imageSrc = step.image ?? DEFAULT_STEP_IMAGES[index]
          return (
            <div
              key={step.step}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors duration-150 hover:border-brand/40"
            >
              {imageSrc ? (
                <div className="mb-5 overflow-hidden rounded-xl border border-border/70 bg-[#f8f9fb]">
                  <Image
                    src={imageSrc}
                    alt={step.title}
                    width={400}
                    height={220}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ) : null}

              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-brand">
                  <Icon className="size-5 stroke-[1.5]" />
                </div>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  Step {step.step}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
