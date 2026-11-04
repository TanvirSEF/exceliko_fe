import Image from "next/image"
import Link from "next/link"
import { IconArrowRight, IconCheck } from "@tabler/icons-react"

import { SectionHeading } from "@/components/site/section-heading"
import { Button } from "@/components/ui/button"

const SERVICES = [
  {
    id: "consulting",
    title: "Need Help with Spreadsheet Problems?",
    subtitle:
      "Facing tricky formula bugs, sluggish workbooks, or complex logic? Get clear expert diagnostics and rapid turnaround solutions.",
    image: "/images/services/consulting-diagnostics.webp",
    imageAlt:
      "Glowing spreadsheet under a magnifying glass showing a checklist, surrounded by tools and charts",
    badge: "Troubleshooting & Consulting",
    features: [
      "Fix #VALUE!, #N/A & circular errors",
      "Optimize heavy & laggy workbooks",
      "Advanced lookup & dynamic array models",
    ],
    ctaLabel: "Request Solution",
    ctaHref: "/spreadsheet-solutions/",
  },
  {
    id: "templates",
    title: "Custom Templates & Dashboards",
    subtitle:
      "Transform raw data into executive-ready financial models, KPI trackers, and dynamic visual dashboards tailored to your brand.",
    image: "/images/services/templates-dashboard.webp",
    imageAlt:
      "Laptop on a desk showing a spreadsheet dashboard with charts and a data table",
    badge: "Custom Modeling",
    features: [
      "Executive KPI & revenue dashboards",
      "Automated financial & budgeting models",
      "Interactive Pivot Tables & smart slicers",
    ],
    ctaLabel: "Order Custom Template",
    ctaHref: "/custom-templates/",
  },
  {
    id: "automation",
    title: "VBA Macros & Custom Tools",
    subtitle:
      "Eliminate repetitive manual busywork. We engineer reliable VBA macros, Google Apps Scripts, and automated pipelines.",
    image: "/images/services/automation-workflow.webp",
    imageAlt:
      "Spreadsheet connected through a gear to a code window to represent automated workflows",
    badge: "Automation & Scripting",
    features: [
      "One-click VBA macro automations",
      "Multi-sheet data consolidation pipelines",
      "Google Apps Script & API integrations",
    ],
    ctaLabel: "Build Custom Tool",
    ctaHref: "/custom-tools/",
  },
]

export function ServicesSection() {
  return (
    <section className="py-14 sm:py-18">
      <SectionHeading
        badge="Custom Solutions & Consulting"
        title="Professional Excel & Sheets Services"
        subtitle="Need customized help? From diagnosing stubborn formula bugs to building executive dashboards and automated pipelines — get fast, expert spreadsheet solutions."
        action={{ label: "Request a Custom Quote", href: "/spreadsheet-solutions/" }}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <article
            key={service.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {service.badge}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand">
                <Link href={service.ctaHref}>{service.title}</Link>
              </h3>

              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {service.subtitle}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-border/60 pt-5">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm font-medium text-foreground/90"
                  >
                    <span className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <IconCheck className="size-3 stroke-[3]" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <Button
                  asChild
                  className="h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:text-base"
                >
                  <Link href={service.ctaHref}>
                    {service.ctaLabel}
                    <IconArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
