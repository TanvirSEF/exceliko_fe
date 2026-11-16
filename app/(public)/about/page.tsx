import type { Metadata } from "next"

import { AboutConnect } from "@/components/site/about/about-connect"
import { AboutHero } from "@/components/site/about/about-hero"
import { AboutOfferings } from "@/components/site/about/about-offerings"
import { AboutQuickStart } from "@/components/site/about/about-quick-start"
import { AboutStoryTimeline } from "@/components/site/about/about-story-timeline"
import { AboutTrustTeam } from "@/components/site/about/about-trust-team"
import { config } from "@/lib/config"

export const revalidate = 86400

export const metadata: Metadata = {
  title: "About Us | Exceliko",
  description:
    "Founded by spreadsheet consultant Nehad Ulfat, Exceliko is a comprehensive library of 50+ free calculators, in-depth formula tutorials, and practical templates for Excel & Google Sheets.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About Us | Exceliko",
    description:
      "Meet the team behind Exceliko — practical, in-depth tutorials, 50+ free calculators, and templates for everyday and advanced spreadsheet users.",
    url: "/about/",
    images: ["/og-default.png"],
  },
}

export default function AboutPage() {
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${config.siteUrl}/about/#webpage`,
        url: `${config.siteUrl}/about/`,
        name: "About Us | Exceliko",
        description:
          "Practical spreadsheet tutorials, 50+ free calculators, and automated templates for Microsoft Excel and Google Sheets.",
        publisher: { "@id": `${config.siteUrl}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${config.siteUrl}/#organization`,
        name: "Exceliko",
        url: config.siteUrl,
        logo: `${config.siteUrl}/icon-512.png`,
        founder: {
          "@type": "Person",
          name: "Nehad Ulfat",
          jobTitle: "Founder & Strategist",
          url: `${config.siteUrl}/about/nehad-ulfat/`,
          sameAs: ["https://www.linkedin.com/in/nehad-ulfat-22042017b"],
        },
      },
    ],
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <AboutHero />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <AboutStoryTimeline />
        <AboutOfferings />
        <AboutQuickStart />
        <AboutTrustTeam />
        <AboutConnect />
      </div>
    </>
  )
}
