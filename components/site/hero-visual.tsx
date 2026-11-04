const CELL = 60
const COLUMNS = ["A", "B", "C", "D"]
const VALUES = [
  ["1,240", "980", "1,560", "2,110"],
  ["860", "5,420", "1,090", "740"],
  ["1,120", "640", "2,300", "910"],
  ["430", "1,870", "1,260", "3,050"],
]
const SELECTED = { row: 1, column: 1 }
const GRID_LINES = (color: string) =>
  `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`

export function HeroVisual() {
  return (
    <div
      aria-hidden
      className="relative mx-auto h-[380px] w-full max-w-[520px]"
      style={{ perspective: "1400px" }}
    >
      <div className="absolute inset-x-12 bottom-6 h-16 bg-[radial-gradient(closest-side,rgb(0_0_0/0.45),transparent)]" />

      <div className="absolute inset-0 motion-safe:animate-float">
        <div
          className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-[52%]"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(58deg) rotateZ(-38deg)",
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl border border-white/15 bg-navy-soft shadow-2xl"
            style={{
              transform: "translateZ(0px)",
              backgroundImage: GRID_LINES("rgb(255 255 255 / 0.12)"),
              backgroundSize: `${CELL}px ${CELL}px`,
            }}
          />

          <div
            className="absolute inset-0 rounded-2xl border border-white/30 shadow-xl"
            style={{
              transform: "translateZ(70px)",
              backgroundImage: `${GRID_LINES("rgb(255 255 255 / 0.28)")}, linear-gradient(to bottom right, var(--brand-light), var(--brand))`,
              backgroundSize: `${CELL}px ${CELL}px, ${CELL}px ${CELL}px, 100% 100%`,
            }}
          />

          <div
            className="absolute inset-0 overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-2xl"
            style={{
              transform: "translateZ(140px)",
              backgroundImage: GRID_LINES("rgb(16 31 61 / 0.1)"),
              backgroundSize: `${CELL}px ${CELL}px`,
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[60px] bg-brand" />
            <div className="absolute inset-y-0 left-0 w-[60px] bg-navy/[0.05]" />
            <div
              className="absolute rounded-sm bg-brand/15 ring-2 ring-brand"
              style={{ left: CELL * 2, top: CELL * 2, width: CELL, height: CELL }}
            />
            <div
              className="absolute bg-brand/10"
              style={{ left: CELL * 2, top: CELL * 3, width: CELL * 2, height: CELL }}
            />
            <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 font-mono text-[12px]">
              <span />
              {COLUMNS.map((column) => (
                <span key={column} className="flex items-center justify-center font-bold text-white">
                  {column}
                </span>
              ))}
              {VALUES.map((values, rowIndex) => (
                <div key={rowIndex} className="contents">
                  <span className="flex items-center justify-center text-navy/40">{rowIndex + 1}</span>
                  {values.map((value, columnIndex) => (
                    <span
                      key={columnIndex}
                      className={`flex items-center justify-end px-2.5 ${
                        rowIndex === SELECTED.row && columnIndex === SELECTED.column
                          ? "font-bold text-brand"
                          : "text-navy/70"
                      }`}
                    >
                      {value}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
