'use client'

// Scale's StaticForm (module 721992) plus the behaviour of the HubSpot embed it mounts (js.hsforms.net/forms/embed/v2.js, form 0babf6e5).
// The markup, class names and validation timing follow HubSpot's so Scale's CSS module applies unchanged. No HubSpot script is loaded: a valid form goes to human@vahue.ai through EmailJS.
import Link from 'next/link'
import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/components/site/lib/cn'
import { FlatCta } from '@/components/site/shared/FlatCta'
import type { DemoContent, FormField, RichPart } from './types'
import './DemoForm.css'

const FORM_ID = 'vahue-demo'
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // HubSpot's own expression
/** HubSpot's `staleTimeout`: while typing, validation runs after 1s without input. */
const STALE_MS = 1000

type Values = Record<string, string | string[] | boolean>
type ErrorKey = 'required' | 'emailFormat' | 'blockedEmail'

const isEmpty = (v: Values[string] | undefined) => v == null || v === '' || v === false || (Array.isArray(v) && v.length === 0)

const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send'
const SEND_TIMEOUT_MS = 15000
/** Fields with their own variable in the EmailJS template; everything else on screen goes into "other info". */
const OWN_VARIABLE = new Set(['firstname', 'lastname', 'email', 'company', 'message', 'partnership_message'])

const text = (v: Values[string] | undefined) => (Array.isArray(v) ? v.join(', ') : String(v ?? '')).trim()

/** The line for one answer: the label the visitor read, with option values turned back into their labels. */
function describe(f: FormField, v: Values[string]) {
  const name = f.label || f.placeholder || f.unselectedLabel || (f.fieldType === 'booleancheckbox' ? 'Marketing consent' : f.name)
  const answer = typeof v === 'boolean' ? (v ? 'Yes' : 'No') : (Array.isArray(v) ? v : [v]).map((x) => f.options?.find((o) => o.value === x)?.label ?? x).join(', ')
  return `${name}: ${answer}`
}

/**
 * The old site's /contact sender, with the same EmailJS service, template and variables. It posts to EmailJS's REST API, which is what
 * `@emailjs/browser` calls, so the site needs no extra package. It throws on missing configuration, a network failure, a timeout or a non-2xx.
 */
async function sendToVahue(values: Values, onScreen: FormField[]) {
  const service = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID
  const template = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID
  const publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
  if (!service || !template || !publicKey) throw new Error('EmailJS configuration missing')
  const res = await fetch(EMAILJS_SEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    body: JSON.stringify({
      service_id: service,
      template_id: template,
      user_id: publicKey,
      template_params: {
        // Recipient for a template that uses {{to_email}}; the template's own "To" field wins otherwise.
        to_email: 'human@vahue.ai',
        name: `${text(values.firstname)} ${text(values.lastname)}`.trim(),
        email: text(values.email),
        company: text(values.company),
        headcount: 'Not specified', // The template has this variable; the /demo form doesn't ask for it.
        message: text(values.message) || text(values.partnership_message),
        'other info': ['Source: /demo', ...onScreen.filter((f) => !OWN_VARIABLE.has(f.name) && !isEmpty(values[f.name])).map((f) => describe(f, values[f.name]))].join('\n'),
      },
    }),
  })
  if (!res.ok) throw new Error(`EmailJS answered ${res.status}`)
}

function Rich({ parts }: { parts: RichPart[] }) {
  return (
    <>
      {parts.map((p, i) =>
        typeof p === 'string' ? (
          p
        ) : (
          <strong key={i}>
            <Link href={p.href}>{p.text}</Link>
          </strong>
        ),
      )}
    </>
  )
}

/** The fields on screen for these values, in document order. */
function visibleFields(fields: FormField[], values: Values): FormField[] {
  return fields.flatMap((f) => [
    f,
    ...visibleFields(
      (f.dependents ?? []).filter((d) => typeof values[f.name] === 'string' && d.when.includes(values[f.name] as string)).map((d) => d.field),
      values,
    ),
  ])
}

