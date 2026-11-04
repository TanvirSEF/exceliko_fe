"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  IconMenu2,
  IconChevronDown,
  IconArrowRight,
  IconMathFunction,
  IconCode,
  IconChartHistogram,
  IconReportMoney,
  IconScale,
  IconFileSpreadsheet,
  IconUserCheck,
  IconMail,
  IconInfoCircle,
  IconBook2,
  IconFolders,
} from "@tabler/icons-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { cn } from "@/lib/utils"
import { shortNavName } from "@/lib/nav-groups"
import type { NavGroup } from "@/types/api"

const LEARNING_TRACK_GROUP_SLUG = "google-sheets"

interface MobileNavProps {
  groups?: NavGroup[]
}

export function MobileNav({ groups = [] }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const [blogsExpanded, setBlogsExpanded] = useState(true)
  const [pricingExpanded, setPricingExpanded] = useState(false)
  const [calcExpanded, setCalcExpanded] = useState(false)
  const pathname = usePathname()

  function handleLinkClick() {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex h-9.5 w-9.5 items-center justify-center rounded-lg border border-border/70 bg-muted/30 text-foreground transition-colors hover:bg-muted lg:hidden"
          aria-label="Open mobile navigation"
        >
          <IconMenu2 className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-sm p-0 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6 p-6">
          <SheetHeader className="text-left pb-4 border-b border-border/60">
            <SheetTitle asChild>
              <Link href="/" onClick={handleLinkClick} className="inline-block">
                <Image
                  src="/logo.png"
                  alt="Exceliko"
                  width={2172}
                  height={724}
                  className="h-9 w-auto object-contain dark:hidden"
                />
                <Image
                  src="/logo-light.png"
                  alt="Exceliko"
                  width={1086}
                  height={362}
                  className="hidden h-9 w-auto object-contain dark:block"
                />
              </Link>
            </SheetTitle>
          </SheetHeader>

          <nav className="space-y-1.5" aria-label="Mobile Navigation">
            {/* About Us */}
            <Link
              href="/about"
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                pathname === "/about" && "bg-muted font-semibold text-foreground"
              )}
            >
              <IconInfoCircle className="h-4.5 w-4.5 text-brand" />
              <span>About Us</span>
            </Link>

            {/* Spreadsheet Blogs Accordion */}
            <div className="rounded-xl border border-border/50 bg-muted/20 overflow-hidden">
              <button
                type="button"
                onClick={() => setBlogsExpanded(!blogsExpanded)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-[0.9375rem] font-semibold text-foreground transition-colors hover:bg-muted/40"
              >
                <span className="flex items-center gap-2.5">
                  <IconMathFunction className="h-4.5 w-4.5 text-brand" />
                  <span>Spreadsheet Blogs</span>
                </span>
                <IconChevronDown
                  className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", blogsExpanded && "rotate-180")}
                />
              </button>

              {blogsExpanded && (
                <div className="space-y-3 px-2 pb-3 pt-2 text-sm border-t border-border/40">
                  {groups.map((group, index) => (
                    <div
                      key={group.slug ?? group.name}
                      className={cn("space-y-1", index > 0 && "pt-1.5 border-t border-border/30")}
                    >
                      <p className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-1.5">
                        {group.icon_url ? (
                          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white ring-1 ring-border/70">
                            <Image src={group.icon_url} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                          </span>
                        ) : (
                          <IconFolders className="h-3.5 w-3.5" />
                        )}
                        <span>{group.name}</span>
                      </p>
                      {group.slug === LEARNING_TRACK_GROUP_SLUG && (
                        <Link
                          href="/google-sheets"
                          onClick={handleLinkClick}
                          className="mx-1.5 flex items-center justify-between gap-2 rounded-lg border border-brand/30 bg-brand/10 px-2.5 py-2 text-xs font-bold text-brand"
                        >
                          <span>Learning Track — course</span>
                          <IconArrowRight className="h-3.5 w-3.5 shrink-0" />
                        </Link>
                      )}
                      {group.items.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/${item.slug}/`}
                          onClick={handleLinkClick}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[15px] text-muted-foreground hover:bg-background hover:text-foreground"
                        >
                          <span className="truncate">{shortNavName(item.name, group.name)}</span>
                        </Link>
                      ))}
                    </div>
                  ))}

                  <div className="pt-1.5 border-t border-border/40">
                    <Link
                      href="/category"
                      onClick={handleLinkClick}
                      className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm font-semibold text-brand hover:bg-background"
                    >
                      <span className="flex items-center gap-2">
                        <IconBook2 className="h-3.5 w-3.5 shrink-0" />
                        <span>Browse All Categories</span>
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing Accordion */}
            <div className="rounded-xl border border-border/50 bg-muted/20 overflow-hidden">
              <button
                type="button"
                onClick={() => setPricingExpanded(!pricingExpanded)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-[0.9375rem] font-semibold text-foreground transition-colors hover:bg-muted/40"
              >
                <span className="flex items-center gap-2.5">
                  <IconFileSpreadsheet className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
                  <span>Pricing & Templates</span>
                </span>
                <IconChevronDown
                  className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", pricingExpanded && "rotate-180")}
                />
              </button>

              {pricingExpanded && (
                <div className="space-y-1 px-2 pb-2.5 pt-1 text-sm border-t border-border/40">
                  <Link
                    href="/spreadsheet-solutions/"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground hover:bg-background hover:text-foreground"
                  >
                    <IconUserCheck className="h-3.5 w-3.5 text-blue-500" />
                    <span>Services & Solutions</span>
                  </Link>
                  <Link
                    href="/custom-templates/"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground hover:bg-background hover:text-foreground"
                  >
                    <IconFileSpreadsheet className="h-3.5 w-3.5 text-brand" />
                    <span>Custom Templates</span>
                  </Link>
                  <Link
                    href="/custom-tools/"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground hover:bg-background hover:text-foreground"
                  >
                    <IconCode className="h-3.5 w-3.5 text-amber-500" />
                    <span>Custom Spreadsheet Tools</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Calculators Accordion */}
            <div className="rounded-xl border border-border/50 bg-muted/20 overflow-hidden">
              <button
                type="button"
                onClick={() => setCalcExpanded(!calcExpanded)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-[0.9375rem] font-semibold text-foreground transition-colors hover:bg-muted/40"
              >
                <span className="flex items-center gap-2.5">
                  <IconChartHistogram className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
                  <span>Calculators</span>
                </span>
                <IconChevronDown
                  className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", calcExpanded && "rotate-180")}
                />
              </button>

              {calcExpanded && (
                <div className="space-y-1 px-2 pb-2.5 pt-1 text-sm border-t border-border/40">
                  <Link
                    href="/calculator/statistics/"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground hover:bg-background hover:text-foreground"
                  >
                    <IconChartHistogram className="h-3.5 w-3.5 text-blue-500" />
                    <span>Statistics</span>
                  </Link>
                  <Link
                    href="/calculator/finance/"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground hover:bg-background hover:text-foreground"
                  >
                    <IconReportMoney className="h-3.5 w-3.5 text-brand" />
                    <span>Finance</span>
                  </Link>
                  <Link
                    href="/calculator/accounting/"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground hover:bg-background hover:text-foreground"
                  >
                    <IconScale className="h-3.5 w-3.5 text-amber-500" />
                    <span>Accounting</span>
                  </Link>
                  <div className="my-1 h-px bg-border/40" />
                  <Link
                    href="/calculator/"
                    onClick={handleLinkClick}
                    className="flex items-center justify-between rounded-lg px-2.5 py-2 text-primary font-medium hover:bg-background"
                  >
                    <span>View All Calculators</span>
                    <IconArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Contact Us */}
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                pathname === "/contact" && "bg-muted font-semibold text-foreground"
              )}
            >
              <IconMail className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
              <span>Contact Us</span>
            </Link>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border/60 bg-muted/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Switch Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
