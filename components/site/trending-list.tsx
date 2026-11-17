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

  // Split 10 posts into 2 balanced columns (1-5 and 6-10) for desktop
  const leftColumnPosts = posts.slice(0, 5)
  const rightColumnPosts = posts.slice(5, 10)

  return (
    <section className={cn("py-12 sm:py-16", className)} aria-labelledby="trending-heading">
      <SectionHeading
        title="Trending Spreadsheet Tutorials"
        subtitle="Top formula breakdowns, practical tutorials, and spreadsheet guides most read this week."
        badge="Popular this week"
        action={{ label: "View all tutorials", href: "/blog" }}
        className="mb-8 sm:mb-10"
      />

      {/* ── 2-Column Balanced Ranked Grid (100% Brand Theme) ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Left Column: #01 to #05 */}
        <div className="space-y-3.5">
          {leftColumnPosts.map((post, index) => (
            <TrendingCard key={post.slug} post={post} rank={index + 1} />
          ))}
        </div>

        {/* Right Column: #06 to #10 */}
        <div className="space-y-3.5">
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
    <article className="group relative rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-md dark:bg-card">
      <Link
        href={postHref(post)}
        prefetch={false}
        className="flex items-center gap-4 sm:gap-5"
      >
        {/* Left: Ranked Number */}
        <span
          aria-hidden
          className="w-8 shrink-0 text-right font-mono text-xl sm:text-2xl font-black tabular-nums text-brand/30 transition-colors group-hover:text-brand"
        >
          {rankStr}
        </span>

        {/* Center: Content */}
        <div className="min-w-0 flex-1 space-y-1">
          {post.category ? (
            <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand">
              {post.category.name}
            </span>
          ) : null}

          <h3 className="line-clamp-2 text-sm sm:text-base font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand">
            {post.title}
          </h3>

          {post.meta_description || post.excerpt ? (
            <p className="line-clamp-1 text-xs text-muted-foreground sm:text-[13px] leading-relaxed">
              {post.meta_description || post.excerpt}
            </p>
          ) : null}

          <div className="flex items-center gap-2 pt-0.5 text-[11px] sm:text-xs text-muted-foreground font-medium">
            {post.published_at ? <Time date={post.published_at} variant="date" /> : null}
            {post.reading_time_minutes ? (
              <>
                <span aria-hidden className="text-border">•</span>
                <span className="flex items-center gap-1">
                  <IconClock className="size-3 text-brand" />
                  <span>{post.reading_time_minutes} min read</span>
                </span>
              </>
            ) : null}
          </div>
        </div>

        {/* Right: Thumbnail Container (Ready for real images, clean brand placeholder if null) */}
        <div className="relative h-16 w-20 sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/40 transition-colors group-hover:border-brand/40">
          {post.featured_image_url ? (
            <Image
              src={toCdnUrl(encodeURI(decodeURI(post.featured_image_url)))}
              alt={post.title}
              fill
              sizes="112px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand/10 via-brand/5 to-muted/60 text-center transition-colors group-hover:from-brand/15">
              <IconFileSpreadsheet className="size-5 sm:size-6 text-brand/60" />
              <span className="mt-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-brand/70">
                Exceliko
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}