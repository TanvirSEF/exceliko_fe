"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  IconArrowRight,
  IconFolder,
  IconFolderOpen,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/site/post-card"
import { SectionHeading } from "@/components/site/section-heading"
import { Skeleton } from "@/components/ui/skeleton"
import { usePostsByCategory } from "@/lib/queries/posts"
import { cn } from "@/lib/utils"
import type { NavGroup, PostListItem } from "@/types/api"

interface TopicsExplorerProps {
  groups: NavGroup[]
  initialCategorySlug?: string
  initialPosts?: PostListItem[]
}

export function TopicsExplorer(props: TopicsExplorerProps) {
  if (props.groups.every((group) => group.items.length === 0)) return null
  return <TopicsExplorerContent {...props} />
}

function TopicsExplorerContent({
  groups,
  initialCategorySlug,
  initialPosts = [],
}: TopicsExplorerProps) {
  const items = useMemo(() => groups.flatMap((group) => group.items), [groups])

  const [activeSlug, setActiveSlug] = useState<string>(
    initialCategorySlug || items[0].slug
  )

  useEffect(() => {
    const syncTopic = () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const topicFromUrl = params.get("topic")
        const topicFromSession = sessionStorage.getItem("exceliko_active_topic")
        const targetSlug = topicFromUrl || topicFromSession

        if (targetSlug && items.some((item) => item.slug === targetSlug)) {
          setActiveSlug(targetSlug)
        }
      } catch {
        // Ignore in restricted environments
      }
    }

    syncTopic()
    window.addEventListener("popstate", syncTopic)
    window.addEventListener("pageshow", syncTopic)
    return () => {
      window.removeEventListener("popstate", syncTopic)
      window.removeEventListener("pageshow", syncTopic)
    }
  }, [items])

  const handleSelectCategory = (slug: string) => {
    setActiveSlug(slug)
    try {
      sessionStorage.setItem("exceliko_active_topic", slug)
      const url = new URL(window.location.href)
      url.searchParams.set("topic", slug)
      window.history.replaceState(null, "", url.toString())
    } catch {
      // Ignore in restricted environments
    }
  }

  const activeCategory = items.find((item) => item.slug === activeSlug) ?? items[0]

  const { data: postsData, isPending } = usePostsByCategory(
    activeSlug,
    6,
    activeSlug === initialCategorySlug && initialPosts.length > 0
      ? {
          items: initialPosts,
          total: initialPosts.length,
          page: 1,
          page_size: 6,
          total_pages: 1,
        }
      : undefined
  )

  const currentPosts = postsData?.items ?? (activeSlug === initialCategorySlug ? initialPosts : [])

  return (
    <section id="topics-explorer" className="py-14 sm:py-18 scroll-mt-20">
      <SectionHeading
        badge="Topic Directory"
        title="All Topics"
        subtitle="Explore in-depth articles across every category. Select any topic to view the latest tutorials."
        action={{
          label: `Browse ${activeCategory.name} archive`,
          href: `/${activeCategory.slug}/`,
        }}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-10 items-stretch">
        {/* ── Left: Vertical Category Navigation ── */}
        <div className="flex flex-col gap-2 h-full">
          {/* Mobile Horizontal Category Bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none lg:hidden">
            {items.map((item) => {
              const isActive = item.slug === activeSlug
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => handleSelectCategory(item.slug)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all cursor-pointer whitespace-nowrap",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "border border-border/80 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>

          {/* Desktop Vertical Category Sidebar */}
          <div className="hidden lg:flex flex-col gap-1 rounded-2xl border border-primary/50 bg-card p-3 shadow-2xs h-full">
            {groups.map((group, groupIndex) => (
              <div key={group.slug ?? group.name} className="flex flex-col gap-1">
                {groupIndex > 0 ? <div className="my-2 border-t border-border/60" /> : null}
                <p className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground/75">
                  {group.name}
                </p>
                {group.items.map((item) => {
                  const isActive = item.slug === activeSlug
                  const Icon = isActive ? IconFolderOpen : IconFolder
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => handleSelectCategory(item.slug)}
                      className={cn(
                        "group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-[15px] font-medium transition-all duration-200 text-left cursor-pointer",
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "text-foreground/80 hover:bg-muted/70 hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            isActive ? "text-primary-foreground" : "text-primary"
                          )}
                        />
                        <span className="truncate">{item.name}</span>
                      </div>

                      <IconArrowRight
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
                          isActive
                            ? "text-primary-foreground translate-x-0.5"
                            : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-muted-foreground"
                        )}
                      />
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Category Posts Grid ── */}
        <div className="flex flex-col space-y-6 h-full">
          {/* Active Category Header Bar */}
          <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-bold text-foreground">
                {activeCategory.name}
              </span>
              <span className="text-xs text-muted-foreground">
                ({currentPosts.length} articles shown)
              </span>
            </div>

            <Link
              href={`/${activeCategory.slug}/`}
              prefetch={false}
              className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80"
            >
              <span>View full archive</span>
              <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Posts Grid or Loading / Empty States */}
          {isPending && currentPosts.length === 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 flex-1 items-stretch">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-3 rounded-2xl border border-primary/50 bg-card p-3.5 h-full"
                >
                  <Skeleton className="aspect-16/10 w-full rounded-xl" />
                  <Skeleton className="h-4 w-1/3 rounded-sm" />
                  <Skeleton className="h-5 w-3/4 rounded-sm" />
                  <Skeleton className="h-4 w-full rounded-sm" />
                </div>
              ))}
            </div>
          ) : currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 flex-1 items-stretch">
              {currentPosts.map((post) => (
                <PostCard key={post.id} post={post} className="h-full" />
              ))}
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center px-4 bg-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                <IconFolder className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-foreground">
                No articles in {activeCategory.name} yet
              </h4>
              <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                We are currently writing fresh tutorials for this topic. Check back soon or explore other categories.
              </p>
              <Button asChild size="sm" variant="outline" className="mt-5 rounded-full">
                <Link href="/blog" prefetch={false}>Browse All Articles</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
