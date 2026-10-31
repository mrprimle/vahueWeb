'use client'

import { useCallback, useMemo, useRef, useState, type FocusEvent, type FormEvent } from 'react'
import type { ChoiceField, ConsentField, DemoFormContent, FormField, SelectField, TextField } from './content'
import SubmitCta from './SubmitCta'
import s from './demo.module.css'

/*
 * Client-side re-implementation of scale.com/demo's StaticForm (module 721992) + HubSpot v2 embed (live validation on),
 * with HubSpot's markup and class names so the ported CSS lines up. Nothing is sent anywhere: a valid submit calls
 * `onSubmit` (no-op by default) and swaps the form for the inline thank-you message, as Scale does with
 * enableThankYou=false (the Submit button is removed, the wrapper loses its min-height, no scroll).
 *
 * Validation (HubSpot behaviour observed on scale.com):
 *   - blur of a required, empty field -> "Please complete this required field." (selects: dropdown message)
 *   - email -> format check, then the free-mail block list, on blur
 *   - once a field shows an error it re-validates on every change (live validation)
 *   - Submit validates every visible field; the error rollup stays hidden (Scale's CSS)
 *   - dependent fields (showWhen) mount/unmount with their parent's value; hidden values are kept but not submitted
 * If `onSubmit` returns a promise (a real send, e.g. Vahue's /contact), Submit is disabled while it is pending; the
 * thank-you state only appears once it resolves, and a rejection shows `submitErrorHtml` with the form still filled.
 */

type Values = Record<string, string | string[]>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const isVisible = (f: FormField, values: Values) => {
  if (!f.showWhen) return true
  const v = values[f.showWhen.field]
  return typeof v === 'string' && f.showWhen.values.includes(v)
}

