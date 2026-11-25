"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  IconAlertTriangle,
  IconArrowRight,
  IconBook2,
  IconCalculator,
  IconHome,
  IconSearch,
  IconTool,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GridRow {
  row: number
  cellRef: string
  route: string
  output: string
  isError?: boolean
  note: string
}

const ROWS: GridRow[] = [
  {
    row: 1,
    cellRef: "B1",
    route: "/calculator/finance/",
    output: "200 OK",
    note: "Active hub: 15+ financial & investment calculators.",
  },
  {
    row: 2,
    cellRef: "B2",
    route: "CURRENT_URL",
    output: "#REF!",
    isError: true,
    note: "Reference Error: This route cell doesn't exist or was moved.",
  },
  {
    row: 3,
    cellRef: "B3",
    route: "/blog/",
    output: "200 OK",
    note: "Active hub: Step-by-step Excel & Google Sheets guides.",
  },
]

export function NotFoundWorkbench() {
  const [selectedRow, setSelectedRow] = useState<number>(2)
  const router = useRouter()

  const activeRow = ROWS.find((r) => r.row === selectedRow) ?? ROWS[1]

  function handleOpenSearch() {
    const searchTrigger = document.querySelector<HTMLButtonElement>(
      'button[aria-label="Open search"]'
    )
    if (searchTrigger) {
      searchTrigger.click()
      return
    }
    router.push("/search")
  }

  function handleOpenAI() {
    const aiTrigger = document.querySelector<HTMLButtonElement>(
      'button[aria-label="Open Exceliko AI"]'
    )
    if (aiTrigger) {
      window.dispatchEvent(new CustomEvent("exceliko:open-ai", { detail: { query: "" } }))
      return
    }
    router.push("/contact/")
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center space-y-8">
      {/* Mini Spreadsheet Error Workbench */}
      <div className="w-full overflow-hidden rounded-xl border border-border bg-card text-left">
        {/* Top Formula Bar */}
        <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-4 py-2.5 font-mono text-xs">
          <span className="inline-flex h-6 min-w-9 shrink-0 items-center justify-center rounded border border-border bg-background px-2 font-semibold text-foreground">
            {activeRow.cellRef}
          </span>
          <span className="shrink-0 font-semibold text-brand">fx</span>
          <span className="truncate text-foreground/90">
            =<span className="font-semibold text-brand">XLOOKUP</span>
            <span className="text-muted-foreground">
              (CURRENT_URL, Site_Routes, Page_Content, &quot;#REF!&quot;)
            </span>
          </span>
        </div>

        {/* 3-Row Mini Grid */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left font-mono text-xs tabular-nums">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-muted-foreground">
                <th className="w-10 border-r border-border px-3 py-2 text-center font-medium" />
                <th className="border-r border-border px-3 py-2 font-medium">A · Route</th>
                <th className="px-3 py-2 text-right font-medium">B · Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ROWS.map((item) => {
                const isSelected = item.row === selectedRow
                return (
                  <tr
                    key={item.row}
                    onClick={() => setSelectedRow(item.row)}
                    className={cn(
                      "cursor-pointer transition-colors duration-150",
                      isSelected ? "bg-brand/5" : "hover:bg-muted/30"
                    )}
                  >
                    <td className="border-r border-border px-3 py-2.5 text-center text-muted-foreground">
                      {item.row}
                    </td>
                    <td className="border-r border-border px-3 py-2.5 text-foreground/90">
                      {item.route}
                    </td>
                    <td
                      className={cn(
                        "relative px-3 py-2.5 text-right font-semibold",
                        isSelected && "ring-2 ring-inset ring-brand",
                        item.isError
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          : "text-brand"
                      )}
                    >
                      {item.isError ? (
                        <span
                          aria-hidden
                          className="absolute left-0 top-0 h-0 w-0 border-r-[8px] border-t-[8px] border-r-transparent border-t-amber-500"
                        />
                      ) : null}
                      <span>{item.output}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Cell Diagnostic Note */}
        <div className="flex items-center gap-2 border-t border-border bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
          <IconAlertTriangle className="size-3.5 shrink-0 stroke-[1.5] text-amber-600 dark:text-amber-400" />
          <span>{activeRow.note}</span>
        </div>
      </div>

      {/* Heading & Recovery CTAs */}
      <div className="space-y-3 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Route not found (404)
        </h1>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
          The requested URL returned a #REF! error. Return home, search the library, or jump
          directly to one of our main hubs.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild className="h-10 rounded-lg px-4 text-sm font-medium">
            <Link href="/" className="inline-flex items-center gap-2">
              <IconHome className="size-4 stroke-[1.5]" />
              <span>Return to Home</span>
            </Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleOpenSearch}
            className="h-10 rounded-lg px-4 text-sm font-medium cursor-pointer"
          >
            <IconSearch className="size-4 stroke-[1.5]" />
            <span>Open Search</span>
            <kbd className="ml-1 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
              Ctrl K
            </kbd>
          </Button>
        </div>
      </div>

      {/* Quick Jump Grid */}
      <div className="grid w-full grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-2 sm:divide-y-0">
        <Link
          href="/calculator/finance/"
          className="group flex items-center justify-between gap-3 border-border p-4 text-left transition-colors duration-150 hover:bg-muted/40 sm:border-b sm:border-r"
        >
          <div className="flex items-center gap-3">
            <IconCalculator className="size-4 shrink-0 stroke-[1.5] text-brand" />
            <span className="text-sm font-medium text-foreground transition-colors group-hover:text-brand">
              Financial Calculators
            </span>
          </div>
          <IconArrowRight className="size-4 shrink-0 stroke-[1.5] text-muted-foreground transition-colors group-hover:text-brand" />
        </Link>

        <Link
          href="/blog/"
          className="group flex items-center justify-between gap-3 border-border p-4 text-left transition-colors duration-150 hover:bg-muted/40 sm:border-b"
        >
          <div className="flex items-center gap-3">
            <IconBook2 className="size-4 shrink-0 stroke-[1.5] text-brand" />
            <span className="text-sm font-medium text-foreground transition-colors group-hover:text-brand">
              Excel &amp; Sheets Guides
            </span>
          </div>
          <IconArrowRight className="size-4 shrink-0 stroke-[1.5] text-muted-foreground transition-colors group-hover:text-brand" />
        </Link>

        <Link
          href="/spreadsheet-solutions/"
          className="group flex items-center justify-between gap-3 border-border p-4 text-left transition-colors duration-150 hover:bg-muted/40 sm:border-r"
        >
          <div className="flex items-center gap-3">
            <IconTool className="size-4 shrink-0 stroke-[1.5] text-brand" />
            <span className="text-sm font-medium text-foreground transition-colors group-hover:text-brand">
              Custom Spreadsheet Solutions
            </span>
          </div>
          <IconArrowRight className="size-4 shrink-0 stroke-[1.5] text-muted-foreground transition-colors group-hover:text-brand" />
        </Link>

        <button
          type="button"
          onClick={handleOpenAI}
          className="group flex w-full items-center justify-between gap-3 p-4 text-left transition-colors duration-150 hover:bg-muted/40 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex size-5 shrink-0 items-center justify-center rounded border border-brand/30 bg-brand/10 font-mono text-[10px] font-semibold text-brand">
              fx
            </span>
            <span className="text-sm font-medium text-foreground transition-colors group-hover:text-brand">
              Ask Exceliko AI
            </span>
          </div>
          <IconArrowRight className="size-4 shrink-0 stroke-[1.5] text-muted-foreground transition-colors group-hover:text-brand" />
        </button>
      </div>
    </div>
  )
}
