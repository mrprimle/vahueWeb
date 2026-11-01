// Product-UI miniatures from scale.com/donovan's Product Overview cards, ported 1:1 (Tailwind classes + inline
// styles as Scale ships them). Gradient utilities that Scale's CSS does not compile (so render as none) are dropped;
// the two that do compile render as transparent -> indigo-600 / red-600 and are inlined. The UI labels are placeholder copy, not Scale's.
// TODO: Vahue copy (labels inside the mocks)

export function AgentBuilderMock() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl font-sans text-base leading-[1.5] tracking-normal [&_p]:font-display [&_p]:tracking-[-0.01em]" style={{ aspectRatio: "764 / 560", background: "radial-gradient(ellipse 90% 65% at 50% 0%, rgba(124,106,247,0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 50% 105%, rgba(14,165,233,0.07) 0%, transparent 60%), #0c0b0f" }}>
      <div className="absolute overflow-hidden" style={{ inset: "20px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 4px 16px rgba(0,0,0,0.55), 0 16px 48px rgba(0,0,0,0.45), 0 40px 80px rgba(0,0,0,0.3)" }}>
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: "1px", zIndex: "2", background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.14) 70%, transparent 95%)" }}>
        </div>
        <div className="w-full h-full">
          <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: "#080808" }}>
            <div className="flex items-center gap-1.5 px-3 py-2 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#060606" }}>
              <div className="w-2.5 h-2.5 rounded-sm overflow-hidden flex-shrink-0">
                <div className="w-full h-full">
                </div>
              </div>
              <span className="text-[8.5px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                Ops Agent
              </span>
              <span className="text-[8.5px] mx-0.5" style={{ color: "rgba(255,255,255,0.1)" }}>
                /
              </span>
              <span className="text-[8.5px] font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
                Agent Builder
              </span>
              <div className="ml-auto flex items-center gap-1">
                <span className="rounded px-1.5 py-0.5 text-[7px]" style={{ background: "rgba(124,106,247,0.1)", color: "rgba(124,106,247,0.75)", border: "1px solid rgba(124,106,247,0.2)" }}>
                  Draft
                </span>
                <span className="rounded px-2 py-0.5 text-[7px] font-medium" style={{ background: "rgba(62,207,142,0.1)", color: "#3ecf8e", border: "1px solid rgba(62,207,142,0.2)" }}>
                  Deploy
                </span>
              </div>
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="flex flex-col p-2.5 gap-2 overflow-hidden flex-shrink-0" style={{ width: "52%", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex gap-1">
                  <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    Assistant
                  </span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: "transparent", color: "rgba(255,255,255,0.2)", border: "1px solid transparent" }}>
                    Tools
                  </span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: "transparent", color: "rgba(255,255,255,0.2)", border: "1px solid transparent" }}>
                    Settings
                  </span>
                </div>
                <div className="rounded-md p-2" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[7px] uppercase mb-1" style={{ color: "rgba(255,255,255,0.18)", letterSpacing: "0.07em" }}>
                    System Prompt
                  </p>
                  <p className="text-[8px] leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                    You are an operations analyst. Review documents with care and always cite sources.
                  </p>
                </div>
                <div className="rounded-md p-2" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[7px] uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.18)", letterSpacing: "0.07em" }}>
                    Knowledge Base
                  </p>
                  <div className="flex items-center gap-1.5 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-sm flex-shrink-0" style={{ background: "#6366f1", opacity: "0.7" }}>
                    </div>
                    <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                      CRM Records
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-sm flex-shrink-0" style={{ background: "#8b5cf6", opacity: "0.7" }}>
                    </div>
                    <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                      Policy Handbook
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-sm flex-shrink-0" style={{ background: "#7c6af7", opacity: "0.7" }}>
                    </div>
                    <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                      Operations DB
                    </span>
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between rounded-md px-2 py-1.5" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "rgba(124,106,247,0.8)" }}>
                    </div>
                    <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                      Model C 70B Instruct
                    </span>
                  </div>
                  <svg viewBox="0 0 8 8" className="w-2 h-2 flex-shrink-0" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                    <path d="M1.5 2.5l2.5 3 2.5-3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 flex flex-col p-2.5 overflow-hidden">
                <p className="text-[7px] uppercase mb-2 flex-shrink-0" style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.07em" }}>
                  Active Pipeline
                </p>
                <div className="flex flex-col">
                  <div>
                    <div className="flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "none" }}>
                      <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: "#6366f1" }}>
                      </div>
                      <span className="flex-1 text-[8.5px] truncate" style={{ color: "rgba(255,255,255,0.42)", fontWeight: "400" }}>
                        Source Connector
                      </span>
                      <span className="text-[7px] px-1 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.22)" }}>
                        Source
                      </span>
                    </div>
                    <div className="flex justify-center" style={{ height: "12px" }}>
                      <div className="flex flex-col items-center">
                        <div style={{ width: "1px", height: "6px", background: "rgba(255,255,255,0.08)" }}>
                        </div>
                        <svg viewBox="0 0 6 4" width="6" height="4" fill="none">
                          <path d="M0.5 0.5L3 3.5L5.5 0.5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "none" }}>
                      <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: "#8b5cf6" }}>
                      </div>
                      <span className="flex-1 text-[8.5px] truncate" style={{ color: "rgba(255,255,255,0.42)", fontWeight: "400" }}>
                        Knowledge Base
                      </span>
                      <span className="text-[7px] px-1 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.22)" }}>
                        Retrieval
                      </span>
                    </div>
                    <div className="flex justify-center" style={{ height: "12px" }}>
                      <div className="flex flex-col items-center">
                        <div style={{ width: "1px", height: "6px", background: "rgba(255,255,255,0.08)" }}>
                        </div>
                        <svg viewBox="0 0 6 4" width="6" height="4" fill="none">
                          <path d="M0.5 0.5L3 3.5L5.5 0.5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: "rgba(124,106,247,0.08)", border: "1px solid rgba(124,106,247,0.35)", boxShadow: "0 0 0 3px rgba(124,106,247,0.05)" }}>
                      <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: "#7c6af7" }}>
                      </div>
                      <span className="flex-1 text-[8.5px] truncate" style={{ color: "rgba(255,255,255,0.75)", fontWeight: "500" }}>
                        Reranker
                      </span>
                      <span className="text-[7px] px-1 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.22)" }}>
                        Filter
                      </span>
                    </div>
                    <div className="flex justify-center" style={{ height: "12px" }}>
                      <div className="flex flex-col items-center">
                        <div style={{ width: "1px", height: "6px", background: "rgba(255,255,255,0.08)" }}>
                        </div>
                        <svg viewBox="0 0 6 4" width="6" height="4" fill="none">
                          <path d="M0.5 0.5L3 3.5L5.5 0.5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "none" }}>
                      <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: "#3ecf8e" }}>
                      </div>
                      <span className="flex-1 text-[8.5px] truncate" style={{ color: "rgba(255,255,255,0.42)", fontWeight: "400" }}>
                        Model C 70B
                      </span>
                      <span className="text-[7px] px-1 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.22)" }}>
                        LLM
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 rounded-md p-2 flex-1 overflow-hidden" style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <p className="text-[7px] uppercase mb-1" style={{ color: "rgba(255,255,255,0.15)", letterSpacing: "0.07em" }}>
                    Output Preview
                  </p>
                  <p className="text-[8px] leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
                    Based on connected source data from last quarter, the selected workflow shows steadily rising volume with 3 key bottlenecks identified across teams...
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