export default function DemoForm({
  form,
  formId = 'demo',
  onSubmit,
}: {
  form: DemoFormContent
  /** Used in input ids (HubSpot uses `<name>-<formId>`). */
  formId?: string
  onSubmit?: (values: Values) => void | Promise<unknown>
}) {
  const [values, setValues] = useState<Values>({})
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [submitted, setSubmitted] = useState(false)
  const [pending, setPending] = useState(false)
  const [sendFailed, setSendFailed] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const fields = useMemo(() => form.rows.flatMap((r) => r.fields), [form.rows])
  const byName = useMemo(() => new Map(fields.map((f) => [f.name, f])), [fields])
  const m = form.messages

  const validate = useCallback(
    (f: FormField, v: string | string[] | undefined): string | undefined => {
      const empty = v == null || (Array.isArray(v) ? v.length === 0 : v.trim() === '')
      if (f.required && empty) {
        if (f.kind === 'select') return m.requiredSelect
        if (f.kind === 'checkbox' || f.kind === 'radio') return m.requiredChoice
        return m.required
      }
      if (f.kind === 'email' && !empty && typeof v === 'string') {
        const val = v.trim()
        if (!EMAIL_RE.test(val)) return m.email
        const domain = val.split('@')[1]?.toLowerCase()
        if (domain && form.blockedEmailDomains?.includes(domain)) return m.blockedEmail.replace('{domain}', domain)
      }
      return undefined
    },
    [form.blockedEmailDomains, m],
  )

  const setValue = (name: string, v: string | string[]) => {
    // HubSpot keeps the values of dependents that get hidden (they come back filled); only visible fields are submitted
    setValues((prev) => ({ ...prev, [name]: v }))
    setErrors((prev) => {
      const next = { ...prev }
      const f = byName.get(name)
      // a key in `errors` marks the field as touched (blurred once): from then on it validates live
      if (f && name in prev) next[name] = validate(f, v)
      for (const d of fields) if (d.showWhen?.field === name) delete next[d.name]
      return next
    })
  }

  const onBlur = (f: FormField) => (e: FocusEvent<HTMLElement>) => {
    // group inputs: only validate when focus leaves the whole group
    if ((f.kind === 'checkbox' || f.kind === 'radio') && e.currentTarget.contains(e.relatedTarget as Node | null)) return
    if (f.kind === 'consent') return
    setErrors((prev) => ({ ...prev, [f.name]: validate(f, values[f.name]) }))
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (pending) return
    const next: Record<string, string | undefined> = {}
    let ok = true
    for (const f of fields) {
      if (!isVisible(f, values)) continue
      const err = validate(f, values[f.name])
      next[f.name] = err
      if (err) ok = false
    }
    setErrors(next)
    if (!ok) return
    const visible = Object.entries(values).filter(([k]) => {
      const f = byName.get(k)
      return !!f && isVisible(f, values)
    })
    const result = onSubmit?.(Object.fromEntries(visible))
    if (result && typeof (result as Promise<unknown>).then === 'function') {
      setPending(true)
      setSendFailed(false)
      try {
        await result
      } catch {
        setSendFailed(true)
        setPending(false)
        return
      }
      setPending(false)
    }
    setSubmitted(true)
  }

  if (submitted)
    return (
      <div className={`${s.wrapper} form__wrapper form__submitted`}>
        <div className={`submitted-message ${s.submitted}`} role="status" dangerouslySetInnerHTML={{ __html: form.successHtml }} />
      </div>
    )

  const id = (name: string) => `${name}-${formId}`

  const errorList = (name: string) =>
    errors[name] ? (
      <ul className="no-list hs-error-msgs inputs-list" role="alert">
        <li>
          <label className="hs-error-msg" htmlFor={id(name)}>
            {errors[name]}
          </label>
        </li>
      </ul>
    ) : null

  const fieldClass = (f: FormField) => {
    const type = f.kind === 'email' ? 'text' : f.kind === 'consent' ? 'booleancheckbox' : f.kind
    return `hs_${f.name} hs-${f.name} hs-fieldtype-${type} field hs-form-field`
  }

  const renderText = (f: TextField) => {
    const v = (values[f.name] as string) ?? ''
    const invalid = errors[f.name] ? ' invalid error' : ''
    const common = {
      id: id(f.name),
      name: f.name,
      required: f.required,
      placeholder: f.placeholder,
      value: v,
      'aria-invalid': !!errors[f.name] || undefined,
      'aria-label': f.label ? undefined : f.placeholder?.replace(/\*$/, ''),
      onBlur: onBlur(f),
    }
    return (
      <div key={f.name} className={fieldClass(f)}>
        {f.label ? (
          <label htmlFor={id(f.name)}>
            <span>{f.label}</span>
            {f.required ? <span className="hs-form-required">*</span> : null}
          </label>
        ) : null}
        {f.description ? <legend className="hs-field-desc">{f.description}</legend> : null}
        <div className="input">
          {f.kind === 'textarea' ? (
            <textarea {...common} className={`hs-input${invalid}`} onChange={(e) => setValue(f.name, e.target.value)} />
          ) : (
            <input
              {...common}
              type={f.kind === 'email' ? 'email' : 'text'}
              inputMode={f.kind === 'email' ? 'email' : 'text'}
              autoComplete={f.autoComplete}
              className={`hs-input${invalid}`}
              onChange={(e) => setValue(f.name, e.target.value)}
            />
          )}
        </div>
        {errorList(f.name)}
      </div>
    )
  }

  const renderSelect = (f: SelectField) => {
    const v = (values[f.name] as string) ?? ''
    return (
      <div key={f.name} className={fieldClass(f)}>
        <div className="input">
          <select
            id={id(f.name)}
            name={f.name}
            required={f.required}
            value={v}
            aria-label={f.placeholder.replace(/\*$/, '')}
            aria-invalid={!!errors[f.name] || undefined}
            className={`hs-input${v ? '' : ' is-placeholder'}${errors[f.name] ? ' invalid error' : ''}`}
            onChange={(e) => setValue(f.name, e.target.value)}
            onBlur={onBlur(f)}
          >
            <option value="" disabled>
              {f.placeholder}
            </option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        {errorList(f.name)}
      </div>
    )
  }

  const renderChoice = (f: ChoiceField) => {
    const multi = f.kind === 'checkbox'
    const cur = values[f.name]
    const list = Array.isArray(cur) ? cur : []
    return (
      <div key={f.name} className={fieldClass(f)} onBlur={onBlur(f)} role="group" aria-labelledby={`label-${id(f.name)}`}>
        <label id={`label-${id(f.name)}`}>
          <span>{f.label}</span>
          {f.required && !f.hideRequiredMark ? <span className="hs-form-required">*</span> : null}
        </label>
        <div className="input">
          <ul role={multi ? 'checkbox' : 'radio'} className="inputs-list multi-container">
            {f.options.map((o, i) => (
              <li key={o.value} className={multi ? 'hs-form-checkbox' : 'hs-form-radio'}>
                <label htmlFor={`${f.name}${i}-${formId}`} className={multi ? 'hs-form-checkbox-display' : 'hs-form-radio-display'}>
                  <input
                    id={`${f.name}${i}-${formId}`}
                    className="hs-input"
                    type={multi ? 'checkbox' : 'radio'}
                    name={f.name}
                    value={o.value}
                    checked={multi ? list.includes(o.value) : cur === o.value}
                    onChange={(e) =>
                      setValue(
                        f.name,
                        multi ? (e.target.checked ? [...list, o.value] : list.filter((x) => x !== o.value)) : o.value,
                      )
                    }
                  />
                  <span>{o.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        {errorList(f.name)}
      </div>
    )
  }

  const renderConsent = (f: ConsentField) => (
    <div key={f.name} className={fieldClass(f)}>
      <div className="input">
        <ul className="inputs-list">
          <li className="hs-form-booleancheckbox">
            <label htmlFor={id(f.name)} className="hs-form-booleancheckbox-display">
              <input
                id={id(f.name)}
                className="hs-input"
                type="checkbox"
                name={f.name}
                value="true"
                checked={values[f.name] === 'true'}
                onChange={(e) => setValue(f.name, e.target.checked ? 'true' : '')}
              />
              <span dangerouslySetInnerHTML={{ __html: f.labelHtml }} />
            </label>
          </li>
        </ul>
      </div>
      {errorList(f.name)}
    </div>
  )

  const render = (f: FormField) => {
    if (!isVisible(f, values)) return null
    switch (f.kind) {
      case 'select':
        return renderSelect(f)
      case 'checkbox':
      case 'radio':
        return renderChoice(f)
      case 'consent':
        return renderConsent(f)
      default:
        return renderText(f)
    }
  }

  return (
    <form ref={formRef} noValidate onSubmit={submit} className={`${s.wrapper} form__wrapper form__wrapper__light`}>
      <div className={`hs-form stacked ${s.form}`}>
        {form.rows.map((row, i) => {
          const [first, ...rest] = row.fields
          // HubSpot wraps a field that has dependents (and the dependents) in .hs-dependent-field
          const hasDependents = rest.some((f) => f.showWhen?.field === first.name)
          return (
            <fieldset key={i} className={`form-columns-${row.columns}`}>
              {hasDependents ? <div className="hs-dependent-field">{row.fields.map(render)}</div> : row.fields.map(render)}
            </fieldset>
          )
        })}
        {form.legalHtml ? (
          <fieldset className="form-columns-1">
            <div className="legal-consent-container">
              <div className="hs-richtext" dangerouslySetInnerHTML={{ __html: form.legalHtml }} />
            </div>
          </fieldset>
        ) : null}
      </div>
      <SubmitCta label={form.submitLabel} busy={pending} />
      {sendFailed && form.submitErrorHtml ? (
        <div className={s.sendError} role="alert" dangerouslySetInnerHTML={{ __html: form.submitErrorHtml }} />
      ) : null}
    </form>
  )
}
