import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Vahue collects, uses, shares, and protects personal data.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Privacy"
      title="Privacy Policy"
      intro="This notice explains how Vahue handles personal data when you visit vahue.ai, contact us, book a call, join a waitlist, or apply for a role."
    >
      <h2>1. Who is responsible for your data</h2>
      <p>
        Vahue is the controller of personal data described in this notice. You can contact us at <a href="mailto:human@vahue.ai">human@vahue.ai</a> with privacy questions or requests.
      </p>

      <h2>2. Data we collect</h2>
      <ul>
        <li><strong>Enquiry data:</strong> name, email, company, headcount, areas of interest, and the message you send.</li>
        <li><strong>Recruitment data:</strong> name, email, phone number, portfolio or LinkedIn URL, CV, application message, and related correspondence.</li>
        <li><strong>Event or waitlist data:</strong> the contact and preference information you choose to provide.</li>
        <li><strong>Technical data:</strong> security signals, request and error logs, device/browser information, referring page, and aggregated website usage data.</li>
        <li><strong>Scheduling data:</strong> information you provide to Calendly after following a booking link. Calendly also processes that information under its own privacy notice.</li>
      </ul>

      <h2>3. Why we use personal data</h2>
      <ul>
        <li>To respond to enquiries, prepare proposals, and take steps requested before entering a contract.</li>
        <li>To deliver and administer services under a contract.</li>
        <li>To review applications, communicate with candidates, and manage recruitment.</li>
        <li>To secure, operate, troubleshoot, and improve the website and our business systems.</li>
        <li>To send marketing or event updates where you have consented, with an unsubscribe option in every relevant message.</li>
        <li>To meet legal, accounting, fraud-prevention, and regulatory obligations.</li>
      </ul>
      <p>
        Depending on the context, our lawful basis is taking steps at your request before a contract, performing a contract, our legitimate interests in running and securing Vahue, your consent, or compliance with a legal obligation. We do not use consent where another lawful basis is more appropriate.
      </p>

      <h2>4. Who receives personal data</h2>
      <p>We use service providers only where needed to run the website and communicate with you. These currently include:</p>
      <ul>
        <li>Vercel for hosting, privacy-focused web analytics, security checks, and private CV storage.</li>
        <li>EmailJS for transmitting website forms to Vahue.</li>
        <li>Calendly when you choose to book a call.</li>
        <li>Professional advisers, authorities, or counterparties where required by law or a legitimate corporate transaction.</li>
      </ul>
      <p>We do not sell personal data.</p>

      <h2>5. International transfers</h2>
      <p>
        Some providers may process data outside the United Kingdom. Where UK data protection law requires it, we rely on an adequacy regulation or approved contractual safeguards and take proportionate steps to assess the transfer.
      </p>

      <h2>6. Retention</h2>
      <p>
        We keep enquiry and business correspondence only for as long as it is useful for the relationship and our legal records, normally no longer than 24 months after the last meaningful contact unless a contract or law requires longer. Unsuccessful applicant data is normally kept for up to 12 months unless you ask us to delete it sooner or consent to a longer talent-pool period. Private CV access links expire after seven days; the link expiry is separate from the underlying retention period. Provider security and analytics records follow the relevant provider retention settings.
      </p>

      <h2>7. Your rights</h2>
      <p>
        Subject to applicable law, you may ask for access, correction, deletion, restriction, portability, or object to certain processing. You can withdraw consent at any time without affecting earlier lawful processing. Email <a href="mailto:human@vahue.ai">human@vahue.ai</a>; we may need to verify your identity before acting on a request.
      </p>
      <p>
        You may also complain to the UK Information Commissioner’s Office at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noreferrer">ico.org.uk</a>.
      </p>

      <h2>8. Security and automated decisions</h2>
      <p>
        We use access controls, private file links, limited retention, bot protection, and other proportionate safeguards. No internet service can guarantee absolute security. Vahue does not make solely automated decisions through this website that produce legal or similarly significant effects for visitors or applicants.
      </p>

      <h2>9. Changes</h2>
      <p>We may update this notice when our services, providers, or legal obligations change. The date above identifies the current version.</p>
    </LegalPage>
  )
}
