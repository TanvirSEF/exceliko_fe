import { ReviewsCarousel, type ReviewItem } from "@/components/site/reviews-carousel"
import { SectionHeading } from "@/components/site/section-heading"

const REVIEWS: ReviewItem[] = [
  {
    id: "anirudh-kansara",
    tag: "Formula Guides",
    rating: 5,
    quote:
      "The XLOOKUP and multi-criteria SUMIFS breakdowns saved me from maintaining fragile nested IF chains in our monthly variance pack. Every syntax example worked straight out of the article.",
    avatar: "/images/avatars/anirudh-kansara.svg",
    name: "Anirudh Kansara",
    role: "FP&A Analyst",
  },
  {
    id: "tara-gallagher",
    tag: "Finance Calculators",
    rating: 5,
    quote:
      "I use the retail margin and cash conversion calculators alongside my bookkeeping sheet before pricing new inventory. Having the underlying Excel formula right next to the result makes it easy to audit.",
    avatar: "/images/avatars/tara-gallagher.svg",
    name: "Tara Gallagher",
    role: "Small Business Owner",
  },
  {
    id: "shivaji-upase",
    tag: "Custom Modeling",
    rating: 5,
    quote:
      "Clean structure without the usual blog filler. The DCF and amortization examples helped me understand how inputs, schedules, and outputs link together cleanly across tabs.",
    avatar: "/images/avatars/shivaji-upase.svg",
    name: "Shivaji Upase",
    role: "Accounting Grad",
  },
  {
    id: "maya-lin",
    tag: "Google Sheets",
    rating: 5,
    quote:
      "Our operations team relies on IMPORTRANGE and QUERY across six regional trackers. The cross-sheet filtering examples cut our weekly reporting prep from two hours to ten minutes.",
    avatar: "/images/avatars/maya-lin.svg",
    name: "Maya Lin",
    role: "Operations Lead",
  },
  {
    id: "david-okafor",
    tag: "Accounting Calculators",
    rating: 5,
    quote:
      "Whenever we onboard a junior accountant, I send them straight to the break-even and payroll calculators. Seeing each step calculated alongside the formula builds real intuition.",
    avatar: "/images/avatars/david-okafor.svg",
    name: "David Okafor",
    role: "Financial Controller",
  },
  {
    id: "hannah-keller",
    tag: "VBA & Automation",
    rating: 5,
    quote:
      "We requested a custom workbook repair for a slow 40-tab inventory forecast. Replacing volatile OFFSET formulas with structured dynamic arrays cut recalculation time down to a second.",
    avatar: "/images/avatars/hannah-keller.svg",
    name: "Hannah Keller",
    role: "Supply Chain Planner",
  },
]

export function ReviewsSection() {
  return (
    <section className="py-8 sm:py-10 lg:py-12" aria-labelledby="reviews-heading">
      <SectionHeading
        badge="Reader feedback"
        title="Trusted by analysts, students, and spreadsheet builders"
        subtitle="Practical feedback from people using our formula guides, calculators, and custom models in daily work."
        className="mb-6 sm:mb-8"
      />

      <ReviewsCarousel reviews={REVIEWS} />
    </section>
  )
}
