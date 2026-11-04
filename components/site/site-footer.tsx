import Image from "next/image"
import Link from "next/link"
import { IconArrowUpRight } from "@tabler/icons-react"

import { getCategoryTree } from "@/lib/api/categories"
import { buildNavGroups } from "@/lib/nav-groups"

const SERVICES_LINKS = [
  { label: "Services & Solutions", href: "/spreadsheet-solutions/" },
  { label: "Custom Spreadsheet Templates", href: "/custom-templates/" },
  { label: "Custom Spreadsheet Tools", href: "/custom-tools/" },
  { label: "Request a Custom Quote", href: "/contact" },
]

const COMPANY_LINKS = [
  { label: "Contact & Support", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Cookie Policy", href: "/cookie-policy/" },
  { label: "Terms of Service", href: "/terms-and-conditions/" },
]

export async function SiteFooter() {
  const categories = await getCategoryTree(600)
  const exploreLinks = buildNavGroups(categories)
    .flatMap((group) => group.items)
    .slice(0, 5)

  return (
    <footer className="elementor-location-footer relative w-full overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft text-primary-foreground">
      {/* ── Background Geometric Shapes & Ambient Glows ── */}
      
      {/* Top Border Glow Line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />

      {/* Subtle Dot Grid Matrix */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(var(--color-primary-foreground)_1px,transparent_1px)] [background-size:32px_32px]"
      />

      {/* Large Ambient Glow Orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-white/8 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-white/5 blur-2xl"
      />

      {/* Decorative Geometric Floating Elements */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-12 top-20 h-36 w-36 rotate-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xs"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 bottom-24 h-48 w-48 -rotate-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xs"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 -bottom-10 h-32 w-32 rotate-45 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xs"
      />

      {/* Diagonal Shine Layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-8 lg:px-12">
        {/* ── Main 4-Column Grid ── */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          
          {/* Column 1: Brand & Contact (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            <Link
              href="/"
              prefetch={false}
              className="inline-flex items-center transition-transform hover:opacity-90 active:scale-95"
            >
              <Image
                src="/logo-light.png"
                alt="Exceliko"
                width={1086}
                height={362}
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </Link>

            <p className="max-w-sm text-[15px] leading-relaxed text-primary-foreground/85">
              Your go-to authority resource for mastering essential spreadsheet formulas, solving complex workbook challenges, and accessing bespoke business templates.
            </p>

          </div>

          {/* Column 2: Explore Tutorials (2.5 cols) */}
          <div className="space-y-4 lg:col-span-3">
            {exploreLinks.length > 0 ? (
              <>
                <p className="text-[13px] font-bold uppercase tracking-wider text-primary-foreground">
                  Tutorials &amp; Articles
                </p>
                <ul className="space-y-2.5 text-[15px]">
                  {exploreLinks.map((link) => (
                    <li key={link.slug}>
                      <Link
                        href={`/${link.slug}/`}
                        prefetch={false}
                        className="group inline-flex items-center gap-1 text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:translate-x-0.5 duration-200"
                      >
                        <span>{link.name}</span>
                        <IconArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 text-primary-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          {/* Column 3: Custom Services (2.5 cols) */}
          <div className="space-y-4 lg:col-span-2">
            <p className="text-[13px] font-bold uppercase tracking-wider text-primary-foreground">
              Services
            </p>
            <ul className="space-y-2.5 text-[15px]">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="group inline-flex items-center gap-1 text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:translate-x-0.5 duration-200"
                  >
                    <span>{link.label}</span>
                    <IconArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 text-primary-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Policy (2 cols) */}
          <div className="space-y-4 lg:col-span-2">
            <Link
              href="/about"
              prefetch={false}
              className="text-[13px] font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-85 inline-block"
            >
              About Exceliko
            </Link>
            <ul className="space-y-2.5 text-[15px]">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:translate-x-0.5 duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar: Copyright ── */}
        <div className="mt-14 flex flex-col items-center justify-center border-t border-primary-foreground/20 pt-8 text-[13px] sm:text-sm text-primary-foreground/75 text-center">
          <p>
            © {new Date().getFullYear()} <strong className="font-semibold text-primary-foreground">Exceliko</strong>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
