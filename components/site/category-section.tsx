import Link from "next/link"
import { IconArrowRight, IconFolder, IconFolders } from "@tabler/icons-react"

import type { CategoryGroup } from "@/lib/nav-groups"

interface CategorySectionProps {
  group: CategoryGroup
}

export function CategorySection({ group }: CategorySectionProps) {
  return (
    <section id={group.id} className="scroll-mt-24 space-y-6 pt-4">
      <div className="relative overflow-hidden rounded-2xl border border-brand/25 bg-gradient-to-br from-brand/8 via-brand/3 to-transparent p-6 sm:p-8 backdrop-blur-sm dark:from-brand/20 dark:via-background dark:to-background">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/15 text-brand shadow-2xs">
            <IconFolders className="h-6 w-6" />
          </div>

          <div className="space-y-1">
            <span className="text-xs sm:text-[13px] font-semibold text-muted-foreground">
              {group.items.length} {group.items.length === 1 ? "Topic" : "Topics"}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {group.slug ? (
                <Link href={`/${group.slug}/`} className="hover:text-brand transition-colors">
                  {group.name}
                </Link>
              ) : (
                group.name
              )}
            </h2>
            {group.description ? (
              <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                {group.description}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((item) => (
          <Link
            key={item.slug}
            href={`/${item.slug}/`}
            className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-card p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/60 hover:bg-brand/[0.02] hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  <IconFolder className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
                </div>

                {item.color_hex ? (
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: item.color_hex }}
                    aria-hidden
                  />
                ) : null}
              </div>

              <div>
                <h3 className="text-base sm:text-[17px] font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
                  {item.name}
                </h3>
                {item.description ? (
                  <p className="mt-1 line-clamp-2 text-[13px] sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                ) : null}
              </div>

              {item.children.length > 0 ? (
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.children.slice(0, 4).map((child) => (
                    <span
                      key={child.id}
                      className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {child.name}
                    </span>
                  ))}
                  {item.children.length > 4 && (
                    <span className="text-xs text-muted-foreground self-center">
                      +{item.children.length - 4} more
                    </span>
                  )}
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-[13px] font-semibold text-brand">
              <span>Explore articles</span>
              <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
