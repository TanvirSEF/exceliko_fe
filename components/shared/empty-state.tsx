import type { ReactNode } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed px-6 py-12 text-center",
        className
      )}
    >
      <Image
        src="/images/empty-grid.svg"
        alt=""
        width={260}
        height={140}
        className="mx-auto mb-5 h-auto max-h-[140px] w-auto rounded-xl border border-border/70"
      />
      <p className="font-medium text-foreground">{title}</p>
      {description ? (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
