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
    hours: "12+ HOURS",
    icon: IconSchool,
    features: [
      "FREE to access (no sign-up needed)",
      "26 in-depth practical lessons",
      "Includes all example file downloads",
    ],
    href: "/excel-formulas/",
  },
  {
    id: "dashboard-reporting",
    title: "Excel Dashboard Training",
    hours: "14+ HOURS",
    icon: IconChartBar,
    features: [
      "FREE to access (no sign-up needed)",
      "21 executive reporting lessons",
      "Includes all example file downloads",
    ],
    href: "/excel-charts-dashboards/",
  },
  {
    id: "vba-automation",
    title: "Excel VBA Training",
    hours: "10+ HOURS",
    icon: IconCode,
    features: [
      "FREE to access (no sign-up needed)",
      "36 hands-on automation lessons",
      "Includes all example file downloads",
    ],
    href: "/excel-vba-macros/",
  },
  {
    id: "power-query",
    title: "Excel Power Query Training",
    hours: "8+ HOURS",
    icon: IconRefresh,
    features: [
      "FREE to access (no sign-up needed)",
      "18 pipeline & data cleaning lessons",
      "Includes all example file downloads",
    ],
    href: "/excel-data-analysis/",
  },
]

export function FreeTrainingSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20" aria-labelledby="free-training-title">
      {/* ── Section Header (Centered, Reference Match) ── */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs sm:text-sm font-bold tracking-widest text-brand uppercase">
          Free Excel Training
        </p>

        <h2
          id="free-training-title"
          className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-balance"
        >
          Four full courses. Zero cost.
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base max-w-2xl mx-auto">
          Pick a course and start learning today. No sign-up needed, and every lesson comes
          with example files you can download.
        </p>
      </div>

      {/* ── Unified 4-Column Course Container (Single Box with Dividers) ── */}
      <div className="mt-8 sm:mt-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-card shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((course, idx) => {
            const Icon = course.icon
            return (
              <Link
                key={course.id}
                href={course.href}
                className={cn(
                  "group flex flex-col justify-between p-6 sm:p-7 lg:p-8 transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  // Mobile (1 col): divider below all except last
                  idx < COURSES.length - 1 && "border-b md:border-b-0",
                  // Tablet (2 cols): right border on odd items (col 1), bottom border on row 1
                  idx % 2 === 0 && "md:border-r lg:border-r-0",
                  idx < 2 && "md:border-b lg:border-b-0",
                  // Desktop (4 cols): right border on all except last
                  idx < COURSES.length - 1 && "lg:border-r lg:border-b-0",
                  "border-border/70"
                )}
              >
                <div>
                  {/* Top Row: Clean inline icon + Hours text (no heavy pill/background) */}
                  <div className="flex items-center gap-2 text-brand font-bold text-xs sm:text-sm tracking-wider uppercase">
                    <Icon className="size-4.5 sm:size-5 stroke-[2.2]" />
                    <span>{course.hours}</span>
                  </div>

                  {/* Course Title */}
                  <h3 className="mt-4 text-base sm:text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-brand leading-snug">
                    {course.title}
                  </h3>

                  {/* Features Checklist */}
                  <ul className="mt-4 sm:mt-5 space-y-2.5 text-xs sm:text-[13px] font-medium text-foreground/80">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <IconCheck className="size-4 shrink-0 text-brand stroke-[2.5] mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Link */}
                <div className="mt-6 sm:mt-8 pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand transition-colors group-hover:text-brand/80">
                    <span>Start learning</span>
                    <IconArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
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
