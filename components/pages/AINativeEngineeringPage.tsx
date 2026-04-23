'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import QualityPlates from '@/components/engineering/QualityPlates'
import CoreServices from '@/components/engineering/CoreServices'
import SubpageApproach from '@/components/shared/SubpageApproach'
import Problems from '@/components/engineering/Problems'
import Press from '@/components/engineering/Press'
import ClientsSection from '@/components/engineering/ClientsSection'
import AwardsSlider from '@/components/engineering/AwardsSlider'
import ExpertiseIndustries from '@/components/engineering/ExpertiseIndustries'
import CaseStudies from '@/components/engineering/CaseStudies'
import Stats from '@/components/engineering/Stats'
import FounderCTA from '@/components/engineering/FounderCTA'
import Testimonials from '@/components/engineering/Testimonials'
import BlogSection from '@/components/engineering/BlogSection'
import ContactContainer from '@/components/engineering/ContactContainer'

const companies = [
  { name: 'Shopify', logo: '/img/shopify.svg' },
  { name: 'Audi', logo: '/img/audi-logo.svg' },
  { name: 'Deloitte', logo: '/img/deloitte.svg' },
  { name: 'Leafworks', logo: '/img/leafworks.svg' },
  { name: 'Tracesafe', logo: '/img/tracesafe.svg' },
  { name: 'Carmen', logo: '/img/carmen.svg' },
  { name: 'BringLiesel', logo: '/img/bringliesel.svg' },
  { name: 'Quilk', logo: '/img/quilk.svg' },
]

function EngHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="min-h-[85vh] md:min-h-screen flex flex-col relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 0%, 
              rgba(48, 94, 255, 0.48) 0%, 
              rgba(79, 98, 248, 0.42) 20%, 
              rgba(99, 102, 241, 0.36) 40%, 
              rgba(110, 100, 245, 0.24) 55%, 
              rgba(118, 98, 248, 0.15) 70%, 
              transparent 90%
            )
          `,
        }}
      />

      <div className="flex-1 flex items-center relative">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="text-center max-w-5xl mx-auto">
            <div
              className={`inline-flex mb-6 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '50ms' : '0ms',
              }}
            >
              <button
                onClick={() => {
                  const benefitsSection = document.getElementById('benefits-section')
                  if (benefitsSection) {
                    benefitsSection.scrollIntoView({ behavior: 'smooth' })
                    window.dispatchEvent(new CustomEvent('selectAINative'))
                  }
                }}
                className="group inline-flex items-center gap-1.5 pl-4 pr-3 py-1 rounded-full text-[13px] font-medium text-dark/90 cursor-pointer backdrop-blur-sm bg-white/20 border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-white/25 hover:border-white/45 transition-all duration-200"
              >
                Vahue ❤️ AI
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <h1
              className={`text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight text-dark mb-6 leading-[1.05] uppercase ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '150ms' : '0ms',
              }}
            >
              Engineering Teams Built for the AI Era.
            </h1>

            <p
              className={`text-xs sm:text-sm md:text-base text-dark/70 mb-6 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '330ms' : '0ms',
              }}
            >
              Dedicated development teams that use AI-augmented workflows across the entire SDLC. Ship faster with senior engineers who build with AI, not around it.
            </p>

            <div
              className={`${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '500ms' : '0ms',
              }}
            >
              <Link
                href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="group inline-flex items-center gap-1.5 bg-transparent text-dark font-medium text-xs md:text-sm uppercase tracking-wider px-3 md:px-4 py-1.5 md:py-2 rounded-full border-2 border-dark transition-all duration-200">
                  Book a Call
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-auto pt-4 pb-12 md:pb-16">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-gray-100 rounded-2xl md:rounded-3xl p-4 md:p-6">
            <div className="grid grid-cols-3 md:grid-cols-8 gap-4 md:gap-6 items-center justify-items-center">
              {companies.slice(0, 3).map((company) => (
                <div key={`mobile-${company.name}`} className="flex items-center justify-center md:hidden">
                  <Image src={company.logo} alt={company.name} width={120} height={40} className="h-8 w-auto grayscale opacity-60" />
                </div>
              ))}
              {companies.map((company) => (
                <div key={company.name} className="hidden md:flex items-center justify-center">
                  <Image src={company.logo} alt={company.name} width={120} height={40} className="h-8 w-auto grayscale opacity-60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const approachSteps = [
  { title: 'Discovery', description: 'Understand your product, team, and technical landscape' },
  { title: 'Architecture', description: 'Design AI-augmented workflows and system architecture' },
  { title: 'Sprint Delivery', description: 'Iterative development with AI-native engineering practices' },
  { title: 'QA & Security', description: 'Automated testing, code review, and security audits' },
  { title: 'Deployment', description: 'CI/CD pipelines, monitoring, and production readiness' },
  { title: 'Continuous Improvement', description: 'Performance optimization, tech debt reduction, and feature iteration' },
]

export default function AINativeEngineeringPage() {
  return (
    <>
      <EngHero />
      <QualityPlates />
      <CoreServices />
      <SubpageApproach
        frameworkName="The Vahue AI-Native SDLC"
        title="How we deliver"
        subtitle="AI-augmented engineering across every stage of the development lifecycle."
        steps={approachSteps}
      />
      <Problems />
      <ExpertiseIndustries />
      <AwardsSlider />
      <Press />
      <ClientsSection />
      <CaseStudies />
      <Stats />
      <FounderCTA />
      <Testimonials />
      <BlogSection />
      <ContactContainer />
    </>
  )
}
