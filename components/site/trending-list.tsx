import Image from "next/image"
import Link from "next/link"
import { IconClock, IconFileSpreadsheet } from "@tabler/icons-react"

import { Time } from "@/components/shared/time"
import { toCdnUrl } from "@/lib/blocks"
import { cn } from "@/lib/utils"
import type { PostListItem } from "@/types/api"

import { postHref } from "./post-card"
import { SectionHeading } from "./section-heading"

interface TrendingSectionProps {
  posts: PostListItem[]
  className?: string
}

export function TrendingSection({ posts, className }: TrendingSectionProps) {
  if (posts.length === 0) return null

  const leftColumnPosts = posts.slice(0, 5)
  const rightColumnPosts = posts.slice(5, 10)

  return (
    <section className={cn("py-12 sm:py-16 lg:py-20", className)} aria-labelledby="trending-heading">
      <SectionHeading
        title="Trending spreadsheet tutorials"
        subtitle="Top formula breakdowns, practical tutorials, and spreadsheet guides most read this week."
        badge="Popular this week"
        action={{ label: "View all tutorials", href: "/blog" }}
        className="mb-8 sm:mb-10"
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="space-y-4">
          {leftColumnPosts.map((post, index) => (
            <TrendingCard key={post.slug} post={post} rank={index + 1} />
          ))}
        </div>

        <div className="space-y-4">
          {rightColumnPosts.map((post, index) => (
            <TrendingCard key={post.slug} post={post} rank={index + 6} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TrendingCard({ post, rank }: { post: PostListItem; rank: number }) {
  const rankStr = String(rank).padStart(2, "0")

  return (
    <article className="group rounded-2xl border border-border bg-card p-4 transition-colors duration-150 hover:border-brand/40 sm:p-5">
      <Link
        href={postHref(post)}
        prefetch={false}
        className="flex items-center gap-4 sm:gap-5"
      >
        <span
          aria-hidden
          className="w-8 shrink-0 text-right font-mono text-xl font-semibold tabular-nums text-muted-foreground/60 transition-colors duration-150 group-hover:text-brand sm:text-2xl"
        >
          {rankStr}
        </span>

        <div className="min-w-0 flex-1 space-y-1">
          {post.category ? (
            <span className="inline-block text-xs font-medium text-brand">
              {post.category.name}
            </span>
          ) : null}

          <h3 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight text-foreground transition-colors duration-150 group-hover:text-brand sm:text-base">
            {post.title}
          </h3>

          {post.meta_description || post.excerpt ? (
            <p className="line-clamp-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {post.meta_description || post.excerpt}
            </p>
          ) : null}

          <div className="flex items-center gap-2 pt-0.5 text-xs text-muted-foreground tabular-nums">
            {post.published_at ? <Time date={post.published_at} variant="date" /> : null}
            {post.reading_time_minutes ? (
              <>
                <span aria-hidden className="text-border">·</span>
                <span className="flex items-center gap-1">
                  <IconClock className="size-3.5 stroke-[1.5] text-muted-foreground" />
                  <span>{post.reading_time_minutes} min read</span>
                </span>
              </>
            ) : null}
          </div>
        </div>

        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-muted sm:h-20 sm:w-28">
          {post.featured_image_url ? (
            <Image
              src={toCdnUrl(encodeURI(decodeURI(post.featured_image_url)))}
              alt={post.title}
              fill
              sizes="112px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/60 text-center">
              <IconFileSpreadsheet className="size-5 stroke-[1.5] text-muted-foreground" />
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
