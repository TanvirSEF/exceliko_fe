import Link from "next/link"
import Image from "next/image"

import { MainNav } from "@/components/site/main-nav"
import { MobileNav } from "@/components/site/mobile-nav"
import { SearchDialog } from "@/components/site/search-dialog"
import { getCategoryTree } from "@/lib/api/categories"
import { getPosts } from "@/lib/api/posts"
import { buildNavGroups } from "@/lib/nav-groups"
import type { NavGroup } from "@/types/api"

export async function SiteHeader() {
  const [categories, trending] = await Promise.all([
    getCategoryTree(600),
    getPosts({ trending: true, page_size: 6 }, 600).catch(() => null),
  ])
  const navGroups: NavGroup[] = buildNavGroups(categories)
  const searchCategories = navGroups.flatMap((group) => group.items).slice(0, 6)
  const trendingTitles = (trending?.items ?? []).map((post) => post.title)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm transition-colors duration-150">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Exceliko Home"
          >
            <Image
              src="/logo.png"
              alt="Exceliko"
              width={2172}
              height={724}
              priority
              className="h-12 w-auto object-contain dark:hidden sm:h-13 md:h-14"
            />
            <Image
              src="/logo-light.png"
              alt="Exceliko"
              width={1086}
              height={362}
              className="hidden h-12 w-auto object-contain dark:block sm:h-13 md:h-14"
            />
          </Link>
        </div>

        <MainNav groups={navGroups} />

        <div className="flex items-center gap-2 sm:gap-3">
          <SearchDialog categories={searchCategories} trendingTitles={trendingTitles} />

          <MobileNav groups={navGroups} />
        </div>
      </div>
    </header>
  )
}
