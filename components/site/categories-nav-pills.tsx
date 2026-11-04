"use client"

import { IconFolder, IconLayoutGrid } from "@tabler/icons-react"

interface CategoriesNavPillsProps {
  groups: {
    id: string
    title: string
    count: number
  }[]
}

export function CategoriesNavPills({ groups }: CategoriesNavPillsProps) {
  const totalCount = groups.reduce((acc, group) => acc + group.count, 0)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-4 py-1.5 text-xs sm:text-sm font-semibold text-foreground transition-all hover:bg-muted hover:border-border cursor-pointer shadow-2xs"
      >
        <IconLayoutGrid className="h-4 w-4 text-muted-foreground" />
        <span>All Categories</span>
        <span className="rounded-full bg-background px-2 py-0.5 text-xs font-semibold text-muted-foreground">
          {totalCount}
        </span>
      </button>

      {groups.map((group) => (
        <button
          key={group.id}
          type="button"
          onClick={() => scrollToSection(group.id)}
          className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-brand transition-all cursor-pointer shadow-2xs hover:bg-brand/20 hover:border-brand/50"
        >
          <IconFolder className="h-4 w-4 shrink-0" />
          <span>{group.title}</span>
          <span className="rounded-full bg-brand/20 px-2 py-0.5 text-xs font-semibold text-brand">
            {group.count}
          </span>
        </button>
      ))}
    </div>
  )
}