export function CompareModelsMock() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl font-sans text-base leading-[1.5] tracking-normal [&_p]:font-display [&_p]:tracking-[-0.01em]" style={{ aspectRatio: "764 / 560", background: "radial-gradient(ellipse 90% 65% at 50% 0%, rgba(124,106,247,0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 50% 105%, rgba(14,165,233,0.07) 0%, transparent 60%), #0c0b0f" }}>
      <div className="absolute overflow-hidden" style={{ inset: "20px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 4px 16px rgba(0,0,0,0.55), 0 16px 48px rgba(0,0,0,0.45), 0 40px 80px rgba(0,0,0,0.3)" }}>
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: "1px", zIndex: "2", background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.14) 70%, transparent 95%)" }}>
        </div>
        <div className="w-full h-full">
          <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: "#080808" }}>
            <div className="flex items-center gap-1.5 px-3 py-2 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#060606" }}>
              <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 flex-shrink-0" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
                <path d="M6 2L2 5l4 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[8.5px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                Models
              </span>
              <span className="text-[8.5px] mx-0.5" style={{ color: "rgba(255,255,255,0.1)" }}>
                /
              </span>
              <span className="text-[8.5px] font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
                Compare Models
              </span>
            </div>
            <div className="flex gap-2 px-3 py-2 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[7.5px] uppercase" style={{ color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em" }}>
                  Model 1
                </span>
                <div className="flex items-center justify-between rounded-md px-2 py-1.5" style={{ background: "#111", border: "1px solid rgba(124,106,247,0.35)", borderLeft: "2px solid #7c6af7" }}>
                  <span className="text-[8.5px] truncate" style={{ color: "rgba(255,255,255,0.65)" }}>
                    Model A 7B Instruct
                  </span>
                  <svg viewBox="0 0 8 8" className="w-2 h-2 flex-shrink-0 ml-1" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
                    <path d="M1.5 2.5l2.5 3 2.5-3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[7.5px] uppercase" style={{ color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em" }}>
                  Model 2
                </span>
                <div className="flex items-center justify-between rounded-md px-2 py-1.5" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="text-[8.5px] truncate" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Model B Large Instruct
                  </span>
                  <svg viewBox="0 0 8 8" className="w-2 h-2 flex-shrink-0 ml-1" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
                    <path d="M1.5 2.5l2.5 3 2.5-3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex px-3 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="px-2 py-1.5 text-[8.5px]" style={{ color: "rgba(255,255,255,0.7)", borderBottom: "1.5px solid #7c6af7", marginBottom: "-1px" }}>
                Compare Metrics
              </div>
              <div className="px-2 py-1.5 text-[8.5px]" style={{ color: "rgba(255,255,255,0.22)", borderBottom: "1.5px solid transparent", marginBottom: "-1px" }}>
                Compare Responses
              </div>
            </div>
            <div className="flex-1 px-3 py-2 flex flex-col gap-1.5 overflow-hidden">
              <div className="flex items-center px-2 mb-0.5 flex-shrink-0">
                <span className="flex-1 text-[7.5px] uppercase" style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>
                  Metric
                </span>
                <span className="w-12 text-right text-[7.5px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                  Model A
                </span>
                <div className="w-16 flex items-center justify-end gap-1">
                  <span className="text-[6.5px] px-1 py-0.5 rounded font-medium" style={{ background: "rgba(62,207,142,0.1)", color: "#3ecf8e", border: "1px solid rgba(62,207,142,0.2)" }}>
                    Winner
                  </span>
                  <span className="text-[7.5px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                    Model B
                  </span>
                </div>
              </div>
              <div className="rounded-md px-2 py-1.5 flex flex-col gap-1 flex-shrink-0" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center">
                  <span className="flex-1 text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Factual accuracy
                  </span>
                  <span className="w-12 text-right text-[9px]" style={{ color: "rgba(255,255,255,0.28)" }}>
                    0.81
                  </span>
                  <span className="w-16 text-right text-[9px] font-semibold" style={{ color: "#3ecf8e" }}>
                    0.91
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: "3px", background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: "81%", background: "rgba(255,255,255,0.12)" }}>
                    </div>
                  </div>
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: "3px", background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: "91%", background: "rgba(62,207,142,0.55)" }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md px-2 py-1.5 flex flex-col gap-1 flex-shrink-0" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center">
                  <span className="flex-1 text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Hallucination rate
                  </span>
                  <span className="w-12 text-right text-[9px]" style={{ color: "rgba(255,255,255,0.28)" }}>
                    0.24
                  </span>
                  <span className="w-16 text-right text-[9px] font-semibold" style={{ color: "#f97316" }}>
                    0.14
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: "3px", background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: "24%", background: "rgba(255,255,255,0.12)" }}>
                    </div>
                  </div>
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: "3px", background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: "14%", background: "rgba(249,115,22,0.55)" }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md px-2 py-1.5 flex flex-col gap-1 flex-shrink-0" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center">
                  <span className="flex-1 text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Context recall
                  </span>
                  <span className="w-12 text-right text-[9px]" style={{ color: "rgba(255,255,255,0.28)" }}>
                    0.71
                  </span>
                  <span className="w-16 text-right text-[9px] font-semibold" style={{ color: "#3ecf8e" }}>
                    0.79
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: "3px", background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: "71%", background: "rgba(255,255,255,0.12)" }}>
                    </div>
                  </div>
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: "3px", background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: "79%", background: "rgba(62,207,142,0.55)" }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md px-2 py-1.5 flex flex-col gap-1 flex-shrink-0" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center">
                  <span className="flex-1 text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Latency p95
                  </span>
                  <span className="w-12 text-right text-[9px]" style={{ color: "rgba(255,255,255,0.28)" }}>
                    1.4s
                  </span>
                  <span className="w-16 text-right text-[9px] font-semibold" style={{ color: "#f97316" }}>
                    2.1s
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: "3px", background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: "55%", background: "rgba(255,255,255,0.12)" }}>
                    </div>
                  </div>
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: "3px", background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: "80%", background: "rgba(249,115,22,0.55)" }}>
                    </div>
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

