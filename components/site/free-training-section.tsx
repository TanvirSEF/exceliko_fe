import Image from "next/image"
import Link from "next/link"
import {
  IconArrowRight,
  IconChartBar,
  IconCheck,
  IconCode,
  IconRefresh,
  IconSchool,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"

interface TrainingCourse {
  id: string
  title: string
  hours: string
  icon: typeof IconSchool
  features: string[]
  href: string
}

const COURSES: TrainingCourse[] = [
  {
    id: "basic-to-advanced",
    title: "Excel Basic to Advanced Training",
    hours: "12+ hours",
    icon: IconSchool,
    features: [
      "Free access without sign-up",
      "26 in-depth practical lessons",
      "Includes all example file downloads",
    ],
    href: "/excel-formulas/",
  },
  {
    id: "dashboard-reporting",
    title: "Excel Dashboard Training",
    hours: "14+ hours",
    icon: IconChartBar,
    features: [
      "Free access without sign-up",
      "21 executive reporting lessons",
      "Includes all example file downloads",
    ],
    href: "/excel-charts-dashboards/",
  },
  {
    id: "vba-automation",
    title: "Excel VBA Training",
    hours: "10+ hours",
    icon: IconCode,
    features: [
      "Free access without sign-up",
      "36 hands-on automation lessons",
      "Includes all example file downloads",
    ],
    href: "/excel-vba-macros/",
  },
  {
    id: "power-query",
    title: "Excel Power Query Training",
    hours: "8+ hours",
    icon: IconRefresh,
    features: [
      "Free access without sign-up",
      "18 pipeline & data cleaning lessons",
      "Includes all example file downloads",
    ],
    href: "/excel-data-analysis/",
  },
]

export function FreeTrainingSection() {
  return (
    <section className="py-8 sm:py-10 lg:py-12" aria-labelledby="free-training-title">
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-2.5 text-center lg:col-span-7 lg:text-left">
          <p className="text-xs font-medium text-brand sm:text-sm">
            Free Excel training
          </p>

          <h2
            id="free-training-title"
            className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            Four full courses, zero cost
          </h2>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0">
            Pick a course and start learning today. No sign-up needed, and every lesson comes
            with example files you can download.
          </p>
        </div>

        <div className="flex items-center justify-center lg:col-span-5 lg:justify-end">
          <Image
            src="/images/learning-modules.svg"
            alt="Three stacked isometric spreadsheet planes showing progression from raw data to pivot lookups to executive KPI cards"
            width={560}
            height={360}
            className="h-auto max-h-48 w-auto object-contain sm:max-h-52"
          />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card sm:mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((course, idx) => {
            const Icon = course.icon
            return (
              <Link
                key={course.id}
                href={course.href}
                className={cn(
                  "group flex flex-col justify-between p-6 transition-colors duration-150 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:p-7",
                  idx < COURSES.length - 1 && "border-b md:border-b-0",
                  idx % 2 === 0 && "md:border-r lg:border-r-0",
                  idx < 2 && "md:border-b lg:border-b-0",
                  idx < COURSES.length - 1 && "lg:border-r lg:border-b-0",
                  "border-border/70"
                )}
              >
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs font-medium text-brand tabular-nums">
                    <Icon className="size-4.5 stroke-[1.5]" />
                    <span>{course.hours}</span>
                  </div>

                  <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight text-foreground transition-colors duration-150 group-hover:text-brand sm:text-lg">
                    {course.title}
                  </h3>

                  <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <IconCheck className="mt-0.5 size-4 shrink-0 stroke-[1.5] text-brand" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-150 group-hover:text-brand/80">
                    <span>Start learning</span>
                    <IconArrowRight className="size-4 stroke-[1.5]" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
