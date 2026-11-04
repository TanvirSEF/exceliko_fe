"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconChevronDown,
  IconCode,
  IconChartHistogram,
  IconReportMoney,
  IconScale,
  IconBook2,
  IconLayoutGrid,
  IconFileSpreadsheet,
  IconUserCheck,
  IconArrowRight,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { shortNavName } from "@/lib/nav-groups"
import type { NavGroup } from "@/types/api"

const LEARNING_TRACK_GROUP_SLUG = "google-sheets"

const MENU_LAYOUT: Record<number, { width: string; columns: string }> = {
  1: { width: "w-[340px]", columns: "grid-cols-1" },
  2: { width: "w-[min(700px,calc(100vw-2rem))]", columns: "grid-cols-2" },
  3: { width: "w-[min(940px,calc(100vw-2rem))]", columns: "grid-cols-3" },
}

interface MainNavProps {
  groups?: NavGroup[]
}

function GroupHeading({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const content = (
    <>
      {group.icon_url ? (
        <Image src={group.icon_url} alt="" width={36} height={36} className="h-9 w-9 shrink-0 rounded-xl" />
      ) : (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-brand/5 text-brand ring-1 ring-brand/20">
          <IconLayoutGrid className="h-4.5 w-4.5" />
        </div>
      )}
      <div className="min-w-0">
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-brand">
          {group.name}
        </h3>
        {group.description && (
          <p className="line-clamp-2 text-xs text-muted-foreground">{group.description}</p>
        )}
      </div>
    </>
  )
  const className = "flex items-center gap-2.5 pb-2.5 border-b border-border/60"

  if (!group.slug) return <div className={className}>{content}</div>

  return (
    <Link prefetch={false} href={`/${group.slug}/`} onClick={onNavigate} className={className}>
      {content}
    </Link>
  )
}

export function MainNav({ groups = [] }: MainNavProps) {
  const pathname = usePathname()

  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveMenu(menu)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 150)
  }

  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setActiveMenu(null)
  }

  const menuLayout = MENU_LAYOUT[Math.min(Math.max(groups.length, 1), 3)]

  const isBlogActive =
    pathname.startsWith("/blog") ||
    pathname.startsWith("/category") ||
    pathname.startsWith("/google-sheets")
  const isPricingActive =
    pathname.startsWith("/spreadsheet-solutions") ||
    pathname.startsWith("/custom-templates") ||
    pathname.startsWith("/custom-tools") ||
    pathname.startsWith("/pricing")
  const isCalculatorActive = pathname.startsWith("/calculator")

  return (
    <nav className="hidden lg:flex items-center gap-1 xl:gap-2.5 text-[0.9375rem] xl:text-[0.96875rem] font-medium" aria-label="Main Navigation">
      {/* About Us */}
      <Link
        prefetch={false}
        href="/about"
        className={cn(
          "rounded-lg px-3.5 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50",
          pathname === "/about" && "text-foreground font-semibold bg-muted/40"
        )}
      >
        About Us
      </Link>

      {/* Pricing Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter("pricing")}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={() => setActiveMenu(activeMenu === "pricing" ? null : "pricing")}
          className={cn(
            "group flex items-center gap-1 rounded-lg px-3.5 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 outline-none cursor-pointer",
            (isPricingActive || activeMenu === "pricing") && "text-foreground font-semibold bg-muted/40"
          )}
          aria-expanded={activeMenu === "pricing"}
        >
          <span>Pricing</span>
          <IconChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200 opacity-70",
              activeMenu === "pricing" && "rotate-180"
            )}
          />
        </button>

        <div
          className={cn(
            "absolute top-full left-0 pt-1.5 z-50",
            activeMenu === "pricing"
              ? "animate-in fade-in-0 zoom-in-95 duration-150"
              : "invisible opacity-0 pointer-events-none"
          )}
          aria-hidden={activeMenu !== "pricing"}
          onMouseEnter={() => handleMouseEnter("pricing")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-72 p-2 rounded-xl shadow-xl border border-border/70 backdrop-blur-md bg-background/95">
            <Link
              prefetch={false}
              href="/spreadsheet-solutions/"
              onClick={() => setActiveMenu(null)}
              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/60 transition-colors"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <IconUserCheck className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-foreground">Services & Solutions</p>
                <p className="text-xs text-muted-foreground">Expert help plans from $19 — Basic, Premium & Advanced</p>
              </div>
            </Link>

            <Link
              prefetch={false}
              href="/custom-templates/"
              onClick={() => setActiveMenu(null)}
              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/60 transition-colors"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <IconFileSpreadsheet className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-foreground">Custom Templates</p>
                <p className="text-xs text-muted-foreground">Bespoke templates from $25 — Excel or Google Sheets</p>
              </div>
            </Link>

            <Link
              prefetch={false}
              href="/custom-tools/"
              onClick={() => setActiveMenu(null)}
              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/60 transition-colors"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <IconCode className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-foreground">Custom Spreadsheet Tools</p>
                <p className="text-xs text-muted-foreground">Custom tools & Workspace add-ons from $500</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Spreadsheet Blogs Mega Menu */}
      <div
        className=""
        onMouseEnter={() => handleMouseEnter("blogs")}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={() => setActiveMenu(activeMenu === "blogs" ? null : "blogs")}
          className={cn(
            "group flex items-center gap-1 rounded-lg px-3.5 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 outline-none cursor-pointer",
            (isBlogActive || activeMenu === "blogs") && "text-foreground font-semibold bg-muted/40"
          )}
          aria-expanded={activeMenu === "blogs"}
        >
          <span>Spreadsheet Blogs</span>
          <IconChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200 opacity-70",
              activeMenu === "blogs" && "rotate-180"
            )}
          />
        </button>

        <div
          className={cn(
            "absolute inset-x-0 top-full mx-auto w-fit pt-1.5 z-50",
            activeMenu === "blogs"
              ? "animate-in fade-in-0 zoom-in-95 duration-150"
              : "invisible opacity-0 pointer-events-none"
          )}
          aria-hidden={activeMenu !== "blogs"}
          onMouseEnter={() => handleMouseEnter("blogs")}
          onMouseLeave={handleMouseLeave}
        >
          <div className={cn("max-h-[calc(100vh-6.5rem)] overflow-y-auto overscroll-contain rounded-2xl shadow-2xl border border-border/70 backdrop-blur-xl bg-background/98 p-4 sm:p-5", menuLayout.width)}>
            {groups.length > 0 ? (
              <div className={cn("grid gap-5", menuLayout.columns)}>
                {groups.map((group) => (
                  <div key={group.slug ?? group.name} className="space-y-2">
                    <GroupHeading group={group} onNavigate={() => setActiveMenu(null)} />

                    {group.slug === LEARNING_TRACK_GROUP_SLUG && (
                      <Link
                        prefetch={false}
                        href="/google-sheets"
                        onClick={() => setActiveMenu(null)}
                        className="flex items-center justify-between gap-2 rounded-lg border border-brand/30 bg-brand/10 p-2 transition-colors hover:bg-brand/20"
                      >
                        <span className="text-[13px] font-bold text-brand">
                          Learning Track — step-by-step course
                        </span>
                        <IconArrowRight className="h-3.5 w-3.5 shrink-0 text-brand" />
                      </Link>
                    )}

                    <div className="space-y-0.5">
                      {group.items.map((item) => (
                        <Link
                          prefetch={false}
                          key={item.slug}
                          href={`/${item.slug}/`}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-start gap-2.5 px-2 py-1.5 rounded-lg hover:bg-muted/60 transition-colors group"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted/70 text-muted-foreground ring-1 ring-border/60 group-hover:bg-brand/15 group-hover:text-brand group-hover:ring-brand/30 transition-colors mt-0.5">
                            {item.icon_url ? (
                              <Image src={item.icon_url} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                            ) : (
                              <IconFileSpreadsheet className="h-3.5 w-3.5" />
                            )}
                          </div>
                          <div className="min-w-0 space-y-0.5">
                            <p className="text-sm font-semibold leading-snug text-foreground group-hover:text-brand transition-colors">
                              {shortNavName(item.name, group.name)}
                            </p>
                            {item.description && (
                              <p className="line-clamp-1 text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                Categories are on the way.
              </p>
            )}

            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-3">
              <p className="text-[13px] text-muted-foreground flex items-center gap-1.5">
                <IconBook2 className="h-3.5 w-3.5 text-primary" />
                <span>Looking for more? Explore all spreadsheet articles.</span>
              </p>
              <Link
                prefetch={false}
                href="/category"
                onClick={() => setActiveMenu(null)}
                className="inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-primary hover:text-primary/80 transition-colors px-2.5 py-1 rounded-md hover:bg-primary/10"
              >
                <span>Browse All Categories</span>
                <IconArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Calculators Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter("calculators")}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={() => setActiveMenu(activeMenu === "calculators" ? null : "calculators")}
          className={cn(
            "group flex items-center gap-1 rounded-lg px-3.5 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 outline-none cursor-pointer",
            (isCalculatorActive || activeMenu === "calculators") && "text-foreground font-semibold bg-muted/40"
          )}
          aria-expanded={activeMenu === "calculators"}
        >
          <span>Calculators</span>
          <IconChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200 opacity-70",
              activeMenu === "calculators" && "rotate-180"
            )}
          />
        </button>

        <div
          className={cn(
            "absolute top-full left-0 pt-1.5 z-50",
            activeMenu === "calculators"
              ? "animate-in fade-in-0 zoom-in-95 duration-150"
              : "invisible opacity-0 pointer-events-none"
          )}
          aria-hidden={activeMenu !== "calculators"}
          onMouseEnter={() => handleMouseEnter("calculators")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-72 p-2 rounded-xl shadow-xl border border-border/70 backdrop-blur-md bg-background/95">
            <Link
              prefetch={false}
              href="/calculator/statistics/"
              onClick={() => setActiveMenu(null)}
              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/60 transition-colors"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <IconChartHistogram className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-foreground">Statistics</p>
                <p className="text-xs text-muted-foreground">Mean, median, deviation & probability tools</p>
              </div>
            </Link>

            <Link
              prefetch={false}
              href="/calculator/finance/"
              onClick={() => setActiveMenu(null)}
              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/60 transition-colors"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <IconReportMoney className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-foreground">Finance</p>
                <p className="text-xs text-muted-foreground">Loans, interest, investments & valuation</p>
              </div>
            </Link>

            <Link
              prefetch={false}
              href="/calculator/accounting/"
              onClick={() => setActiveMenu(null)}
              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/60 transition-colors"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <IconScale className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-foreground">Accounting</p>
                <p className="text-xs text-muted-foreground">Margin, markup, depreciation & tax</p>
              </div>
            </Link>

            <div className="my-1.5 h-px bg-border/60" />

            <Link
              prefetch={false}
              href="/calculator/"
              onClick={() => setActiveMenu(null)}
              className="flex items-center justify-between p-2 rounded-lg text-xs font-medium text-primary hover:text-primary hover:bg-muted/40 transition-colors"
            >
              <span>View All Calculators</span>
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>


{/* Contact Us */}
      <Link
        prefetch={false}
        href="/contact"
        className={cn(
          "rounded-lg px-3.5 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50",
          pathname === "/contact" && "text-foreground font-semibold bg-muted/40"
        )}
      >
        Contact Us
      </Link>
    </nav>
  )
}
