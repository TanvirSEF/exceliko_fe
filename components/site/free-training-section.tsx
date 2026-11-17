import Image from "next/image"
import Link from "next/link"
import {
  IconArrowRight,
  IconChartBar,
  IconCheck,
  IconCode,
  IconReportMoney,
  IconSchool,
} from "@tabler/icons-react"

interface TrainingCourse {
  id: string
  title: string
  badge: string
  icon: typeof IconSchool
  features: string[]
  href: string
}

const COURSES: TrainingCourse[] = [
  {
    id: "basic-to-advanced",
    title: "Excel Basic to Advanced Training",
    badge: "7 IN-DEPTH GUIDES",
    icon: IconSchool,
    features: [
      "FREE to access (no sign-up needed)",
      "Master INDEX/MATCH, Dynamic VLOOKUP & SUMIFS",
      "Step-by-step formulas with practical data examples",
    ],
    href: "/excel-formulas/",
  },
  {
    id: "dashboard-reporting",
    title: "Excel Dashboard & Reporting",
    badge: "10 VISUAL GUIDES",
    icon: IconChartBar,
    features: [
      "FREE to access (no sign-up needed)",
      "Stacked columns, line graphs & 3-variable charts",
      "Interactive Pivot Tables with auto-updating data",
    ],
    href: "/excel-charts-dashboards/",
  },
  {
    id: "vba-automation",
    title: "Excel VBA & Macro Automation",
    badge: "8 AUTOMATION GUIDES",
    icon: IconCode,
    features: [
      "FREE to access (no sign-up needed)",
      "One-click automated reports, loops & FindNext",
      "Clean, copy-pasteable VBA scripts with explanations",
    ],
    href: "/excel-vba-macros/",
  },
  {
    id: "finance-accounting",
    title: "Excel for Finance & Accounting",
    badge: "11 FINANCIAL GUIDES",
    icon: IconReportMoney,
    features: [
      "FREE to access (no sign-up needed)",
      "Bank reconciliation, GST, cash flow & aging reports",
      "MACRS & SYD depreciation models with sample tables",
    ],
    href: "/excel-for-finance-accounting/",
  },
]

export function FreeTrainingSection() {
  return (
    <section className="py-10 sm:py-16 lg:py-20" aria-labelledby="free-training-title">
      {/* ── Editorial Header Banner with 2D Vector Illustration ── */}
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-brand/5 p-6 sm:p-8 lg:p-10 shadow-2xs">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Header Text & Value Propositions */}
          <div className="space-y-3.5 sm:space-y-4 lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-3 py-0.5 text-xs font-semibold text-brand">
              <span className="size-1.5 rounded-full bg-brand" />
              <span>FREE EXCEL TRAINING</span>
            </div>

            <h2
              id="free-training-title"
              className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-balance"
            >
              Four full courses. <span className="text-brand">Zero cost.</span>
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Pick a learning track and master Excel step by step. No sign-up required, no hidden fees,
              and every guide comes with verified formulas, clear screenshots, and downloadable examples.
            </p>

            {/* Quick Benefits Strip */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm font-semibold text-foreground/80">
              <span className="flex items-center gap-1.5">
                <IconCheck className="size-4 text-brand stroke-[3]" />
                100% Free Access
              </span>
              <span className="flex items-center gap-1.5">
                <IconCheck className="size-4 text-brand stroke-[3]" />
                Downloadable .XLSX Workbooks
              </span>
              <span className="flex items-center gap-1.5">
                <IconCheck className="size-4 text-brand stroke-[3]" />
                No Account Required
              </span>
            </div>
          </div>

          {/* Clean 2D Editorial Vector Artwork */}
          <div className="relative mx-auto flex w-full max-w-sm sm:max-w-md items-center justify-center lg:col-span-5 lg:max-w-none">
            <Image
              src="/images/courses/courses-editorial.webp"
              alt="Free Excel and Google Sheets courses and training vector illustration"
              width={1376}
              height={768}
              className="w-full h-auto max-h-[220px] sm:max-h-[260px] object-contain drop-shadow-2xs transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* ── 4-Course Real-Data Card Grid ── */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {COURSES.map((course) => {
          const Icon = course.icon
          return (
            <article
              key={course.id}
              className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-xl dark:bg-card"
            >
              <div className="space-y-4">
                {/* Top Row: Icon + Real Content Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand">
                    <Icon className="size-5" />
                  </div>
                  <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand/10 px-2.5 py-0.5 text-[11px] font-bold text-brand">
                    {course.badge}
                  </span>
                </div>

                {/* Course Title with Route Link */}
                <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-brand">
                  <Link href={course.href}>{course.title}</Link>
                </h3>

                {/* Real Content Features Checklist */}
                <ul className="space-y-2 pt-1 text-xs sm:text-sm font-medium text-foreground/80">
                  {course.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <IconCheck className="size-4 shrink-0 text-brand stroke-[2.5] mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link directly routed to the real category */}
              <div className="mt-6 border-t border-border/60 pt-4">
                <Link
                  href={course.href}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand transition-colors hover:text-brand/80"
                >
                  <span>Start learning</span>
                  <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}