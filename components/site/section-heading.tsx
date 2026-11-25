import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  badge?: string
  action?: {
    label: string
    href: string
  }
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
        className
      )}
    >
      <div className="max-w-2xl space-y-2">
        {badge ? (
          <p className="text-xs font-medium text-brand sm:text-sm">
            {badge}
          </p>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          {...(action.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:border-brand/40 hover:text-brand"
        >
          <span>{action.label}</span>
          <IconArrowRight className="size-4 stroke-[1.5] text-brand" />
        </Link>
      ) : null}
    </div>
  )
}
