'use client'

import emailjs from '@emailjs/browser'
import DemoPage from '@/components/scale-clone/demo/DemoPage'
import { vahueContactContent } from './content'
import s from './contact.module.css'

type Values = Record<string, string | string[]>

const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v.join(', ') : (v ?? '')).trim()

/*
 * Sends through the same EmailJS service + template as the site's other contact form
 * (components/engineering/ContactContainer.tsx, used by components/main/ContactDynamic.tsx): NEXT_PUBLIC_EMAIL_SERVICE_ID,
 * NEXT_PUBLIC_EMAIL_TEMPLATE_ID, NEXT_PUBLIC_EMAIL_PUBLIC_KEY, and the same template variables
 * (name, email, company, headcount, message, "other info"). The extra /contact fields go into "other info".
 * A rejection keeps the form filled and shows the retry message (DemoForm handles pending/error/success).
 */
async function sendContact(values: Values) {
  const service = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID
  const template = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID
  const publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
  if (!service || !template || !publicKey) throw new Error('EmailJS configuration missing')

  const heard = str(values.heard_from) === 'Other' ? `Other: ${str(values.heard_from_other)}` : str(values.heard_from)
  const params = {
    name: `${str(values.firstname)} ${str(values.lastname)}`.trim(),
    email: str(values.email),
    company: str(values.company),
    headcount: str(values.company_size),
    message: str(values.message),
    'other info': [
      'Source: /contact',
      `Job title: ${str(values.jobtitle) || 'Not specified'}`,
      `Headcount: ${str(values.company_size) || 'Not specified'}`,
      `Interests: ${str(values.workflow) || 'Not specified'}`,
      `Heard about us: ${heard || 'Not specified'}`,
      `Consent to be contacted: ${values.consent === 'true' ? 'Yes' : 'No'}`,
      `Message: ${str(values.message) || 'No message'}`,
    ].join('\n'),
  }
  await emailjs.send(service, template, params, { publicKey })
}

export default function ContactPage() {
  return <DemoPage as="div" content={vahueContactContent} className={s.layout} onSubmit={sendContact} />
}
