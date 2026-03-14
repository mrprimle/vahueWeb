import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#141414] px-6 md:px-8 pt-6 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo */}
          <div className="lg:col-span-1 flex flex-col items-center md:items-start gap-4">
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
          </div>

          {/* Contacts */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-normal text-white mb-4">Contacts</h4>
            <a
              href="mailto:human@vahue.ai"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors mb-2"
            >
              human@vahue.ai
            </a>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block" />

          {/* Services */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-normal text-white mb-4">Services</h4>
            <Link href="/teams" className="text-sm font-medium text-white/70 hover:text-white transition-colors mb-2">AI Strategy &amp; Team Training</Link>
            <Link href="/automations" className="text-sm font-medium text-white/70 hover:text-white transition-colors mb-2">Agentic AI Automations</Link>
            <Link href="/ai-native-engineering" className="text-sm font-medium text-white/70 hover:text-white transition-colors mb-2">AI-Native Engineering</Link>
          </div>

          {/* Company */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-normal text-white mb-4">Company</h4>
            <Link href="/case-studies" className="text-sm font-medium text-white/70 hover:text-white transition-colors mb-2">Case Studies</Link>
            <Link href="/blog" className="text-sm font-medium text-white/70 hover:text-white transition-colors mb-2">Blog</Link>
            <Link href="/#approach" className="text-sm font-medium text-white/70 hover:text-white transition-colors mb-2">Our Approach</Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} All rights reserved. Vahue.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
