import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookies and similar technologies used on the Vahue website.',
  alternates: { canonical: '/cookie-policy' },
}

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Technology"
      title="Cookie Policy"
      intro="This policy explains the cookies and similar technologies used on vahue.ai and what happens when you follow a link to another service."
    >
      <h2>1. What cookies are</h2>
      <p>
        Cookies are small text files stored on a device. Websites may also use local storage, request identifiers, and similar technologies for security, functionality, preferences, and analytics.
      </p>

      <h2>2. Technologies currently used by Vahue</h2>
      <h3>Essential operation and security</h3>
      <p>
        Our hosting and security providers process technical requests so pages load, forms work, and automated abuse can be detected. These technologies are used only where necessary to provide or protect the service and cannot be disabled through a Vahue preference panel.
      </p>

      <h3>Privacy-focused analytics</h3>
      <p>
        We use Vercel Web Analytics to understand aggregate page views, referrers, countries, browsers, and operating systems. Vercel states that this product does not use cookies, stores anonymised data, and resets its visitor hash after 24 hours. We do not use it to reconstruct an individual browsing history across websites.
      </p>

      <h3>Third-party links</h3>
      <p>
        Calendly, LinkedIn, Clutch, and other websites may set their own cookies after you follow a link. Vahue does not control those technologies; review the privacy and cookie information on the relevant third-party site.
      </p>

      <h2>3. Non-essential cookies</h2>
      <p>
        Vahue does not currently set advertising or cross-site tracking cookies through this website. If we introduce non-essential cookies, we will update this policy and provide a consent choice before setting them where required by law.
      </p>

      <h2>4. Browser controls</h2>
      <p>
        You can block or delete cookies in your browser settings. Blocking essential storage or scripts may stop some forms or security features from working correctly. Because Vercel Web Analytics is cookieless, deleting browser cookies does not opt out of the anonymous aggregate page-view request itself.
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions about this policy can be sent to <a href="mailto:human@vahue.ai">human@vahue.ai</a>.
      </p>
    </LegalPage>
  )
}
