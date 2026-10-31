import Link from 'next/link'
import { clonePath } from './pages'
import s from './footer/footer.module.css'

// scale.com footer: black, five link columns (mono uppercase headings, 14px/600 capitalised links),
// a 116px closing statement, then socials + legal row. See reference-snapshots/scale-clone/shared-chrome.md.
type FooterLink = { label: string; href: string }

const page = (slug: string, label: string): FooterLink => ({ label, href: clonePath(slug) })
const dead = (label: string): FooterLink => ({ label, href: '#' })

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Products',
    links: [page('data-engine', 'Scale data engine'), page('genai-portfolio', 'Scale GenAI Portfolio'), page('donovan', 'Scale Donovan')],
  },
  {
    title: 'Solutions',
    links: [
      page('enterprise', 'Enterprise'),
      page('enterprise-insurance', 'Insurance'),
      page('enterprise-healthcare', 'Healthcare'),
      page('public-sector-national-security', 'National Security'),
      page('public-sector', 'US Public Sector'),
      page('global-public-sector', 'Global Public Sector'),
    ],
  },
  {
    title: 'Company',
    links: [
      page('about', 'About'),
      page('careers', 'Careers'),
      page('security', 'Security'),
      dead('Terms'),
      dead('Privacy'),
      dead('Accessibility Statement'),
    ],
  },
  {
    title: 'Resources',
    links: [
      page('blog', 'Blog'),
      page('demo', 'Contact Us'),
      page('events', 'Events'),
      page('partnership', 'Partnerships'),
      dead('Data Partnerships'),
      page('docs', 'Documentation'),
      dead('Brand Guidelines'),
    ],
  },
  {
    // TODO: Vahue copy — guide titles (Scale lists six evergreen guides here).
    title: 'Guides',
    links: [
      dead('Jobs To Be Done'),
      dead('Market Research'),
      dead('Value Proposition'),
      dead('Guide to product discovery'),
      dead('Customer Interview Techniques'),
      dead('Go-To-Market Planning'),
    ],
  },
]

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" className="block h-full w-full">
      <path
        fill="white"
        d="M14.8156 0H1.18125C0.528125 0 0 0.515625 0 1.15313V14.8438C0 15.4813 0.528125 16 1.18125 16H14.8156C15.4688 16 16 15.4813 16 14.8469V1.15313C16 0.515625 15.4688 0 14.8156 0ZM4.74687 13.6344H2.37188V5.99687H4.74687V13.6344ZM3.55938 4.95625C2.79688 4.95625 2.18125 4.34062 2.18125 3.58125C2.18125 2.82188 2.79688 2.20625 3.55938 2.20625C4.31875 2.20625 4.93437 2.82188 4.93437 3.58125C4.93437 4.3375 4.31875 4.95625 3.55938 4.95625ZM13.6344 13.6344H11.2625V9.92188C11.2625 9.0375 11.2469 7.89687 10.0281 7.89687C8.79375 7.89687 8.60625 8.8625 8.60625 9.85938V13.6344H6.2375V5.99687H8.5125V7.04063H8.54375C8.85938 6.44063 9.63438 5.80625 10.7875 5.80625C13.1906 5.80625 13.6344 7.3875 13.6344 9.44375V13.6344Z"
      />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" className="block h-full w-full">
      <path
        fill="white"
        d="M12.2174 1.26929H14.4663L9.55298 6.88495L15.3332 14.5266H10.8073L7.26253 9.89198L3.20647 14.5266H0.956125L6.21146 8.52002L0.666504 1.26929H5.30724L8.51143 5.50551L12.2174 1.26929ZM11.428 13.1805H12.6742L4.6301 2.54471H3.29281L11.428 13.1805Z"
      />
    </svg>
  )
}

function FooterAnchor({ link, className }: { link: FooterLink; className: string }) {
  return link.href === '#' ? (
    <a href="#" className={className}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  )
}

export default function ScaleFooter() {
  return (
    <footer className={`${s.footer} font-display`}>
      <div className={`${s.grid} ${s.top}`}>
        <div className={s.logo}>
          {/* Vahue mark in place of Scale's 24px logomark. */}
          <svg role="img" aria-label="Vahue logo" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="white" />
          </svg>
        </div>
        {COLUMNS.map((col, i) => (
          <div key={col.title} className={`${s.col} ${s[`c${i + 1}`]}`}>
            <p className={`${s.mono} font-mono`}>{col.title}</p>
            <div className={s.list}>
              {col.links.map((l) => (
                <FooterAnchor key={l.label} link={l} className={s.link} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={s.grid}>
        {/* TODO: Vahue copy */}
        <p className={s.statement}>Clear product calls for the teams that ship next</p>
      </div>

      <div className={s.bottom}>
        <div className="flex gap-2">
          <a href="#" className={s.social} aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="#" className={s.social} aria-label="X">
            <XIcon />
          </a>
        </div>
        <div className="flex flex-col gap-2 text-right">
          <p className={`${s.mono} font-mono`}>
            Manage your&nbsp;
            <button type="button" className="cursor-pointer uppercase underline">
              cookie preferences
            </button>
          </p>
          <div className={`${s.legal} ${s.mono} font-mono`}>
            <p>Copyright ©&nbsp;2026&nbsp;Vahue. All rights reserved</p>
            <p>
              <a className="underline" href="#">
                Terms of Use
              </a>
              &nbsp;&amp;{' '}
              <a className="underline" href="#">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
