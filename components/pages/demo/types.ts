export type RichPart = string | { text: string; href: string }

export type FieldType = 'text' | 'email' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'booleancheckbox'

export type FieldOption = { value: string; label: string }

export type FormField = {
  name: string
  fieldType: FieldType
  label?: string
  description?: string
  placeholder?: string
  /** First, disabled option of a select. */
  unselectedLabel?: string
  required?: boolean
  autoComplete?: string
  hidden?: boolean
  options?: FieldOption[]
  dependents?: { when: string[]; field: FormField }[]
}

export type FormGroup = { columns: number; fields: FormField[] }

export type DemoLogo = { alt: string; src?: string; displayWidth: number; displayHeight: number }

export type DemoContent = {
  meta: { title: string; description: string }
  heading: string
  intro: string
  form: {
    groups: FormGroup[]
    submitText: string
    /** Button text while the message is on its way. */
    sendingText: string
    submittedMessage: string
    legal: RichPart[]
    consent: RichPart[]
    /** Domains refused by the work email check, with `{{ domain }}` in `errors.blockedEmail`. */
    blockedEmailDomains: string[]
    errors: {
      required: string
      emailFormat: string
      blockedEmail: string
      rollupRequired: string
      rollupBlocked: string
      /** Shown when the message could not be sent. The form keeps its values. */
      sendFailed: RichPart[]
    }
  }
  sidebar: {
    quote: string
    name: string
    position: string
    trustedBy: string
    logos: DemoLogo[]
  }
}
