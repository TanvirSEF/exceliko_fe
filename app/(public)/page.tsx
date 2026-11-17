import type { Metadata } from "next"

import { QueryProvider } from "@/components/query-provider"
import { HomeHero } from "@/components/site/home-hero"
import { FreeTrainingSection } from "@/components/site/free-training-section"
import { LearningTrackSection } from "@/components/site/learning-track-section"
import { TrendingSection } from "@/components/site/trending-list"
import { ServicesSection } from "@/components/site/services-section"
import { TopicsExplorer } from "@/components/site/topics-explorer"
import { FaqSection } from "@/components/site/faq-section"
import { CalculatorsSection } from "@/components/site/calculators-section"
import { NewsletterBand } from "@/components/site/newsletter/newsletter-band"
import { getCategoryTree } from "@/lib/api/categories"
import { buildNavGroups, withPublishedPosts } from "@/lib/nav-groups"
import { getCurriculum } from "@/lib/api/curriculum"
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo"
import { getPosts } from "@/lib/api/posts"
import type { CurriculumModule, Page, PostListItem } from "@/types/api"

export const revalidate = 3600

export const metadata: Metadata = {
  title: {
    absolute: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    images: ["/og-default.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-default.png"],
  },
}

const emptyPosts: Page<PostListItem> = {
  items: [],
  total: 0,
  page: 1,
  page_size: 10,
  total_pages: 0,
}

export default async function HomePage() {
  const [trending, categories, trackModules] = await Promise.all([
    getPosts({ trending: true, page_size: 10 }, 300).catch(() => emptyPosts),
    getCategoryTree(300),
    getCurriculum(300).catch(() => [] as CurriculumModule[]),
  ])

  const featuredCategories = withPublishedPosts(categories)
    .flatMap((category) => [category, ...category.children])
    .filter((category) => category.is_featured)
  const navGroups = buildNavGroups(categories)

  return (
    <>
      <HomeHero categories={featuredCategories} />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ServicesSection />

        <div className="border-t border-border/60">
          <FreeTrainingSection />
        </div>

        {trackModules.length > 0 ? (
          <div className="border-t border-border/60">
            <LearningTrackSection modules={trackModules} />
          </div>
        ) : null}

        <div className="border-t border-border/60">
          <TrendingSection posts={trending.items} className="py-12 sm:py-16" />
        </div>

        <div className="border-t border-border/60">
          <QueryProvider>
            <TopicsExplorer groups={navGroups} />
          </QueryProvider>
        </div>

        <div className="border-t border-border/60">
          <CalculatorsSection />
        </div>

        <div className="border-t border-border/60">
          <FaqSection />
        </div>

        <div className="pb-16 pt-4">
          <NewsletterBand />
        </div>
      </div>
    </>
  )
}
