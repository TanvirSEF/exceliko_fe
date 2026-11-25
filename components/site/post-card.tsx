import Image from "next/image"
import Link from "next/link"
import { IconArrowUpRight, IconFileSpreadsheet, IconFlame } from "@tabler/icons-react"

import { Time } from "@/components/shared/time"
import { toCdnUrl } from "@/lib/blocks"
import { cn } from "@/lib/utils"
import type { PostListItem } from "@/types/api"

interface PostCardProps {
  post: PostListItem
  className?: string
  priority?: boolean
}

export function postHref(
  post: Pick<PostListItem, "slug"> & {
    category?: { slug: string } | null
    category_slug?: string | null
    canonical_url?: string | null
  }
) {
  if (post.canonical_url?.startsWith("/google-sheets/")) {
    return `/google-sheets/${post.slug}/`
  }

  let href = post.canonical_url
    ? post.canonical_url.startsWith("/")
      ? post.canonical_url
      : `/${post.canonical_url}`
    : `/blog/${post.slug}`

  if (!href.endsWith("/")) {
    href += "/"
  }
  return href
}

export function PostCard({ post, className, priority = false }: PostCardProps) {
  const imageUrl = post.featured_image_url
    ? toCdnUrl(encodeURI(decodeURI(post.featured_image_url)))
    : null

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors duration-150 hover:border-brand/40",
        className
      )}
    >
      <Link href={postHref(post)} prefetch={false} className="flex h-full flex-col">
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl border border-border/40 bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/60">
              <IconFileSpreadsheet className="size-6 stroke-[1.5] text-muted-foreground" />
            </div>
          )}

          {post.is_trending ? (
            <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md border border-border bg-background/95 px-2 py-1 text-xs font-medium text-foreground">
              <IconFlame className="size-3.5 stroke-[1.5] text-brand" />
              <span>Trending</span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col justify-between pt-4">
          <div className="space-y-2">
            {post.category ? (
              <span className="inline-flex line-clamp-1 text-xs font-medium text-brand">
                {post.category.name}
              </span>
            ) : null}

            <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground transition-colors duration-150 group-hover:text-brand sm:text-lg">
              {post.title}
            </h3>

            {post.meta_description || post.excerpt ? (
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {post.meta_description || post.excerpt}
              </p>
            ) : null}

            {post.published_at ? (
              <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground tabular-nums">
                <Time date={post.published_at} variant="date" />
              </div>
            ) : null}
          </div>

          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <span>Read article</span>
            <IconArrowUpRight className="size-4 stroke-[1.5]" />
          </div>
        </div>
      </Link>
    </article>
  )
}
