"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { IconChevronLeft, IconChevronRight, IconStarFilled } from "@tabler/icons-react"

export interface ReviewItem {
  id: string
  tag: string
  rating: number
  quote: string
  avatar: string
  name: string
  role: string
}

interface ReviewsCarouselProps {
  reviews: ReviewItem[]
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activePage, setActivePage] = useState(0)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 4)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4)

    const maxScroll = Math.max(scrollWidth - clientWidth, 1)
    const ratio = scrollLeft / maxScroll
    setActivePage(ratio > 0.5 ? 1 : 0)
  }, [])

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [checkScroll, reviews])

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const scrollAmount = el.clientWidth * 0.9
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {activePage === 0 ? "01–03" : "04–06"} of {String(reviews.length).padStart(2, "0")}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous reviews"
            className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors duration-150 hover:border-brand/40 hover:text-brand disabled:pointer-events-none disabled:opacity-35 cursor-pointer"
          >
            <IconChevronLeft className="size-4 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next reviews"
            className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors duration-150 hover:border-brand/40 hover:text-brand disabled:pointer-events-none disabled:opacity-35 cursor-pointer"
          >
            <IconChevronRight className="size-4 stroke-[1.5]" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <article
            key={review.id}
            className="flex w-[calc(100%-1rem)] shrink-0 snap-start flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.835rem)]"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-sm border border-border bg-muted/40 px-2 py-0.5 font-mono text-xs font-medium text-foreground/85">
                  {review.tag}
                </span>

                <div
                  className="flex items-center gap-0.5 text-brand"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <IconStarFilled key={idx} className="size-3.5" aria-hidden="true" />
                  ))}
                </div>
              </div>

              <blockquote className="mt-5 text-sm leading-relaxed text-foreground/90">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
            </div>

            <footer className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
              <Image
                src={review.avatar}
                alt={review.name}
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-full border border-border bg-[#f8f9fb] object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {review.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {review.role}
                </p>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </div>
  )
}
