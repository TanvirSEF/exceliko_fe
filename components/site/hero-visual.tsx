import {
  IconCalculator,
  IconCheck,
  IconFileSpreadsheet,
  IconSparkles,
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
      {/* Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-brand/20 blur-2xl sm:-inset-6 sm:blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-1/4 -z-10 h-32 w-48 rounded-full bg-brand-light/15 blur-2xl"
      />

      {/* Floating Top-Right Pill: Real-time Metric (Desktop only) */}
      <div className="absolute -top-3.5 right-2 z-20 hidden lg:flex items-center gap-2.5 rounded-xl border border-white/20 bg-navy-deep/90 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-transform hover:-translate-y-0.5">
        <div className="flex size-6 items-center justify-center rounded-lg bg-brand/20 text-brand-light">
          <IconTrendingUp className="size-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-white/60">Annual Growth</span>
          <span className="text-xs font-bold text-brand-light">+28.4% Outperformed</span>
        </div>
      </div>

      {/* Floating Bottom-Left Pill: Verification Status (Desktop only) */}
      <div className="absolute -bottom-3.5 left-2 z-20 hidden lg:flex items-center gap-2 rounded-xl border border-white/20 bg-navy-deep/90 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-transform hover:translate-y-0.5">
        <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <IconCheck className="size-3 stroke-[3]" />
        </div>
        <span className="text-xs text-white/90">Validated Formula Syntax</span>
      </div>

      {/* ── Main Window Container ── */}
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-navy-deep/95 shadow-2xl backdrop-blur-xl">
        {/* Window Chrome / Title Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3.5 py-2.5 sm:px-4 sm:py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#FF5F56]/90" />
            <span className="size-2.5 rounded-full bg-[#FFBD2E]/90" />
            <span className="size-2.5 rounded-full bg-[#27C93F]/90" />
            <div className="ml-2 sm:ml-3 flex items-center gap-1.5 rounded-md bg-white/8 px-2 py-0.5 text-[11px] font-medium text-white/85">
              <IconFileSpreadsheet className="size-3.5 text-brand-light" />
              <span className="truncate max-w-[140px] sm:max-w-none">Revenue_Analysis_Model.xlsx</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-white/60">
            <span className="inline-block size-1.5 rounded-full bg-brand-light animate-pulse" />
            <span className="hidden xs:inline">Live Calculation</span>
          </div>
        </div>

        {/* Formula Bar (Visible on all viewports) */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-navy/60 px-3 py-2 text-xs font-mono">
          <div className="flex h-6 w-8 sm:w-9 shrink-0 items-center justify-center rounded border border-white/15 bg-white/5 text-[10px] sm:text-[11px] font-bold text-white/70">
            C3
          </div>
          <span className="text-xs font-bold text-brand-light">fx</span>
          <div className="truncate text-[11px] sm:text-xs text-white/90">
            =<span className="font-bold text-brand-light">XLOOKUP</span>
            <span className="text-white/60">(A3, Products, Target)</span>
            <span className="text-amber-300 font-bold"> * </span>
            <span className="text-sky-300 font-bold">1.285</span>
          </div>
        </div>

        {/* ── Desktop & Tablet View: Full Spreadsheet Table (lg+) ── */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/4 text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                <th className="w-10 px-3 py-2 text-center border-r border-white/5 font-mono">#</th>
                <th className="px-3 py-2 border-r border-white/5">Portfolio Segment</th>
                <th className="px-3 py-2 border-r border-white/5 text-right font-mono">Target</th>
                <th className="px-3 py-2 border-r border-white/5 text-right font-mono">Actual Margin</th>
                <th className="px-3 py-2 text-center">Status</th>
              </tr>
            </thead>
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

        {/* ── Mobile View: Compact Responsive Formula & Metric Tiles (Mobile < 1024px) ── */}
        <div className="block lg:hidden p-4 space-y-3">
          {/* Active Calculation Spotlight */}
          <div className="rounded-xl border border-brand/30 bg-brand/10 p-3">
            <div className="flex items-center justify-between text-xs font-semibold text-white">
              <span className="flex items-center gap-1.5 text-brand-light">
                <IconSparkles className="size-3.5" />
                <span>Financial Modeling (Row 2)</span>
              </span>
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                +32.7% Outperformed
              </span>
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-2 text-left">
              <div className="rounded-lg bg-white/5 p-2 font-mono">
                <span className="text-[10px] text-white/50 block">Target Budget</span>
                <span className="text-xs font-bold text-white/80">$85,000</span>
              </div>
              <div className="rounded-lg bg-brand/15 p-2 font-mono ring-1 ring-brand/30">
                <span className="text-[10px] text-brand-light/70 block">Actual Margin</span>
                <span className="text-xs font-extrabold text-brand-light">$112,800</span>
              </div>
            </div>
          </div>

          {/* Secondary Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl border border-white/10 bg-white/4 p-2.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white/50 block font-mono">Enterprise Trackers</span>
                <span className="font-bold text-white font-mono">$154,200</span>
              </div>
              <span className="text-[10px] font-bold text-brand-light">+28.5%</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/4 p-2.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white/50 block font-mono">Automated Scripts</span>
                <span className="font-bold text-white font-mono">$82,100</span>
              </div>
              <span className="text-[10px] font-bold text-brand-light">+26.3%</span>
            </div>
          </div>
        </div>

        {/* Excel Status Bar Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-white/3 px-3.5 py-2 text-[10px] text-white/60 font-mono">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1 text-white/80">
              <IconCalculator className="size-3 text-brand-light" />
              <span>Ready</span>
            </span>
            <span className="text-white/30">|</span>
            <span>0.02s</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden xs:inline">Avg: $101,875</span>
            <span className="hidden xs:inline text-white/30">|</span>
            <span className="text-brand-light font-bold">Sum: $407,500</span>
          </div>
        </div>
      </div>
    </div>
  )
}