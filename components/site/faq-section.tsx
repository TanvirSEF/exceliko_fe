"use client"

import { useState } from "react"
import Link from "next/link"
import {
  IconArrowRight,
  IconChevronDown,
  IconMessageQuestion,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

const FAQS = [
  {
    question: "Are all the formulas, tutorials, and calculators completely free?",
    answer:
      "Yes! Every tutorial, formula breakdown, and interactive browser-based calculator on Exceliko is 100% free to access, copy, and use for both personal and commercial work. There are no subscriptions, paywalls, or hidden fees.",
  },
  {
    question: "Do your articles work on both Microsoft Excel and Google Sheets?",
    answer:
      "Every tutorial clearly indicates cross-platform compatibility across Microsoft Excel (Excel 365, 2021, 2019) and Google Sheets. Whenever formulas differ (such as XLOOKUP vs VLOOKUP or Google Sheets QUERY and ARRAYFORMULA), we provide dedicated syntax for both platforms.",
  },
  {
    question: "How does the Custom Spreadsheet & Consulting service work?",
    answer:
      "If you have a broken workbook, need an executive financial model, or require custom VBA/Apps Script automation, simply submit your project via our Services or Contact page. We review your requirements, provide transparent upfront pricing, and deliver a production-ready, documented solution.",
  },
  {
    question: "Do I need coding or VBA knowledge to use the downloadable templates?",
    answer:
      "No coding knowledge is required. All standard financial models and business trackers use native spreadsheet formulas with intuitive data input sheets and full instructions. For specialized automation tools that use VBA macros, we include one-click buttons and comprehensive setup guides.",
  },
  {
    question: "How frequently is new content published on Exceliko?",
    answer:
      "We publish multiple comprehensive guides, practical formula walkthroughs, and downloadable templates every week, constantly updating our library to reflect the newest Excel 365 and Google Sheets features.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20" aria-labelledby="faq-heading">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
        {/* ── Left Column: Section Intro & Contact Help Card (5 cols) ── */}
        <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-28">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-3 py-0.5 text-xs font-semibold text-brand">
              <span className="size-1.5 rounded-full bg-brand" />
              <span>Got Questions?</span>
            </div>

            <h2
              id="faq-heading"
              className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-balance"
            >
              Frequently Asked <span className="text-brand">Questions</span>
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Quick, clear answers to common questions about our free tutorials, formula compatibility,
              and custom spreadsheet services.
            </p>
          </div>

          {/* Dedicated Support Card */}
          <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-brand/5 p-5 sm:p-6 shadow-xs dark:bg-card">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand">
                <IconMessageQuestion className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Still have questions?</h3>
                <span className="text-xs text-muted-foreground">We are here to help</span>
              </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Can’t find the answer you’re looking for? Reach out directly to our spreadsheet specialists for personalized guidance.
            </p>

            <div className="mt-4 pt-3 border-t border-border/60">
              <Button asChild size="sm" className="w-full rounded-xl font-semibold h-10">
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  <span>Contact our team</span>
                  <IconArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Right Column: Interactive Accordions (7 cols) ── */}
        <div className="space-y-3.5 lg:col-span-7">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-brand/60 bg-gradient-to-br from-card via-card to-brand/5 shadow-xs"
                    : "border-border/80 bg-card hover:border-brand/40 shadow-2xs dark:bg-card"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span
                    className={`text-base sm:text-lg font-bold leading-snug tracking-tight transition-colors ${
                      isOpen ? "text-brand" : "text-foreground"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 border-brand/30 bg-brand/15 text-brand shadow-xs"
                        : "border-border/60 bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <IconChevronDown className="size-4 stroke-[2.5]" />
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                      <div className="border-t border-border/50 pt-3.5">
                        <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}