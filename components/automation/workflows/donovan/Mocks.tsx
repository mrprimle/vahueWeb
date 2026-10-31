'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/*
 * Product-UI miniatures in the slot of the donovan clone's Product Overview cards (aspect 764/560, radius 12,
 * a window inset 20px with a 1px white/10 border, a top highlight and a deep shadow). The UI shows a Vahue
 * support / voice agent with placeholder data: no figures, only states. Monochrome with a single green for
 * "done" and amber for "needs a person" (no blue or purple, per DESIGN.md).
 *
 * The UI is laid out on a fixed 460-wide canvas (about the width of one card at 1440) and scaled to the frame,
 * so it reads like a screenshot at every width instead of reflowing.
 */

const CANVAS = 460
const CANVAS_H = (CANVAS * 560) / 764

const GREEN = '#3ecf8e'
const AMBER = '#f5b454'

const tone = {
  green: { background: 'rgba(62,207,142,0.1)', color: GREEN, border: '1px solid rgba(62,207,142,0.2)' },
  amber: { background: 'rgba(245,180,84,0.1)', color: AMBER, border: '1px solid rgba(245,180,84,0.22)' },
  muted: { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.08)' },
}
type Tone = keyof typeof tone

const Chip = ({ children, t = 'muted' }: { children: ReactNode; t?: Tone }) => (
  <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded px-1.5 py-0.5 text-[8px] font-medium leading-[1.3]" style={tone[t]}>
    {children}
  </span>
)

const Overline = ({ children }: { children: ReactNode }) => (
  <p className="mb-1.5 text-[7.5px] uppercase leading-[1.3]" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.07em' }}>
    {children}
  </p>
)

