import Link from "next/link"
import {
  IconArrowRight,
  IconBrandGoogle,
  IconTable,
} from "@tabler/icons-react"

import type { CurriculumModule } from "@/types/api"

interface LearningTrackSectionProps {
  modules: CurriculumModule[]
}

export function LearningTrackSection({ modules }: LearningTrackSectionProps) {
  if (modules.length === 0) return null

  const totalLessons = modules.reduce((sum, module) => sum + module.lesson_count, 0)
  const totalTopics = modules.reduce(
    (sum, module) => sum + module.topics.length,
    0
  )
  const firstLesson = modules[0].topics[0]?.lessons[0]

  const stats = [
    { value: modules.length, label: "Modules" },
    { value: totalTopics, label: "Topics" },
    { value: totalLessons, label: "Lessons" },
    { value: "100%", label: "Free" },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20" aria-labelledby="learning-track-heading">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand">
              <IconBrandGoogle className="size-4 stroke-[1.5]" />
              <span>Google Sheets learning track</span>
            </span>
            <h2
              id="learning-track-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl"
            >
              Master Google Sheets, lesson by lesson
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              A complete structured course — from your first spreadsheet to Apps
              Script automation — with every lesson in the right order.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 tabular-nums">
              {stats.map((stat) => (
                <span key={stat.label} className="text-sm">
                  <span className="font-semibold text-foreground">{stat.value}</span>
                  <span className="ml-1.5 text-muted-foreground">{stat.label}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            {firstLesson ? (
              <Link
                href={`/google-sheets/${firstLesson.slug}`}
                prefetch={false}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-medium text-brand-foreground transition-colors duration-150 hover:bg-brand/90"
              >
                <span>Start learning</span>
                <IconArrowRight className="size-4 stroke-[1.5]" />
              </Link>
            ) : null}
            <Link
              href="/google-sheets"
              prefetch={false}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted/50"
            >
              <span>View full track</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, index) => {
          const topics = module.topics
          return (
            <Link
              key={module.slug}
              href={`/google-sheets#${module.slug}`}
              prefetch={false}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors duration-150 hover:border-brand/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-brand transition-colors duration-150 group-hover:bg-brand group-hover:text-brand-foreground">
                    <IconTable className="size-5 stroke-[1.5]" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    Module {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-4 space-y-1.5">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors duration-150 group-hover:text-brand">
                    {module.name}
                  </h3>
                  <p className="text-sm text-muted-foreground tabular-nums">
                    {topics.length} {topics.length === 1 ? "topic" : "topics"} ·{" "}
                    {module.lesson_count}{" "}
                    {module.lesson_count === 1 ? "lesson" : "lessons"}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-brand">
                <span>Explore module</span>
                <IconArrowRight className="size-4 stroke-[1.5]" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
