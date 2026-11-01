// Scale's three product mock cards, generated from the page's RSC payload. Classes and inline styles are Scale's.
// `from-*` and most `to-*` gradient classes are not in Scale's compiled CSS, so they are left out: two tiles render transparent to colour, the others nothing.
// Every string is a prop (`t`), and every bar width (`w`), so the copy lives in content files.

export type MockCopy = { t: string[]; w: string[] }

export function AgentFactoryMock({ t, w }: MockCopy) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl " style={{ aspectRatio: "764 / 560", background: "radial-gradient(ellipse 90% 65% at 50% 0%, rgba(124,106,247,0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 50% 105%, rgba(14,165,233,0.07) 0%, transparent 60%), #0c0b0f" }}>
      <div className="absolute overflow-hidden" style={{ inset: "20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 4px 16px rgba(0,0,0,0.55), 0 16px 48px rgba(0,0,0,0.45), 0 40px 80px rgba(0,0,0,0.3)" }}>
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: 1, zIndex: 2, background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.14) 70%, transparent 95%)" }} />
        <div className="w-full h-full">
          <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: "#080808", fontFamily: "Inter, sans-serif" }}>
            <div className="flex items-center gap-1.5 px-3 py-2 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#060606" }}>
              <div className="w-2.5 h-2.5 rounded-sm overflow-hidden flex-shrink-0">
                <div className="w-full h-full" />
              </div>
              <span className="text-[8.5px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                {t[0]}
              </span>
              <span className="text-[8.5px] mx-0.5" style={{ color: "rgba(255,255,255,0.1)" }}>
                {t[1]}
              </span>
              <span className="text-[8.5px] font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
                {t[2]}
              </span>
              <div className="ml-auto flex items-center gap-1">
                <span className="rounded px-1.5 py-0.5 text-[7px]" style={{ background: "rgba(124,106,247,0.1)", color: "rgba(124,106,247,0.75)", border: "1px solid rgba(124,106,247,0.2)" }}>
                  {t[3]}
                </span>
                <span className="rounded px-2 py-0.5 text-[7px] font-medium" style={{ background: "rgba(62,207,142,0.1)", color: "#3ecf8e", border: "1px solid rgba(62,207,142,0.2)" }}>
                  {t[4]}
                </span>
              </div>
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="flex flex-col p-2.5 gap-2 overflow-hidden flex-shrink-0" style={{ width: "52%", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex gap-1">
                  <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {t[5]}
                  </span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: "transparent", color: "rgba(255,255,255,0.2)", border: "1px solid transparent" }}>
                    {t[6]}
                  </span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: "transparent", color: "rgba(255,255,255,0.2)", border: "1px solid transparent" }}>
                    {t[7]}
                  </span>
                </div>
                <div className="rounded-md p-2" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[7px] uppercase mb-1" style={{ color: "rgba(255,255,255,0.18)", letterSpacing: "0.07em" }}>
                    {t[8]}
                  </p>
                  <p className="text-[8px] leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {t[9]}
                  </p>
                </div>
                <div className="rounded-md p-2" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[7px] uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.18)", letterSpacing: "0.07em" }}>
                    {t[10]}
                  </p>
                  <div className="flex items-center gap-1.5 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-sm flex-shrink-0" style={{ background: "#6366f1", opacity: 0.7 }} />
                    <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                      {t[11]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-sm flex-shrink-0" style={{ background: "#8b5cf6", opacity: 0.7 }} />
                    <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                      {t[12]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-sm flex-shrink-0" style={{ background: "#7c6af7", opacity: 0.7 }} />
                    <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                      {t[13]}
                    </span>
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between rounded-md px-2 py-1.5" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "rgba(124,106,247,0.8)" }} />
                    <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {t[14]}
                    </span>
                  </div>
                  <svg viewBox="0 0 8 8" className="w-2 h-2 flex-shrink-0" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                    <path d="M1.5 2.5l2.5 3 2.5-3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 flex flex-col p-2.5 overflow-hidden">
                <p className="text-[7px] uppercase mb-2 flex-shrink-0" style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.07em" }}>
                  {t[15]}
                </p>
                <div className="flex flex-col">
                  <div>
                    <div className="flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "none" }}>
                      <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: "#6366f1" }} />
                      <span className="flex-1 text-[8.5px] truncate" style={{ color: "rgba(255,255,255,0.42)", fontWeight: 400 }}>
                        {t[16]}
                      </span>
                      <span className="text-[7px] px-1 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.22)" }}>
                        {t[17]}
                      </span>
                    </div>
                    <div className="flex justify-center" style={{ height: 12 }}>
                      <div className="flex flex-col items-center">
                        <div style={{ width: 1, height: 6, background: "rgba(255,255,255,0.08)" }} />
                        <svg viewBox="0 0 6 4" width="6" height="4" fill="none">
                          <path d="M0.5 0.5L3 3.5L5.5 0.5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "none" }}>
                      <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: "#8b5cf6" }} />
                      <span className="flex-1 text-[8.5px] truncate" style={{ color: "rgba(255,255,255,0.42)", fontWeight: 400 }}>
                        {t[18]}
                      </span>
                      <span className="text-[7px] px-1 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.22)" }}>
                        {t[19]}
                      </span>
                    </div>
                    <div className="flex justify-center" style={{ height: 12 }}>
                      <div className="flex flex-col items-center">
                        <div style={{ width: 1, height: 6, background: "rgba(255,255,255,0.08)" }} />
                        <svg viewBox="0 0 6 4" width="6" height="4" fill="none">
                          <path d="M0.5 0.5L3 3.5L5.5 0.5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: "rgba(124,106,247,0.08)", border: "1px solid rgba(124,106,247,0.35)", boxShadow: "0 0 0 3px rgba(124,106,247,0.05)" }}>
                      <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: "#7c6af7" }} />
                      <span className="flex-1 text-[8.5px] truncate" style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                        {t[20]}
                      </span>
                      <span className="text-[7px] px-1 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.22)" }}>
                        {t[21]}
                      </span>
                    </div>
                    <div className="flex justify-center" style={{ height: 12 }}>
                      <div className="flex flex-col items-center">
                        <div style={{ width: 1, height: 6, background: "rgba(255,255,255,0.08)" }} />
                        <svg viewBox="0 0 6 4" width="6" height="4" fill="none">
                          <path d="M0.5 0.5L3 3.5L5.5 0.5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "none" }}>
                      <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: "#3ecf8e" }} />
                      <span className="flex-1 text-[8.5px] truncate" style={{ color: "rgba(255,255,255,0.42)", fontWeight: 400 }}>
                        {t[22]}
                      </span>
                      <span className="text-[7px] px-1 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.22)" }}>
                        {t[23]}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 rounded-md p-2 flex-1 overflow-hidden" style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <p className="text-[7px] uppercase mb-1" style={{ color: "rgba(255,255,255,0.15)", letterSpacing: "0.07em" }}>
                    {t[24]}
                  </p>
                  <p className="text-[8px] leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
                    {t[25]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TestEvaluateMock({ t, w }: MockCopy) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl " style={{ aspectRatio: "764 / 560", background: "radial-gradient(ellipse 90% 65% at 50% 0%, rgba(124,106,247,0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 50% 105%, rgba(14,165,233,0.07) 0%, transparent 60%), #0c0b0f" }}>
      <div className="absolute overflow-hidden" style={{ inset: "20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 4px 16px rgba(0,0,0,0.55), 0 16px 48px rgba(0,0,0,0.45), 0 40px 80px rgba(0,0,0,0.3)" }}>
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: 1, zIndex: 2, background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.14) 70%, transparent 95%)" }} />
        <div className="w-full h-full">
          <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: "#080808", fontFamily: "Inter, sans-serif" }}>
            <div className="flex items-center gap-1.5 px-3 py-2 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#060606" }}>
              <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 flex-shrink-0" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
                <path d="M6 2L2 5l4 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[8.5px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                {t[0]}
              </span>
              <span className="text-[8.5px] mx-0.5" style={{ color: "rgba(255,255,255,0.1)" }}>
                {t[1]}
              </span>
              <span className="text-[8.5px] font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
                {t[2]}
              </span>
            </div>
            <div className="flex gap-2 px-3 py-2 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[7.5px] uppercase" style={{ color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em" }}>
                  {t[3]}
                </span>
                <div className="flex items-center justify-between rounded-md px-2 py-1.5" style={{ background: "#111", border: "1px solid rgba(124,106,247,0.35)", borderLeft: "2px solid #7c6af7" }}>
                  <span className="text-[8.5px] truncate" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {t[4]}
                  </span>
                  <svg viewBox="0 0 8 8" className="w-2 h-2 flex-shrink-0 ml-1" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
                    <path d="M1.5 2.5l2.5 3 2.5-3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[7.5px] uppercase" style={{ color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em" }}>
                  {t[5]}
                </span>
                <div className="flex items-center justify-between rounded-md px-2 py-1.5" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="text-[8.5px] truncate" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {t[6]}
                  </span>
                  <svg viewBox="0 0 8 8" className="w-2 h-2 flex-shrink-0 ml-1" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
                    <path d="M1.5 2.5l2.5 3 2.5-3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex px-3 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="px-2 py-1.5 text-[8.5px]" style={{ color: "rgba(255,255,255,0.7)", borderBottom: "1.5px solid #7c6af7", marginBottom: -1 }}>
                {t[7]}
              </div>
              <div className="px-2 py-1.5 text-[8.5px]" style={{ color: "rgba(255,255,255,0.22)", borderBottom: "1.5px solid transparent", marginBottom: -1 }}>
                {t[8]}
              </div>
            </div>
            <div className="flex-1 px-3 py-2 flex flex-col gap-1.5 overflow-hidden">
              <div className="flex items-center px-2 mb-0.5 flex-shrink-0">
                <span className="flex-1 text-[7.5px] uppercase" style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>
                  {t[9]}
                </span>
                <span className="w-12 text-right text-[7.5px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                  {t[10]}
                </span>
                <div className="w-16 flex items-center justify-end gap-1">
                  <span className="text-[6.5px] px-1 py-0.5 rounded font-medium" style={{ background: "rgba(62,207,142,0.1)", color: "#3ecf8e", border: "1px solid rgba(62,207,142,0.2)" }}>
                    {t[11]}
                  </span>
                  <span className="text-[7.5px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {t[12]}
                  </span>
                </div>
              </div>
              <div className="rounded-md px-2 py-1.5 flex flex-col gap-1 flex-shrink-0" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center">
                  <span className="flex-1 text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {t[13]}
                  </span>
                  <span className="w-12 text-right text-[9px]" style={{ color: "rgba(255,255,255,0.28)" }}>
                    {t[14]}
                  </span>
                  <span className="w-16 text-right text-[9px] font-semibold" style={{ color: "#3ecf8e" }}>
                    {t[15]}
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: w[0], background: "rgba(255,255,255,0.12)" }} />
                  </div>
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: w[1], background: "rgba(62,207,142,0.55)" }} />
                  </div>
                </div>
              </div>
              <div className="rounded-md px-2 py-1.5 flex flex-col gap-1 flex-shrink-0" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center">
                  <span className="flex-1 text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {t[16]}
                  </span>
                  <span className="w-12 text-right text-[9px]" style={{ color: "rgba(255,255,255,0.28)" }}>
                    {t[17]}
                  </span>
                  <span className="w-16 text-right text-[9px] font-semibold" style={{ color: "#f97316" }}>
                    {t[18]}
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: w[2], background: "rgba(255,255,255,0.12)" }} />
                  </div>
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: w[3], background: "rgba(249,115,22,0.55)" }} />
                  </div>
                </div>
              </div>
              <div className="rounded-md px-2 py-1.5 flex flex-col gap-1 flex-shrink-0" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center">
                  <span className="flex-1 text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {t[19]}
                  </span>
                  <span className="w-12 text-right text-[9px]" style={{ color: "rgba(255,255,255,0.28)" }}>
                    {t[20]}
                  </span>
                  <span className="w-16 text-right text-[9px] font-semibold" style={{ color: "#3ecf8e" }}>
                    {t[21]}
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: w[4], background: "rgba(255,255,255,0.12)" }} />
                  </div>
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: w[5], background: "rgba(62,207,142,0.55)" }} />
                  </div>
                </div>
              </div>
              <div className="rounded-md px-2 py-1.5 flex flex-col gap-1 flex-shrink-0" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center">
                  <span className="flex-1 text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {t[22]}
                  </span>
                  <span className="w-12 text-right text-[9px]" style={{ color: "rgba(255,255,255,0.28)" }}>
                    {t[23]}
                  </span>
                  <span className="w-16 text-right text-[9px] font-semibold" style={{ color: "#f97316" }}>
                    {t[24]}
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: w[6], background: "rgba(255,255,255,0.12)" }} />
                  </div>
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: w[7], background: "rgba(249,115,22,0.55)" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AgentArsenalMock({ t, w }: MockCopy) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl " style={{ aspectRatio: "764 / 560", background: "radial-gradient(ellipse 90% 65% at 50% 0%, rgba(124,106,247,0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 50% 105%, rgba(14,165,233,0.07) 0%, transparent 60%), #0c0b0f" }}>
      <div className="absolute overflow-hidden" style={{ inset: "20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 4px 16px rgba(0,0,0,0.55), 0 16px 48px rgba(0,0,0,0.45), 0 40px 80px rgba(0,0,0,0.3)" }}>
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: 1, zIndex: 2, background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.14) 70%, transparent 95%)" }} />
        <div className="w-full h-full">
          <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: "#080808", fontFamily: "Inter, sans-serif" }}>
            <div className="px-3 pt-2.5 pb-2 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#060606" }}>
              <p className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>
                {t[0]}
              </p>
              <p className="text-[8px] mt-0.5" style={{ color: "rgba(255,255,255,0.28)" }}>
                {t[1]}
              </p>
            </div>
            <div className="px-3 py-2 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
                <svg viewBox="0 0 12 12" className="w-3 h-3 flex-shrink-0" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5">
                  <circle cx="5" cy="5" r="3.5" />
                  <path d="M8.5 8.5L11 11" strokeLinecap="round" />
                </svg>
                <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.18)" }}>
                  {t[2]}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="rounded px-1.5 py-0.5 text-[7.5px]" style={{ background: "rgba(124,106,247,0.12)", color: "rgba(124,106,247,0.85)", border: "1px solid rgba(124,106,247,0.25)" }}>
                {t[3]}
              </span>
              <span className="rounded px-1.5 py-0.5 text-[7.5px]" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {t[4]}
              </span>
              <span className="rounded px-1.5 py-0.5 text-[7.5px]" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {t[5]}
              </span>
              <span className="rounded px-1.5 py-0.5 text-[7.5px]" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {t[6]}
              </span>
              <span className="rounded px-1.5 py-0.5 text-[7.5px]" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {t[7]}
              </span>
            </div>
            <div className="flex-1 px-3 py-2 grid grid-cols-2 gap-1.5 overflow-hidden content-start">
              <div className="flex gap-2 rounded-md p-2" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center bg-gradient-to-br to-indigo-600">
                  <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3">
                    <circle cx="6" cy="4" r="2" />
                    <path d="M1.5 10.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[8.5px] font-medium leading-tight truncate" style={{ color: "rgba(255,255,255,0.68)" }}>
                    {t[8]}
                  </p>
                  <p className="text-[7.5px] leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.28)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {t[9]}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 rounded-md p-2" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3">
                    <circle cx="6" cy="4" r="2" />
                    <path d="M1.5 10.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[8.5px] font-medium leading-tight truncate" style={{ color: "rgba(255,255,255,0.68)" }}>
                    {t[10]}
                  </p>
                  <p className="text-[7.5px] leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.28)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {t[11]}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 rounded-md p-2" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center bg-gradient-to-br to-red-600">
                  <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3">
                    <circle cx="6" cy="4" r="2" />
                    <path d="M1.5 10.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[8.5px] font-medium leading-tight truncate" style={{ color: "rgba(255,255,255,0.68)" }}>
                    {t[12]}
                  </p>
                  <p className="text-[7.5px] leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.28)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {t[13]}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 rounded-md p-2" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3">
                    <circle cx="6" cy="4" r="2" />
                    <path d="M1.5 10.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[8.5px] font-medium leading-tight truncate" style={{ color: "rgba(255,255,255,0.68)" }}>
                    {t[14]}
                  </p>
                  <p className="text-[7.5px] leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.28)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {t[15]}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 rounded-md p-2" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3">
                    <circle cx="6" cy="4" r="2" />
                    <path d="M1.5 10.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[8.5px] font-medium leading-tight truncate" style={{ color: "rgba(255,255,255,0.68)" }}>
                    {t[16]}
                  </p>
                  <p className="text-[7.5px] leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.28)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {t[17]}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 rounded-md p-2" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3">
                    <circle cx="6" cy="4" r="2" />
                    <path d="M1.5 10.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[8.5px] font-medium leading-tight truncate" style={{ color: "rgba(255,255,255,0.68)" }}>
                    {t[18]}
                  </p>
                  <p className="text-[7.5px] leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.28)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {t[19]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