const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-md p-2 ${className}`} style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)' }}>
    {children}
  </div>
)

const Check = ({ color = GREEN }: { color?: string }) => (
  <svg viewBox="0 0 10 8" width="8" height="7" fill="none" aria-hidden className="shrink-0">
    <path d="M1 4.2 3.6 6.8 9 1.2" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Lock = () => (
  <svg viewBox="0 0 10 12" width="7" height="8" fill="none" aria-hidden className="shrink-0">
    <rect x="1" y="5" width="8" height="6" rx="1.2" stroke={AMBER} strokeWidth="1.1" />
    <path d="M3 5V3.5a2 2 0 0 1 4 0V5" stroke={AMBER} strokeWidth="1.1" />
  </svg>
)

const ChannelIcon = ({ kind }: { kind: 'chat' | 'phone' | 'email' }) => (
  <svg viewBox="0 0 12 12" width="9" height="9" fill="none" aria-hidden className="shrink-0" stroke="rgba(255,255,255,0.45)" strokeWidth="1">
    {kind === 'chat' ? <path d="M2 2.5h8v5.5H5L2.5 10V8H2z" strokeLinejoin="round" /> : null}
    {kind === 'phone' ? (
      <path d="M3 1.8 4.6 1.5l1 2.4-1.1.8a6 6 0 0 0 2.8 2.8l.8-1.1 2.4 1-.3 1.6c-4.6.4-8-3-7.2-7.2Z" strokeLinejoin="round" />
    ) : null}
    {kind === 'email' ? (
      <>
        <rect x="1.5" y="2.5" width="9" height="7" rx="1" />
        <path d="m1.8 3 4.2 3.4L10.2 3" />
      </>
    ) : null}
  </svg>
)

/** Shared window chrome. `crumb` names the view, `status` sits at the right of the title bar. */
function Shell({ label, crumb, status, children }: { label: string; crumb: string; status?: ReactNode; children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const el = frame.current
    if (!el) return
    const measure = () => setScale(Math.min(1.25, el.clientWidth / CANVAS))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={frame}
      role="img"
      aria-label={label}
      className="relative w-full overflow-hidden rounded-xl font-sans text-base leading-[1.5] tracking-normal [&_p]:font-display [&_p]:tracking-[-0.01em]"
      style={{
        aspectRatio: '764 / 560',
        background: 'radial-gradient(ellipse 90% 65% at 50% 0%, rgba(124,106,247,0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 50% 105%, rgba(14,165,233,0.07) 0%, transparent 60%), #0c0b0f', // clone's card glow
      }}
    >
      <div aria-hidden className="absolute left-0 top-0 origin-top-left" style={{ width: CANVAS, height: CANVAS_H, transform: `scale(${scale})` }}>
        <div
          className="absolute overflow-hidden"
          style={{
            inset: '20px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.55), 0 16px 48px rgba(0,0,0,0.45), 0 40px 80px rgba(0,0,0,0.3)',
          }}
        >
          <div
            className="pointer-events-none absolute left-0 right-0 top-0"
            style={{
              height: '1px',
              zIndex: 2,
              background:
                'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.14) 70%, transparent 95%)',
            }}
          />
          <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ background: '#080808' }}>
            <div className="flex shrink-0 items-center gap-1.5 px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#060606' }}>
              <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: '#7c6af7' }} />
              <span className="text-[8.5px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Support agent
              </span>
              <span className="mx-0.5 text-[8.5px]" style={{ color: 'rgba(255,255,255,0.12)' }}>
                /
              </span>
              <span className="text-[8.5px] font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {crumb}
              </span>
              <div className="ml-auto flex items-center gap-1">{status}</div>
            </div>
            <div className="flex min-h-0 flex-1 overflow-hidden">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Bubble = ({ from, children }: { from: 'customer' | 'agent'; children: ReactNode }) => (
  <div className={`flex ${from === 'agent' ? 'justify-start' : 'justify-end'}`}>
    <p
      className="max-w-[78%] rounded-lg px-2 py-1.5 text-[8.5px] leading-[1.45]"
      style={
        from === 'agent'
          ? { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.06)' }
          : { background: 'rgba(255,255,255,0.88)', color: '#0a0a0a' }
      }
    >
      {children}
    </p>
  </div>
)

const SystemLine = ({ children, t = 'green' }: { children: ReactNode; t?: Tone }) => (
  <div className="flex items-center justify-center gap-1.5 py-0.5">
    <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
    <Chip t={t}>{children}</Chip>
    <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
  </div>
)

const ToolRow = ({ name, state, t = 'green' }: { name: string; state: string; t?: Tone }) => (
  <div className="flex items-center gap-1.5 rounded-md px-2 py-1.5" style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)' }}>
    {t === 'amber' ? <Lock /> : <Check />}
    <span className="flex-1 truncate text-[8.5px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
      {name}
    </span>
    <Chip t={t}>{state}</Chip>
  </div>
)

/* ---------- 1. Chat: a routine request resolved end to end ---------- */
export function ChatMock() {
  return (
    <Shell label="Chat agent resolving a delivery change" crumb="Live chat" status={<Chip t="green">Resolved</Chip>}>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3" style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <Bubble from="customer">Hi, can I change the delivery address on my order?</Bubble>
        <Bubble from="agent">Yes. To keep your account safe, please confirm the email you ordered with.</Bubble>
        <Bubble from="customer">It’s the one ending in @example.com</Bubble>
        <SystemLine>
          <Check /> Identity verified
        </SystemLine>
        <Bubble from="agent">Thanks. Your order now ships to the new address, and a confirmation is on its way.</Bubble>
        <div className="mt-auto flex items-center gap-1.5 rounded-md px-2 py-1.5" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
          <span className="flex-1 text-[8.5px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Message
          </span>
          <span className="h-3 w-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.12)' }} />
        </div>
      </div>
      <div className="flex w-[38%] shrink-0 flex-col gap-1.5 p-2.5">
        <Overline>Agent actions</Overline>
        <ToolRow name="Verify identity" state="Done" />
        <ToolRow name="Look up order" state="Done" />
        <ToolRow name="Update address" state="Done" />
        <ToolRow name="Send confirmation" state="Done" />
        <Card className="mt-auto">
          <Overline>Limits</Overline>
          <p className="text-[8px] leading-[1.45]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Address changes before dispatch only.
          </p>
        </Card>
      </div>
    </Shell>
  )
}

/* ---------- 2. Hand-off: the ticket a person receives ---------- */
export function HandoffMock() {
  return (
    <Shell label="Hand-off ticket with a summary for the support team" crumb="Hand-off" status={<Chip t="amber">Needs a person</Chip>}>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-medium" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}>
            JD
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[9.5px] font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Refund request outside the return window
            </p>
            <p className="text-[8px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              From chat · assigned to Billing
            </p>
          </div>
        </div>
        <Card>
          <Overline>Summary from the agent</Overline>
          <ul className="flex flex-col gap-1">
            {[
              'Customer asks to return an item past the policy window.',
              'Identity verified by email.',
              'Order found; no changes made.',
              'Refunds above the agent’s limit need approval.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-1.5 text-[8.5px] leading-[1.45]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full" style={{ background: 'rgba(255,255,255,0.45)' }} />
                {t}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <Overline>Suggested next step</Overline>
          <p className="text-[8.5px] leading-[1.45]" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Approve a one-off exception or offer store credit.
          </p>
        </Card>
        <div className="mt-auto flex gap-1.5">
          <span className="rounded px-2 py-1 text-[8px] font-medium" style={{ background: 'rgba(255,255,255,0.9)', color: '#0a0a0a' }}>
            Approve
          </span>
          <span className="rounded px-2 py-1 text-[8px]" style={tone.muted}>
            Reply to customer
          </span>
        </div>
      </div>
      <div className="flex w-[34%] shrink-0 flex-col gap-1.5 p-2.5" style={{ borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        <Overline>Context attached</Overline>
        {['Conversation transcript', 'Order record', 'Account history', 'Policy excerpt'].map((t) => (
          <div key={t} className="flex items-center gap-1.5 rounded-md px-2 py-1.5" style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="h-1.5 w-1.5 shrink-0 rounded-sm" style={{ background: 'rgba(255,255,255,0.35)' }} />
            <span className="truncate text-[8.5px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {t}
            </span>
          </div>
        ))}
      </div>
    </Shell>
  )
}

/* ---------- 3. Queue: every channel in one view, states only ---------- */
const QUEUE: { ch: 'chat' | 'phone' | 'email'; subject: string; owner: string; state: string; t: Tone; sla: number }[] = [
  { ch: 'phone', subject: 'Reschedule an appointment', owner: 'Agent', state: 'Resolved', t: 'green', sla: 0.25 },
  { ch: 'chat', subject: 'Where is my order?', owner: 'Agent', state: 'Resolved', t: 'green', sla: 0.15 },
  { ch: 'chat', subject: 'Refund outside the window', owner: 'Billing team', state: 'Handed off', t: 'amber', sla: 0.45 },
  { ch: 'phone', subject: 'Update payment details', owner: 'Agent', state: 'In progress', t: 'muted', sla: 0.35 },
  { ch: 'email', subject: 'Complaint about a delivery', owner: 'Support team', state: 'Handed off', t: 'amber', sla: 0.4 },
]

export function QueueMock() {
  return (
    <Shell label="Support queue across chat, phone and email" crumb="Queue" status={<Chip>All channels</Chip>}>
      <div className="flex min-w-0 flex-1 flex-col p-3">
        <div className="mb-1.5 grid grid-cols-[14px_1fr_64px_62px_52px] items-center gap-2 px-1">
          {['', 'Request', 'Owner', 'Status', 'Service level'].map((h) => (
            <span key={h} className="truncate text-[7.5px] uppercase" style={{ color: 'rgba(255,255,255,0.28)', letterSpacing: '0.07em' }}>
              {h}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {QUEUE.map((r) => (
            <div
              key={r.subject}
              className="grid grid-cols-[14px_1fr_64px_62px_52px] items-center gap-2 rounded-md px-1 py-1.5"
              style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <ChannelIcon kind={r.ch} />
              <span className="truncate text-[8.5px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {r.subject}
              </span>
              <span className="truncate text-[8px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {r.owner}
              </span>
              <span>
                <Chip t={r.t}>{r.state}</Chip>
              </span>
              <span className="block h-1 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <span className="block h-full rounded-full" style={{ width: `${r.sla * 100}%`, background: 'rgba(62,207,142,0.6)' }} />
              </span>
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-1.5 pt-2">
          <Check />
          <span className="text-[8px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            All queues inside service levels
          </span>
        </div>
      </div>
    </Shell>
  )
}

/* ---------- 4. Voice: greeting and identity checks on an inbound call ---------- */
const WAVE = [3, 6, 10, 7, 12, 16, 9, 5, 11, 18, 14, 8, 4, 9, 13, 17, 12, 6, 3, 7, 11, 15, 10, 5, 8, 12, 7, 4, 6, 9, 5, 3]

export function VoiceMock() {
  return (
    <Shell label="Voice agent greeting a caller and checking identity" crumb="Inbound call" status={<Chip t="green">● Live</Chip>}>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3" style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <Card>
          <div className="flex h-7 items-center justify-between gap-[2px]">
            {WAVE.map((h, i) => (
              <span key={i} className="w-[3px] rounded-full" style={{ height: h * 1.4, background: i < 20 ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.15)' }} />
            ))}
          </div>
        </Card>
        <Overline>Transcript</Overline>
        {[
          ['Agent', 'Hello, thanks for calling. How can I help today?'],
          ['Caller', 'I need to move my appointment to next week.'],
          ['Agent', 'Of course. Can you confirm your date of birth?'],
          ['Caller', 'Sure, it’s the fourth of May.'],
        ].map(([who, line], i) => (
          <div key={i} className="flex gap-2">
            <span className="w-8 shrink-0 text-[8px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {who}
            </span>
            <p className="text-[8.5px] leading-[1.45]" style={{ color: who === 'Agent' ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.5)' }}>
              {line}
            </p>
          </div>
        ))}
      </div>
      <div className="flex w-[38%] shrink-0 flex-col gap-1.5 p-2.5">
        <Overline>Identity checks</Overline>
        <ToolRow name="Phone number on file" state="Match" />
        <ToolRow name="Date of birth" state="Match" />
        <ToolRow name="Booking found" state="Done" />
        <Card className="mt-auto">
          <Overline>Hand-off</Overline>
          <p className="text-[8px] leading-[1.45]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Caller can ask for a person at any time.
          </p>
        </Card>
      </div>
    </Shell>
  )
}

/* ---------- 5. Resolve: the account view and what the agent may do ---------- */
export function ActionsMock() {
  return (
    <Shell label="Agent looking up an account and acting within its limits" crumb="Account lookup" status={<Chip>Role: Support tier 1</Chip>}>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3" style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <Card>
          <Overline>Customer record</Overline>
          {[
            ['Account', 'Verified'],
            ['Plan', 'Standard'],
            ['Latest order', 'Shipped'],
            ['Open bookings', 'One upcoming'],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-[3px]" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <span className="text-[8.5px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {k}
              </span>
              <span className="text-[8.5px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {v}
              </span>
            </div>
          ))}
        </Card>
        <Card>
          <Overline>Request</Overline>
          <p className="text-[8.5px] leading-[1.45]" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Move the upcoming booking and resend the confirmation.
          </p>
        </Card>
      </div>
      <div className="flex w-[50%] shrink-0 flex-col gap-1.5 p-2.5">
        <Overline>Allowed actions</Overline>
        <ToolRow name="Resend confirmation" state="Allowed" />
        <ToolRow name="Reschedule booking" state="Allowed" />
        <ToolRow name="Update contact details" state="Allowed" />
        <ToolRow name="Issue a refund" state="Approval" t="amber" />
        <ToolRow name="Close the account" state="Person only" t="amber" />
      </div>
    </Shell>
  )
}

/* ---------- 6. Learn: the weekly review of escalations ---------- */
export function ReviewMock() {
  return (
    <Shell label="Weekly review of escalations" crumb="Weekly review" status={<Chip>This week</Chip>}>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3" style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <Overline>Why conversations were handed off</Overline>
        {[
          ['Refund above the agent’s limit', 'Keep with team', 'muted'],
          ['Address change after dispatch', 'Automate next', 'green'],
          ['Caller asked for a person', 'Keep with team', 'muted'],
          ['Missing order number', 'Automate next', 'green'],
          ['Complaint needing judgement', 'Keep with team', 'muted'],
        ].map(([reason, decision, t]) => (
          <div key={reason} className="flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="flex-1 truncate text-[8.5px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {reason}
            </span>
            <Chip t={t as Tone}>{decision}</Chip>
          </div>
        ))}
      </div>
      <div className="flex w-[34%] shrink-0 flex-col gap-1.5 p-2.5">
        <Overline>Next to automate</Overline>
        <Card>
          <p className="text-[8.5px] font-medium leading-[1.45]" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Address change after dispatch
          </p>
          <p className="mt-1 text-[8px] leading-[1.45]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Needs carrier lookup and a new limit agreed with your team.
          </p>
        </Card>
        <Card className="mt-auto">
          <Overline>Reviewed by</Overline>
          <p className="text-[8px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Support lead · Vahue
          </p>
        </Card>
      </div>
    </Shell>
  )
}

/** One mock per workflow step, used by the (client) showcase. The before/after list lives in Sections.tsx. */
export const STEP_MOCKS = [VoiceMock, ActionsMock, HandoffMock, ReviewMock, QueueMock]
