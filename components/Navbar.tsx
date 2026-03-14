'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

// Per-page nav links — each maps to section IDs on that page
const navConfig: Record<string, { href: string; label: string }[]> = {
  '/': [
    { href: '#services', label: 'Services' },
    { href: '#products', label: 'Products' },
    { href: '#cases', label: 'Cases' },
    { href: '#approach', label: 'Approach' },
    { href: '#contact', label: 'Contacts' },
  ],
  '/teams': [
    { href: '#results', label: 'Results' },
    { href: '#products', label: 'Products' },
    { href: '#cases', label: 'Cases' },
    { href: '#team', label: 'Team' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ],
  '/automations': [
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#cases', label: 'Cases' },
    { href: '#contact', label: 'Contact' },
  ],
  '/ai-native-engineering': [
    { href: '#case-studies', label: 'Cases' },
    { href: '#contact', label: 'Contact' },
  ],
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const cleanPath = pathname.replace(/\/$/, '') || '/'
  const isDarkPage = cleanPath === '/' || cleanPath === '/teams' || cleanPath === '/automations'
  const isLightHeroPage = cleanPath === '/ai-native-engineering' || cleanPath.startsWith('/ai-native-engineering/')

  // Pick links for current page, fallback to main
  const navLinks = useMemo(() => {
    return navConfig[cleanPath] || navConfig['/']
  }, [cleanPath])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const anchor = href.replace('#', '')
      if (anchor) {
        e.preventDefault()
        const element = document.getElementById(anchor)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
        closeMenu()
      }
    },
    [closeMenu]
  )

  const textColor =
    !isScrolled && isDarkPage && !isMenuOpen ? 'text-white' : 'text-dark'
  const logoColor =
    !isScrolled && isDarkPage && !isMenuOpen ? 'text-white' : 'text-dark'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-2xl shadow-sm border-b border-gray-200/50'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMenu}
              className={`flex items-center gap-2 z-50 transition-colors ${logoColor}`}
            >
              <span className="flex items-center gap-2">
                <Image
                  src="/img/white-circle.svg"
                  alt="Vahue logo"
                  width={14}
                  height={14}
                  className={`transition-all duration-500 ${
                    !isScrolled && isDarkPage && !isMenuOpen
                      ? ''
                      : 'brightness-0'
                  }`}
                />
                <span className="text-xl font-bold tracking-tight">
                  vahue.ai
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`text-sm font-medium transition-colors hover:opacity-70 cursor-pointer ${textColor}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                href="https://calendly.com/mike_at_pletava/vahue-ai-discovery"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-mono text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-500 ${
                  isScrolled
                    ? 'opacity-100 translate-y-0 bg-dark text-white hover:bg-dark/90'
                    : 'opacity-0 -translate-y-2 pointer-events-none bg-dark text-white'
                }`}
              >
                Let&apos;s Talk Strategy
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 z-50"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 rounded transition-all duration-300 ${
                  isMenuOpen
                    ? 'rotate-45 translate-y-[3px] bg-dark'
                    : isDarkPage && !isScrolled
                    ? 'bg-white'
                    : 'bg-dark'
                }`}
              />
              <span
                className={`block w-6 h-0.5 rounded mt-1.5 transition-all duration-300 ${
                  isMenuOpen
                    ? '-rotate-45 -translate-y-[5px] bg-dark'
                    : isDarkPage && !isScrolled
                    ? 'bg-white'
                    : 'bg-dark'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 ${
          isMenuOpen ? '' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-white/90 backdrop-blur-3xl transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMenu}
        />

        <div
          className={`relative h-full flex flex-col items-center justify-center transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ul className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                className={`transition-all duration-500 ${
                  isMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 80 + 100}ms` : '0ms',
                }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-2xl font-semibold text-dark transition-colors hover:text-primary cursor-pointer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
