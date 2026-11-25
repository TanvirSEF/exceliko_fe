import { IconCalculator, IconFileSpreadsheet } from "@tabler/icons-react"

interface ModelRow {
  row: number
  label: string
  base: string
  forecast: string
  variance: string
  active?: boolean
}

const ROWS: ModelRow[] = [
  {
    row: 2,
    label: "Operating Cash Flow",
    base: "$142,000",
    forecast: "$168,500",
    variance: "+18.7%",
  },
  {
    row: 3,
    label: "Net Present Value (NPV)",
    base: "$410,000",
    forecast: "$486,250",
    variance: "+18.6%",
    active: true,
  },
  {
    row: 4,
    label: "Internal Rate of Return",
    base: "18.4%",
    forecast: "22.1%",
    variance: "+3.7%",
  },
  {
    row: 5,
    label: "Payback Period (Yrs)",
    base: "3.4",
    forecast: "2.8",
    variance: "-17.6%",
  },
]

export function HeroVisual() {
  return (
    <div className="mx-auto w-full max-w-xl lg:max-w-none">
      <div className="overflow-hidden rounded-2xl border border-white/12 bg-navy shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
        {/* Workbook Title Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-navy-deep/80 px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-medium text-white/85">
            <IconFileSpreadsheet className="size-4 shrink-0 stroke-[1.5] text-brand-light" />
            <span className="truncate font-mono">DCF_Valuation_Model.xlsx</span>
          </div>
          <span className="font-mono text-xs text-white/50">Sheet1</span>
        </div>

        {/* Formula Bar */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-navy-deep/40 px-4 py-2 font-mono text-xs">
          <span className="inline-flex h-6 min-w-9 items-center justify-center rounded border border-white/12 bg-white/5 px-2 font-medium text-white/80">
            C3
          </span>
          <span className="font-medium text-brand-light">fx</span>
          <div className="truncate text-white/90">
            <span>=</span>
            <span className="font-medium text-brand-light">NPV</span>
            <span className="text-white/65">($B$1, B2:E2) + </span>
            <span className="font-medium text-brand-light">XLOOKUP</span>
            <span className="text-white/65">(A3, Rates!A:A, Rates!C:C)</span>
          </div>
        </div>

        {/* Desktop Spreadsheet Grid (lg+) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs tabular-nums">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] font-mono text-xs font-medium text-white/50">
                <th className="w-10 border-r border-white/10 px-3 py-2 text-center" />
                <th className="border-r border-white/10 px-3 py-2">A · Line item</th>
                <th className="border-r border-white/10 px-3 py-2 text-right">B · Base</th>
                <th className="border-r border-white/10 px-3 py-2 text-right">C · Forecast</th>
                <th className="px-3 py-2 text-right">D · Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-mono">
              {ROWS.map((item) => (
                <tr
                  key={item.row}
                  className={item.active ? "bg-brand/10" : "bg-transparent"}
                >
                  <td className="border-r border-white/10 px-3 py-3 text-center text-white/40">
                    {item.row}
                  </td>
                  <td className="border-r border-white/10 px-3 py-3 font-sans text-xs font-medium text-white/90">
                    {item.label}
                  </td>
                  <td className="border-r border-white/10 px-3 py-3 text-right text-white/70">
                    {item.base}
                  </td>
                  <td
                    className={
                      item.active
                        ? "border-r border-white/10 bg-brand/15 px-3 py-3 text-right font-medium text-brand-light ring-1 ring-inset ring-brand-light/70"
                        : "border-r border-white/10 px-3 py-3 text-right text-white"
                    }
                  >
                    {item.forecast}
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-brand-light">
                    {item.variance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Compact Cells (< 1024px) */}
        <div className="block lg:hidden space-y-2 p-4 tabular-nums">
          {ROWS.slice(0, 3).map((item) => (
            <div
              key={item.row}
              className={
                item.active
                  ? "flex items-center justify-between rounded-lg border border-brand-light/50 bg-brand/15 px-3 py-2.5"
                  : "flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
              }
            >
              <div>
                <span className="block text-xs font-medium text-white/90">{item.label}</span>
                <span className="font-mono text-xs text-white/55">Base {item.base}</span>
              </div>
              <div className="text-right font-mono">
                <span className="block text-xs font-medium text-white">{item.forecast}</span>
                <span className="text-xs text-brand-light">{item.variance}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between border-t border-white/10 bg-navy-deep/80 px-4 py-2 font-mono text-xs text-white/55 tabular-nums">
          <div className="flex items-center gap-2">
            <IconCalculator className="size-3.5 stroke-[1.5] text-brand-light" />
            <span className="text-white/80">Ready</span>
            <span className="text-white/25">|</span>
            <span>Calc: Automatic</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">IRR: 22.1%</span>
            <span className="font-medium text-brand-light">NPV: $486,250</span>
          </div>
        </div>
      </div>
    </div>
  )
}