export function AgentLibraryMock() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl font-sans text-base leading-[1.5] tracking-normal [&_p]:font-display [&_p]:tracking-[-0.01em]" style={{ aspectRatio: "764 / 560", background: "radial-gradient(ellipse 90% 65% at 50% 0%, rgba(124,106,247,0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 50% 105%, rgba(14,165,233,0.07) 0%, transparent 60%), #0c0b0f" }}>
      <div className="absolute overflow-hidden" style={{ inset: "20px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 4px 16px rgba(0,0,0,0.55), 0 16px 48px rgba(0,0,0,0.45), 0 40px 80px rgba(0,0,0,0.3)" }}>
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: "1px", zIndex: "2", background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.14) 70%, transparent 95%)" }}>
        </div>
        <div className="w-full h-full">
          <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: "#080808" }}>
            <div className="px-3 pt-2.5 pb-2 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#060606" }}>
              <p className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>
                Agent Library
              </p>
              <p className="text-[8px] mt-0.5" style={{ color: "rgba(255,255,255,0.28)" }}>
                Browse agents tuned for your core business workflows
              </p>
            </div>
            <div className="px-3 py-2 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
                <svg viewBox="0 0 12 12" className="w-3 h-3 flex-shrink-0" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5">
                  <circle cx="5" cy="5" r="3.5" />
                  <path d="M8.5 8.5L11 11" strokeLinecap="round" />
                </svg>
                <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.18)" }}>
                  Search for agents and applications...
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="rounded px-1.5 py-0.5 text-[7.5px]" style={{ background: "rgba(124,106,247,0.12)", color: "rgba(124,106,247,0.85)", border: "1px solid rgba(124,106,247,0.25)" }}>
                All
              </span>
              <span className="rounded px-1.5 py-0.5 text-[7.5px]" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
                Research
              </span>
              <span className="rounded px-1.5 py-0.5 text-[7.5px]" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
                Planning
              </span>
              <span className="rounded px-1.5 py-0.5 text-[7.5px]" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
                Analysis
              </span>
              <span className="rounded px-1.5 py-0.5 text-[7.5px]" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
                Reports
              </span>
            </div>
            <div className="flex-1 px-3 py-2 grid grid-cols-2 gap-1.5 overflow-hidden content-start">
              <div className="flex gap-2 rounded-md p-2" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center" style={{ backgroundImage: "linear-gradient(to right bottom, rgba(0,0,0,0) 0%, #4f46e5 100%)" }}>
                  <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3">
                    <circle cx="6" cy="4" r="2" />
                    <path d="M1.5 10.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[8.5px] font-medium leading-tight truncate" style={{ color: "rgba(255,255,255,0.68)" }}>
                    Insights Agent
                  </p>
                  <p className="text-[7.5px] leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.28)", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    Multi-tool analysis of events and tabular business data
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
                    Deep Search
                  </p>
                  <p className="text-[7.5px] leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.28)", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    Find every relevant document across connected sources
                  </p>
                </div>
              </div>
              <div className="flex gap-2 rounded-md p-2" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center" style={{ backgroundImage: "linear-gradient(to right bottom, rgba(0,0,0,0) 0%, #dc2626 100%)" }}>
                  <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3">
                    <circle cx="6" cy="4" r="2" />
                    <path d="M1.5 10.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[8.5px] font-medium leading-tight truncate" style={{ color: "rgba(255,255,255,0.68)" }}>
                    Capability Brief
                  </p>
                  <p className="text-[7.5px] leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.28)", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    Summarise capabilities and draft announcements
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
                    Ops Chat
                  </p>
                  <p className="text-[7.5px] leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.28)", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    Real-time analysis and exception monitoring
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
                    Ops Analyst
                  </p>
                  <p className="text-[7.5px] leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.28)", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    Review project data and draft detailed status reports
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
                    Field Parser
                  </p>
                  <p className="text-[7.5px] leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.28)", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    Pull structured fields out of free-form text
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
