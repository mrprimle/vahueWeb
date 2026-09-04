import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms governing use of the Vahue website.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal · Website"
      title="Terms of Use"
      intro="These terms govern access to vahue.ai. Any paid engagement with Vahue is governed by a separate written agreement."
    >
      <h2>1. About this website</h2>
      <p>
        This website is operated by Vahue. Contact us at <a href="mailto:human@vahue.ai">human@vahue.ai</a>. By using the website, you agree to these terms. If you do not agree, please do not use it.
      </p>

      <h2>2. Information, case studies, and results</h2>
      <p>
        Website content is provided for general information and does not constitute legal, financial, security, employment, or other professional advice. Case-study results describe particular engagements and may be based on project measurements or client-reported outcomes. They are not a promise or guarantee that another engagement will achieve the same result.
      </p>

      <h2>3. Enquiries and services</h2>
      <p>
        Sending an enquiry, submitting an application, joining a waitlist, or booking a call does not create a client, employment, partnership, or advisory relationship. Scope, fees, deliverables, ownership, confidentiality, warranties, and liability for services will be set out in a separate agreement signed by the relevant parties.
      </p>

      <h2>4. Acceptable use</h2>
      <p>You must not:</p>
      <ul>
        <li>use the website unlawfully, fraudulently, or to harm another person;</li>
        <li>attempt to gain unauthorised access to the website, infrastructure, forms, or stored files;</li>
        <li>introduce malware, overload the service, evade security controls, or interfere with normal operation;</li>
        <li>scrape or reproduce substantial parts of the website in violation of applicable law or our rights; or</li>
        <li>submit confidential, special-category, or regulated data through a general enquiry form unless Vahue has expressly agreed a secure route.</li>
      </ul>

      <h2>5. Intellectual property</h2>
      <p>
        Unless stated otherwise, Vahue or its licensors own the website, its design, text, graphics, code, and branding. You may view and share links to public pages for legitimate personal or business evaluation. No other licence is granted. Third-party names and marks remain the property of their respective owners and are used only to identify the relevant organisation or engagement.
      </p>

      <h2>6. Availability and third-party services</h2>
      <p>
        We may change, suspend, or withdraw website content without notice. We do not guarantee uninterrupted or error-free availability. Links to third-party sites such as Calendly, LinkedIn, or Clutch are provided for convenience; their content and services are governed by their own terms.
      </p>

      <h2>7. Liability</h2>
      <p>
        To the fullest extent permitted by law, Vahue excludes implied warranties relating to this free public website and is not liable for indirect or consequential loss arising from reliance on its content or temporary unavailability. Nothing in these terms excludes liability that cannot lawfully be excluded, including liability for fraud or fraudulent misrepresentation, or death or personal injury caused by negligence.
      </p>

      <h2>8. Privacy</h2>
      <p>
        Our <a href="/privacy-policy">Privacy Policy</a> explains how we handle personal data, and our <a href="/cookie-policy">Cookie Policy</a> explains the technologies used on the website.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These website terms are governed by the laws of England and Wales. The courts of England and Wales have non-exclusive jurisdiction, except where mandatory consumer law gives you the right to bring a claim elsewhere.
      </p>

      <h2>10. Changes and contact</h2>
      <p>
        We may update these terms from time to time. Continued use after an update means the current terms apply. Questions can be sent to <a href="mailto:human@vahue.ai">human@vahue.ai</a>.
      </p>
    </LegalPage>
  )
}
