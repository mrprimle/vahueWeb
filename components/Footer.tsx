import Link from 'next/link'
import Image from 'next/image'

const segmentLinks = [
  { label: 'Engineering', href: '/ai-native-engineering' },
  { label: 'Customer Support', href: '/customer-support' },
  { label: 'Operations', href: '/operations' },
  { label: 'BFSI & RegTech', href: '/bfsi' },
]

const companyLinks = [
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-border-soft bg-bg px-6 md:px-8 pt-16 pb-10">
      <div className="max-w-wide mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 mb-14">
          {/* Logo + blurb */}
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/img/white-circle.svg"
                alt="Vahue logo"
                width={14}
                height={14}
              />
              <span className="text-xl font-bold tracking-tight text-white">
                vahue.ai
              </span>
            </Link>
            <p className="text-sm text-white/55 max-w-xs leading-relaxed">
              Multi-agent workflows, AI systems, and hands-on training that turn
              teams AI-native.
            </p>
          </div>

          {/* Segments */}
          <div className="flex flex-col items-start">
            <h4 className="eyebrow mb-4">Segments</h4>
            <ul className="flex flex-col gap-2">
              {segmentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col items-start">
            <h4 className="eyebrow mb-4">Company</h4>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:human@vahue.ai"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  human@vahue.ai
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-start">
            <h4 className="eyebrow mb-4">Start</h4>
            <Link
              href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs uppercase tracking-widest font-mono"
            >
              Book a call
              <svg
                className="ml-2 w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-white/40 font-mono tracking-wide">
            © {new Date().getFullYear()} Vahue. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-xs text-white/40 hover:text-white/80 transition-colors font-mono tracking-wide">
              Terms
            </Link>
            <Link href="#" className="text-xs text-white/40 hover:text-white/80 transition-colors font-mono tracking-wide">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-white/40 hover:text-white/80 transition-colors font-mono tracking-wide">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
