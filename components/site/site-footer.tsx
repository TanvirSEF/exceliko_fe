import Image from "next/image"
import Link from "next/link"
import { IconArrowRight, IconArrowUpRight, IconMail } from "@tabler/icons-react"

import { getCategoryTree } from "@/lib/api/categories"
import { buildNavGroups } from "@/lib/nav-groups"

const CALCULATOR_LINKS = [
  { label: "Financial Calculators", href: "/calculator/finance/" },
  { label: "Accounting Calculators", href: "/calculator/accounting/" },
  { label: "Statistics Calculators", href: "/calculator/statistics/" },
  { label: "All 50+ Free Calculators", href: "/calculator/", highlight: true },
]

const TUTORIAL_LINKS = [
  { label: "Excel Formulas & Functions", href: "/blog/" },
  { label: "Google Sheets Hub", href: "/google-sheets/" },
  { label: "Interactive Calculators", href: "/calculator/" },
  { label: "Browse All Articles", href: "/blog/", highlight: true },
]

const SOLUTIONS_LINKS = [
  { label: "Custom Templates", href: "/custom-templates/" },
  { label: "Custom Spreadsheet Tools", href: "/custom-tools/" },
  { label: "Spreadsheet Engineering", href: "/spreadsheet-solutions/" },
  { label: "Request a Custom Quote", href: "/contact/", highlight: true },
]

const COMPANY_LINKS = [
  { label: "About Exceliko", href: "/about/" },
  { label: "Contact & Support", href: "/contact/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Cookie Policy", href: "/cookie-policy/" },
  { label: "Terms of Service", href: "/terms-and-conditions/" },
]

export async function SiteFooter() {
  let dynamicCategories: Array<{ name: string; slug: string }> = []
  try {
    const categories = await getCategoryTree(600)
    dynamicCategories = buildNavGroups(categories)
      .flatMap((group) => group.items)
      .slice(0, 4)
  } catch {
    // Graceful fallback if backend is offline during build
  }

  return (
    <footer
      aria-label="Site Footer"
      className="w-full border-t border-white/10 bg-navy-deep text-white"
    >
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              prefetch={false}
              className="inline-block transition-opacity duration-150 hover:opacity-90"
            >
              <Image
                src="/logo-light.png"
                alt="Exceliko"
                width={1086}
                height={362}
                className="h-10 w-auto object-contain sm:h-11"
              />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-white/75">
              An independent educational resource dedicated to making advanced spreadsheet formulas,
              interactive calculators, and production-ready templates accessible to everyone.
            </p>

            <div className="pt-1">
              <Link
                href="/contact/"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-white transition-colors duration-150 hover:border-white/30 hover:bg-white/10"
              >
                <IconMail className="size-4 stroke-[1.5] text-brand-light" />
                <span>Need spreadsheet help? Contact us</span>
                <IconArrowRight className="size-3.5 stroke-[1.5] text-white/60" />
              </Link>
            </div>
          </div>

          {/* Column 2: Free Calculators */}
          <div className="space-y-4 lg:col-span-2">
            <p className="text-xs font-medium text-brand-light">
              Free calculators
            </p>
            <ul className="space-y-2.5 text-sm">
              {CALCULATOR_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className={`group inline-flex items-center gap-1 transition-colors duration-150 ${
                      link.highlight
                        ? "font-medium text-brand-light hover:text-white"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <IconArrowUpRight className="size-3.5 stroke-[1.5] opacity-0 transition-opacity duration-150 group-hover:opacity-100 text-brand-light" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Guides & Articles */}
          <div className="space-y-4 lg:col-span-2">
            <p className="text-xs font-medium text-brand-light">
              Guides &amp; articles
            </p>
            <ul className="space-y-2.5 text-sm">
              {(dynamicCategories.length > 0
                ? dynamicCategories.map((c) => ({
                    label: c.name,
                    href: `/${c.slug}/`,
                    highlight: false,
                  }))
                : TUTORIAL_LINKS
              ).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className={`group inline-flex items-center gap-1 transition-colors duration-150 ${
                      link.highlight
                        ? "font-medium text-brand-light hover:text-white"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <IconArrowUpRight className="size-3.5 stroke-[1.5] opacity-0 transition-opacity duration-150 group-hover:opacity-100 text-brand-light" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Solutions */}
          <div className="space-y-4 lg:col-span-2">
            <p className="text-xs font-medium text-brand-light">
              Solutions
            </p>
            <ul className="space-y-2.5 text-sm">
              {SOLUTIONS_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className={`group inline-flex items-center gap-1 transition-colors duration-150 ${
                      link.highlight
                        ? "font-medium text-brand-light hover:text-white"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <IconArrowUpRight className="size-3.5 stroke-[1.5] opacity-0 transition-opacity duration-150 group-hover:opacity-100 text-brand-light" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Company */}
          <div className="space-y-4 lg:col-span-2">
            <p className="text-xs font-medium text-brand-light">
              Company
            </p>
            <ul className="space-y-2.5 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="inline-block text-white/75 transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Trademark & Legal Disclaimers */}
        <div className="mt-12 border-t border-white/10 pt-8 sm:mt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()}{" "}
              <strong className="font-semibold text-white">Exceliko</strong>. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
              <Link href="/privacy-policy/" prefetch={false} className="transition-colors duration-150 hover:text-white">
                Privacy
              </Link>
              <span>·</span>
              <Link href="/terms-and-conditions/" prefetch={false} className="transition-colors duration-150 hover:text-white">
                Terms
              </Link>
              <span>·</span>
              <Link href="/cookie-policy/" prefetch={false} className="transition-colors duration-150 hover:text-white">
                Cookies
              </Link>
              <span>·</span>
              <Link href="/contact/" prefetch={false} className="transition-colors duration-150 hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <p className="mt-4 max-w-4xl text-xs leading-relaxed text-white/50">
            Disclaimer: Microsoft Excel and Google Sheets are registered trademarks of Microsoft
            Corporation and Google LLC respectively. Exceliko is an independent educational publisher
            providing guides, calculators, and templates, and is not affiliated with, endorsed, or
            sponsored by Microsoft Corporation or Google LLC.
          </p>
        </div>
      </div>
    </footer>
  )
}