export function DemoForm({ form }: { form: DemoContent['form'] }) {
  const [values, setValues] = useState<Values>({})
  const [errors, setErrors] = useState<Record<string, ErrorKey | null>>({})
  /** HubSpot's `updating` state and its focus rule: the error stays stored but is not drawn. */
  const [muted, setMuted] = useState<Record<string, boolean>>({})
  const [attempted, setAttempted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendFailed, setSendFailed] = useState(false)
  const wrapper = useRef<HTMLDivElement>(null)
  const timers = useRef<Record<string, number>>({})

  useEffect(() => {
    const t = timers.current
    return () => Object.values(t).forEach((id) => window.clearTimeout(id))
  }, [])

  const blocked = useMemo(() => new Set(form.blockedEmailDomains), [form.blockedEmailDomains])

  const validate = useCallback(
    (f: FormField, v: Values[string] | undefined): ErrorKey | null => {
      if (f.required && isEmpty(v)) return 'required'
      if (f.fieldType === 'email' && !isEmpty(v)) {
        const s = String(v)
        if (!EMAIL.test(s)) return 'emailFormat'
        if (blocked.has(s.split('@')[1].toLowerCase())) return 'blockedEmail'
      }
      return null
    },
    [blocked],
  )

  const show = useCallback(
    (f: FormField, v: Values[string] | undefined) => {
      window.clearTimeout(timers.current[f.name])
      setErrors((e) => ({ ...e, [f.name]: validate(f, v) }))
      setMuted((m) => ({ ...m, [f.name]: false }))
    },
    [validate],
  )

  /** Text inputs: the error goes away on the first keystroke and comes back after the stale timeout or on blur. */
  const changeText = (f: FormField, v: string) => {
    setValues((s) => ({ ...s, [f.name]: v }))
    setMuted((m) => ({ ...m, [f.name]: true }))
    if (attempted) setErrors((e) => ({ ...e, [f.name]: validate(f, v) }))
    window.clearTimeout(timers.current[f.name])
    timers.current[f.name] = window.setTimeout(() => show(f, v), STALE_MS)
  }
  const focusText = (f: FormField) => {
    if (isEmpty(values[f.name])) setMuted((m) => ({ ...m, [f.name]: true }))
  }
  /** Selects, radios and checkboxes validate on change and on blur, and keep their error on focus. */
  const choose = (f: FormField, v: Values[string]) => {
    setValues((s) => ({ ...s, [f.name]: v }))
    show(f, v)
  }

  const allFields = useMemo(() => form.groups.flatMap((g) => g.fields), [form.groups])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    const onScreen = visibleFields(allFields, values).filter((f) => !f.hidden)
    const next: Record<string, ErrorKey | null> = {}
    for (const f of onScreen) next[f.name] = validate(f, values[f.name])
    Object.values(timers.current).forEach((id) => window.clearTimeout(id))
    setErrors(next)
    setMuted({})
    setAttempted(true)
    if (Object.values(next).some(Boolean)) return
    setSending(true)
    setSendFailed(false)
    try {
      await sendToVahue(values, onScreen)
      setSubmitted(true)
    } catch {
      // The form keeps what the visitor typed, so they can try again or use the address in the message.
      setSendFailed(true)
    } finally {
      setSending(false)
    }
  }

  const onScreenNow = visibleFields(allFields, values)
  const stored = onScreenNow.map((f) => errors[f.name]).filter(Boolean)
  const rollup = !attempted ? '' : stored.includes('required') ? form.errors.rollupRequired : stored.includes('blockedEmail') ? form.errors.rollupBlocked : ''

  const message = (f: FormField): string | null => {
    const k = errors[f.name]
    if (!k || muted[f.name]) return null
    if (k === 'blockedEmail') return form.errors.blockedEmail.replace('{{ domain }}', String(values[f.name]).split('@')[1]?.toLowerCase() ?? '')
    return form.errors[k]
  }

  const renderField = (f: FormField): ReactNode => {
    const id = `${f.name}-${FORM_ID}`
    const msg = message(f)
    const errCls = msg ? ' invalid error' : ''
    const fieldCls = `hs_${f.name} hs-${f.name} hs-fieldtype-${f.fieldType === 'email' ? 'text' : f.fieldType} field hs-form-field`
    const errorList = msg ? (
      <ul className="no-list hs-error-msgs inputs-list" role="alert">
        <li>
          <label className="hs-error-msg hs-main-font-element">{msg}</label>
        </li>
      </ul>
    ) : null
    const label = (
      <label id={`label-${id}`} className="" htmlFor={f.fieldType === 'radio' ? undefined : id}>
        <span>{f.label}</span>
        {f.label && f.required ? <span className="hs-form-required">*</span> : null}
      </label>
    )
    const ph = f.placeholder ? `${f.placeholder}${f.required ? '*' : ''}` : ''

    if (f.hidden) {
      return (
        <div className={fieldCls} style={{ display: 'none' }}>
          <label id={`label-${id}`} className="" htmlFor={id}>
            <span>{f.label}</span>
          </label>
          <div className="input">
            <input id={id} name={f.name} className="hs-input" type="hidden" value="" />
          </div>
        </div>
      )
    }

    if (f.fieldType === 'text' || f.fieldType === 'email') {
      return (
        <div className={fieldCls}>
          {label}
          <div className="input">
            <input
              id={id}
              name={f.name}
              required={f.required}
              placeholder={ph}
              type={f.fieldType}
              className={`hs-input${errCls}`}
              inputMode={f.fieldType === 'email' ? 'email' : 'text'}
              autoComplete={f.autoComplete}
              value={String(values[f.name] ?? '')}
              onFocus={() => focusText(f)}
              onChange={(e) => changeText(f, e.target.value)}
              onBlur={(e) => show(f, e.target.value)}
            />
          </div>
          {errorList}
        </div>
      )
    }
    if (f.fieldType === 'textarea') {
      return (
        <div className={fieldCls}>
          {label}
          {f.description ? <legend className="hs-field-desc">{f.description}</legend> : null}
          <div className="input">
            <textarea
              id={id}
              name={f.name}
              className={`hs-input hs-fieldtype-textarea${errCls}`}
              placeholder={ph}
              value={String(values[f.name] ?? '')}
              onFocus={() => focusText(f)}
              onChange={(e) => changeText(f, e.target.value)}
              onBlur={(e) => show(f, e.target.value)}
            />
          </div>
          {errorList}
        </div>
      )
    }
    if (f.fieldType === 'select') {
      const v = String(values[f.name] ?? '')
      return (
        <div className={fieldCls}>
          {label}
          <div className="input">
            <select
              id={id}
              required={f.required}
              className={cn(`hs-input${errCls}`, !v && 'is-placeholder')}
              name={f.name}
              value={v}
              onChange={(e) => choose(f, e.target.value)}
              onBlur={(e) => show(f, e.target.value)}
            >
              <option disabled value="">
                {`${f.unselectedLabel ?? ''}${f.required ? '*' : ''}`}
              </option>
              {f.options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          {errorList}
        </div>
      )
    }
    if (f.fieldType === 'radio') {
      return (
        <div className={fieldCls}>
          {label}
          <div className="input">
            <ul role="checkbox" className="inputs-list multi-container">
              {f.options?.map((o, i) => (
                <li key={o.value} className="hs-form-radio" role="radio">
                  <label htmlFor={`${f.name}${i}-${FORM_ID}`} className="hs-form-radio-display">
                    <input
                      id={`${f.name}${i}-${FORM_ID}`}
                      className="hs-input"
                      type="radio"
                      name={f.name}
                      value={o.value}
                      checked={values[f.name] === o.value}
                      onChange={() => choose(f, o.value)}
                      onBlur={() => show(f, values[f.name])}
                    />
                    <span>{o.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          {errorList}
        </div>
      )
    }
    if (f.fieldType === 'checkbox') {
      const picked = (values[f.name] as string[] | undefined) ?? []
      return (
        <div className={fieldCls}>
          {label}
          <div className="input">
            <ul role="checkbox" className="inputs-list multi-container">
              {f.options?.map((o, i) => (
                <li key={o.value} className="hs-form-checkbox" role="checkbox">
                  <label htmlFor={`${f.name}${i}-${FORM_ID}`} className="hs-form-checkbox-display">
                    <input
                      id={`${f.name}${i}-${FORM_ID}`}
                      className="hs-input"
                      type="checkbox"
                      name={f.name}
                      value={o.value}
                      checked={picked.includes(o.value)}
                      onChange={(e) => choose(f, e.target.checked ? [...picked, o.value] : picked.filter((x) => x !== o.value))}
                      onBlur={() => show(f, values[f.name])}
                    />
                    <span>{o.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          {errorList}
        </div>
      )
    }
    // booleancheckbox: the consent line. Optional, so it never shows an error.
    return (
      <div className={fieldCls}>
        <div className="input">
          <ul className="inputs-list">
            <li className="hs-form-booleancheckbox">
              <label htmlFor={id} className="hs-form-booleancheckbox-display">
                <input
                  id={id}
                  className="hs-input"
                  type="checkbox"
                  name={f.name}
                  value="true"
                  checked={values[f.name] === true}
                  onChange={(e) => setValues((s) => ({ ...s, [f.name]: e.target.checked }))}
                />
                <span>
                  <Rich parts={form.consent} />
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  const wrapperCls = cn('relative flex flex-col justify-between', 'demo-form__wrapper', 'demo-form__wrapper--light', submitted && 'demo-form__submitted')

  return (
    <div ref={wrapper} className={wrapperCls}>
      <div id={`hs-form-${FORM_ID}`}>
        {submitted ? (
          <div className="submitted-message hs-main-font-element">
            <p>{form.submittedMessage}</p>
          </div>
        ) : (
          <form id={`hsForm_${FORM_ID}`} method="POST" noValidate className="hs-form stacked" onSubmit={onSubmit} data-form-id={FORM_ID}>
            {form.groups.map((g, gi) => (
              <fieldset key={gi} className={`form-columns-${g.columns}`}>
                {g.fields.map((f) =>
                  f.dependents?.length ? (
                    <div key={f.name} className="hs-dependent-field">
                      {visibleFields([f], values).map((x) => (
                        <Fragment key={x.name}>{renderField(x)}</Fragment>
                      ))}
                    </div>
                  ) : (
                    <Fragment key={f.name}>{renderField(f)}</Fragment>
                  ),
                )}
              </fieldset>
            ))}
            <fieldset className="form-columns-1">
              <div className="legal-consent-container">
                <div className="hs-richtext">
                  <p>
                    <Rich parts={form.legal} />
                  </p>
                </div>
              </div>
            </fieldset>
            {rollup ? (
              <div className="hs_error_rollup">
                <ul className="no-list hs-error-msgs inputs-list" style={{ display: 'block' }}>
                  <li>
                    <label className="hs-main-font-element">{rollup}</label>
                  </li>
                </ul>
              </div>
            ) : null}
            {sendFailed ? (
              <div className="hs_error_rollup" role="alert">
                <ul className="no-list hs-error-msgs inputs-list" style={{ display: 'block' }}>
                  <li>
                    <label className="hs-main-font-element">
                      <Rich parts={form.errors.sendFailed} />
                    </label>
                  </li>
                </ul>
              </div>
            ) : null}
            <div className="hs_submit hs-submit">
              <div className="hs-field-desc" style={{ display: 'none' }} />
              <div className="actions">
                <input type="submit" className="hidden" value={form.submitText} />
              </div>
            </div>
          </form>
        )}
      </div>
      {submitted ? null : (
        <FlatCta
          as="button"
          type="button"
          variant="arrow"
          theme="black"
          text={sending ? form.sendingText : form.submitText}
          disabled={sending}
          onClick={() => {
            wrapper.current?.querySelector<HTMLInputElement>('div.hs-submit input[type="submit"]')?.click()
          }}
        />
      )}
    </div>
  )
}
