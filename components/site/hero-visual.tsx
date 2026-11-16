import {
  IconCalculator,
  IconCheck,
  IconFileSpreadsheet,
  IconTrendingUp,
} from "@tabler/icons-react"

const ROWS = [
  {
    id: 1,
    name: "Enterprise Trackers",
    target: "$120,000",
    actual: "$154,200",
    growth: "+28.5%",
    status: "Exceeded",
    statusColor: "text-brand-light bg-brand/15 border-brand/30",
  },
  {
    id: 2,
    name: "Financial Modeling",
    target: "$85,000",
    actual: "$112,800",
    growth: "+32.7%",
    status: "Optimized",
    statusColor: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
    active: true,
  },
  {
    id: 3,
    name: "Custom Templates",
    target: "$45,000",
    actual: "$58,400",
    growth: "+29.7%",
    status: "Verified",
    statusColor: "text-sky-400 bg-sky-500/15 border-sky-500/30",
  },
  {
    id: 4,
    name: "Automated Workflows",
    target: "$65,000",
    actual: "$82,100",
    growth: "+26.3%",
    status: "Exceeded",
    statusColor: "text-brand-light bg-brand/15 border-brand/30",
  },
]

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      {/* Ambient Lighting Behind Workbench */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-brand/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/3 -z-10 h-36 w-64 rounded-full bg-brand-light/15 blur-2xl"
      />

      {/* Floating Top-Right Pill: Real-time Metric */}
      <div className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-2.5 rounded-xl border border-white/20 bg-navy-deep/90 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-transform hover:-translate-y-0.5">
        <div className="flex size-6 items-center justify-center rounded-lg bg-brand/20 text-brand-light">
          <IconTrendingUp className="size-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-white/60">Annual Growth</span>
          <span className="text-xs font-bold text-brand-light">+28.4% Outperformed</span>
        </div>
      </div>

      {/* Floating Bottom-Left Pill: Verification Status */}
      <div className="absolute -bottom-4 -left-2 z-20 hidden sm:flex items-center gap-2 rounded-xl border border-white/20 bg-navy-deep/90 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-transform hover:translate-y-0.5">
        <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <IconCheck className="size-3 stroke-[3]" />
        </div>
        <span className="text-xs text-white/90">Validated Formula Syntax</span>
      </div>

      {/* ── Main Workbench Window ── */}
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-navy-deep/95 shadow-2xl backdrop-blur-xl">
        {/* Window Chrome / Title Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#FF5F56]/90" />
            <span className="size-2.5 rounded-full bg-[#FFBD2E]/90" />
            <span className="size-2.5 rounded-full bg-[#27C93F]/90" />
            <div className="ml-3 flex items-center gap-1.5 rounded-md bg-white/8 px-2 py-0.5 text-[11px] font-medium text-white/80">
              <IconFileSpreadsheet className="size-3.5 text-brand-light" />
              <span>Revenue_Analysis_Model.xlsx</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] text-white/50">
            <span className="inline-block size-1.5 rounded-full bg-brand-light" />
            <span>Live Calculation</span>
          </div>
        </div>

        {/* Formula Bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-navy/60 px-3 py-2 text-xs font-mono">
          <div className="flex h-6 w-9 shrink-0 items-center justify-center rounded border border-white/15 bg-white/5 text-[11px] font-bold text-white/70">
            C3
          </div>
          <span className="text-xs font-bold text-brand-light">fx</span>
          <div className="truncate text-white/90">
            =<span className="font-bold text-brand-light">XLOOKUP</span>
            <span className="text-white/60">(A3, Products, Target)</span>
            <span className="text-amber-300 font-bold"> * </span>
            <span className="text-sky-300 font-bold">1.285</span>
          </div>
        </div>

        {/* Spreadsheet Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            {/* Header row */}
            <thead>
              <tr className="border-b border-white/10 bg-white/4 text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                <th className="w-10 px-3 py-2 text-center border-r border-white/5 font-mono">#</th>
                <th className="px-3 py-2 border-r border-white/5">Portfolio Segment</th>
                <th className="px-3 py-2 border-r border-white/5 text-right font-mono">Target</th>
                <th className="px-3 py-2 border-r border-white/5 text-right font-mono">Actual Margin</th>
                <th className="px-3 py-2 text-center">Status</th>
              </tr>
            </thead>

            {/* Data rows */}
            <tbody className="divide-y divide-white/5 font-mono">
              {ROWS.map((row) => (
                <tr
                  key={row.id}
                  className={`transition-colors ${
                    row.active
                      ? "bg-brand/10 font-medium"
                      : "hover:bg-white/3 text-white/80"
                  }`}
                >
                  <td className="px-3 py-2.5 text-center text-white/40 border-r border-white/5">
                    {row.id}
                  </td>
                  <td className="px-3 py-2.5 font-sans font-medium text-white border-r border-white/5">
                    {row.name}
                  </td>
                  <td className="px-3 py-2.5 text-right text-white/70 border-r border-white/5">
                    {row.target}
                  </td>
                  <td
                    className={`px-3 py-2.5 text-right border-r border-white/5 ${
                      row.active
                        ? "text-brand-light font-bold bg-brand/15 ring-1 ring-inset ring-brand/40"
                        : "text-white"
                    }`}
                  >
                    {row.actual}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span
                      className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold ${row.statusColor}`}
                    >
                      {row.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Excel Status Bar Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-white/3 px-4 py-2 text-[10px] text-white/60 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-white/80">
              <IconCalculator className="size-3 text-brand-light" />
              <span>Ready</span>
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline">Calculated in 0.02s</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Average: $101,875</span>
            <span className="text-white/30">|</span>
            <span className="text-brand-light font-bold">Sum: $407,500</span>
          </div>
        </div>
      </div>
    </div>
  )
}
