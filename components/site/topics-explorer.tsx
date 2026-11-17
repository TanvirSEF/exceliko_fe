"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  IconArrowRight,
  IconBrandGoogle,
  IconCheck,
  IconFileSpreadsheet,
  IconFolder,
  IconReportMoney,
  IconTable,
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

function getGroupIcon(groupName: string) {
  const name = groupName.toLowerCase()
  if (name.includes("google") || name.includes("sheets")) return IconBrandGoogle
  if (name.includes("business") || name.includes("finance")) return IconReportMoney
  return IconFileSpreadsheet
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
    initialCategorySlug || items[0]?.slug || ""
  )
  const [selectedGroupSlug, setSelectedGroupSlug] = useState<string>("all")

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

  const handleSelectPlatform = (groupSlug: string) => {
    setSelectedGroupSlug(groupSlug)
    if (groupSlug === "all") return

    const targetGroup = groups.find((g) => (g.slug || g.name) === groupSlug)
    if (targetGroup && targetGroup.items.length > 0) {
      const isCurrentInGroup = targetGroup.items.some((item) => item.slug === activeSlug)
      if (!isCurrentInGroup) {
        handleSelectCategory(targetGroup.items[0].slug)
      }
    }
  }

  const activeCategory = items.find((item) => item.slug === activeSlug) ?? items[0]

  // Filter groups if a specific platform tab is active
  const displayedGroups = useMemo(() => {
    if (selectedGroupSlug === "all") return groups
    return groups.filter((g) => (g.slug || g.name) === selectedGroupSlug)
  }, [groups, selectedGroupSlug])

  // Filter items for mobile chips
  const displayedMobileItems = useMemo(() => {
    if (selectedGroupSlug === "all") return items
    const targetGroup = groups.find((g) => (g.slug || g.name) === selectedGroupSlug)
    return targetGroup ? targetGroup.items : items
  }, [groups, items, selectedGroupSlug])

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
    <section id="topics-explorer" className="py-12 sm:py-16 lg:py-20 scroll-mt-20">
      <SectionHeading
        badge="Topic Directory"
        title="All Topics &amp; Tutorials"
        subtitle="Explore in-depth formula breakdowns, automation scripts, and modeling tutorials organized by topic."
        action={{
          label: `Browse ${activeCategory.name} archive`,
          href: `/${activeCategory.slug}/`,
        }}
        className="mb-6 sm:mb-8"
      />

      {/* ── Platform Segmented Filter Bar (All / Excel / Sheets / Business) ── */}
      <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-border/60 pb-4">
        <button
          type="button"
          onClick={() => handleSelectPlatform("all")}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer",
            selectedGroupSlug === "all"
              ? "bg-brand text-white shadow-xs"
              : "border border-border/80 bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground"
          )}
        >
          <IconTable className="size-3.5" />
          <span>All Platforms</span>
        </button>

        {groups.map((group) => {
          const groupIdentifier = group.slug || group.name
          const isSelected = selectedGroupSlug === groupIdentifier
          const GroupIcon = getGroupIcon(group.name)

          return (
            <button
              key={groupIdentifier}
              type="button"
              onClick={() => handleSelectPlatform(groupIdentifier)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                isSelected
                  ? "bg-brand text-white shadow-xs"
                  : "border border-border/80 bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground"
              )}
            >
              <GroupIcon className="size-3.5" />
              <span>{group.name}</span>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[290px_1fr] lg:gap-8 items-stretch">
        {/* ── Left Column: Topic Navigation ── */}
        <div className="flex flex-col gap-2">
          {/* Mobile Horizontal Sub-Topic Chips (Filtered by Platform) */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none lg:hidden">
            {displayedMobileItems.map((item) => {
              const isActive = item.slug === activeSlug
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => handleSelectCategory(item.slug)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap",
                    isActive
                      ? "bg-brand text-white shadow-xs"
                      : "border border-border/80 bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground"
                  )}
                >
                  {isActive && <IconCheck className="size-3 stroke-[3]" />}
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>

          {/* Desktop Vertical Sidebar (Clean & Authoritative) */}
          <div className="hidden lg:flex flex-col gap-1 rounded-2xl border border-border/80 bg-card p-3 shadow-xs h-full dark:bg-card">
            {displayedGroups.map((group, groupIndex) => {
              const GroupIcon = getGroupIcon(group.name)
              return (
                <div key={group.slug ?? group.name} className="flex flex-col gap-1">
                  {groupIndex > 0 ? <div className="my-2 border-t border-border/60" /> : null}

                  <div className="flex items-center gap-2 px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <GroupIcon className="size-3.5 text-brand" />
                    <span>{group.name}</span>
                  </div>

                  {group.items.map((item) => {
                    const isActive = item.slug === activeSlug
                    return (
                      <button
                        key={item.slug}
                        type="button"
                        onClick={() => handleSelectCategory(item.slug)}
                        className={cn(
                          "group flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 text-left cursor-pointer",
                          isActive
                            ? "bg-brand text-white font-semibold shadow-xs"
                            : "text-foreground/80 hover:bg-muted/70 hover:text-foreground"
                        )}
                      >
                        <span className="truncate">{item.name}</span>

                        <IconArrowRight
                          className={cn(
                            "size-3.5 shrink-0 transition-transform duration-200",
                            isActive
                              ? "text-white translate-x-0.5"
                              : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-muted-foreground"
                          )}
                        />
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Right Column: Selected Topic Content Stream ── */}
        <div className="flex flex-col space-y-5 h-full">
          {/* Active Topic Header Bar */}
          <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-muted/30 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="size-2 rounded-full bg-brand animate-pulse" />
              <span className="text-sm sm:text-base font-bold text-foreground">
                {activeCategory.name}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                ({currentPosts.length} tutorials)
              </span>
            </div>

            <Link
              href={`/${activeCategory.slug}/`}
              prefetch={false}
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand hover:text-brand/80 transition-colors"
            >
              <span>View full archive</span>
              <IconArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Posts Grid / Loading / Empty States */}
          {isPending && currentPosts.length === 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 flex-1 items-stretch">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-3 rounded-2xl border border-border/70 bg-card p-4 h-full"
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
              <div className="flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand mb-3">
                <IconFolder className="size-6" />
              </div>
              <h4 className="text-base font-bold text-foreground">
                No tutorials in {activeCategory.name} yet
              </h4>
              <p className="mt-1 max-w-sm text-xs text-muted-foreground leading-relaxed">
                We are currently authoring fresh step-by-step guides for this topic. Check back soon or browse other active categories.
              </p>
              <Button asChild size="sm" variant="outline" className="mt-5 rounded-full font-semibold">
                <Link href="/blog" prefetch={false}>
                  Browse All Articles
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}