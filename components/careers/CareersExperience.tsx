'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import styles from './careers.module.css'

const values = [
  {
    title: 'Mindset of respect',
    text: 'We treat everyone equally, valuing their opinions and input.',
  },
  {
    title: 'Think like an owner',
    text: 'We go beyond tasks, promoting proactive action.',
  },
  {
    title: 'Flexibility',
    text: 'We treat everyone equally, valuing their opinions and input.',
  },
]

const testimonials = [
  {
    quote:
      'Moving from large outsourcing teams and enterprise clients into startups gave me the challenge I wanted. Working with modern technology and ambitious founders made me a stronger engineer, a trusted core-team member, and an active voice in product and business decisions.',
    name: 'Andrew',
    role: 'Senior Software Engineer',
  },
  {
    quote:
      'I joined as a Trainee Client Partner and grew quickly because the Client Partner and Sales teams shared their knowledge openly. Vahue gives people room to show their strengths, contribute to the team’s success, and keep developing in a transparent, supportive culture.',
    name: 'Layla',
    role: 'Capacity Manager',
  },
  {
    quote:
      'During my time at Vahue, I have learned technologies and processes that make work more effective. What I value most is the ownership of my colleagues, flexible ways of working, and the chance to shape products with ideas that are genuinely heard.',
    name: 'Andriy',
    role: 'Manual QA Engineer',
  },
  {
    quote:
      'At Vahue, your work can make a visible difference. There is no micromanagement, the schedule is flexible, and talented teammates are always ready to share what they know. You can grow, make mistakes, get support, and do your best work.',
    name: 'Olga',
    role: 'Project Manager and Client Partner',
  },
]

export default function CareersExperience() {
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(`.${styles.reveal}`)
    )

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      nodes.forEach((node) => node.classList.add(styles.visible))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add(styles.visible)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroCopy} ${styles.reveal}`}>
          <h1>
            <span>Where your work</span>
            <span>matters</span>
          </h1>
          <p>
            At Vahue, we value personalities, foster growth, build stable
            partnerships, and love what we do. Let’s work together.
          </p>
          <Link href="/careers/vacancies" className={styles.outlineButton}>
            Open vacancies
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className={`${styles.heroVisual} ${styles.reveal}`}>
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/img/careers/hero-mobile.webp"
            />
            <Image
              src="/img/careers/hero.jpg"
              alt="Team members working together"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          </picture>
        </div>
      </section>

      <section className={styles.people}>
        <div className={`${styles.peopleHeading} ${styles.reveal}`}>
          <h2>Are we good with people?</h2>
          <p>Our educated guess: yes</p>
        </div>

        <div className={styles.peopleGrid}>
          <article className={`${styles.peopleCard} ${styles.reveal}`}>
            <strong>17</strong>
            <p>Experts make up our total company headcount</p>
          </article>
          <article className={`${styles.peopleCard} ${styles.reveal}`}>
            <strong>3</strong>
            <p>Better talent retention, compared to the industry average rate</p>
          </article>
          <article className={`${styles.peopleCard} ${styles.reveal}`}>
            <strong>80.7</strong>
            <p>Employee Net Promoter Score</p>
          </article>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className={`${styles.valuesInner} ${styles.reveal}`}>
          <p className={styles.sectionLabel}>Our values</p>
          <div className={styles.valuesGrid}>
            <div className={styles.valuesMark} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.valuesList}>
              {values.map((value) => (
                <article key={value.title}>
                  <h2>{value.title}</h2>
                  <p>{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.teamImage} ${styles.reveal}`}>
        <Image
          src="/img/careers/team-vahue-mi.png"
          alt="Vahue team celebrating together"
          fill
          sizes="100vw"
        />
      </section>

      <section className={styles.experience}>
        <div className={`${styles.experienceInner} ${styles.reveal}`}>
          <h2>Real experiences</h2>
          <div className={styles.quoteCard}>
            <span className={styles.quoteMark} aria-hidden="true">
              “
            </span>
            <div className={styles.quoteStage} aria-live="polite">
              {testimonials.map((testimonial, index) => (
                <article
                  key={testimonial.name}
                  className={`${styles.quoteSlide} ${
                    index === testimonialIndex ? styles.quoteSlideActive : ''
                  }`}
                  aria-hidden={index !== testimonialIndex}
                >
                  <blockquote>{testimonial.quote}</blockquote>
                  <div className={styles.quotePerson}>
                    <span className={styles.avatar}>
                      {testimonial.name.charAt(0)}
                    </span>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.quoteControls}>
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() =>
                  setTestimonialIndex(
                    (current) =>
                      (current - 1 + testimonials.length) % testimonials.length
                  )
                }
              >
                <CaretLeft size={22} weight="bold" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() =>
                  setTestimonialIndex(
                    (current) => (current + 1) % testimonials.length
                  )
                }
              >
                <CaretRight size={22} weight="bold" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.vacancies}>
        <div className={`${styles.vacanciesHeader} ${styles.reveal}`}>
          <h2>Our vacancies</h2>
          <Link href="/careers/vacancies" className={styles.outlineButton}>
            View more
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <Link
          href="/careers/senior-smm"
          className={`${styles.jobCard} ${styles.reveal}`}
        >
          <h3>Senior SMM</h3>
          <div>
            <span>Remote</span>
            <span>Full-time</span>
          </div>
          <span className={styles.jobArrow} aria-hidden="true">
            ↗
          </span>
        </Link>
      </section>

      <section className={styles.offices}>
        <div className={`${styles.officesInner} ${styles.reveal}`}>
          <h2>You’re gonna love our offices</h2>
          <div className={styles.officeGrid}>
            <Image
              src="/img/careers/office-1.jpg"
              alt="Team workspace"
              width={900}
              height={600}
              sizes="(max-width: 767px) 100vw, 45vw"
            />
            <Image
              src="/img/careers/office-2-vahue.png"
              alt="Vahue office"
              width={900}
              height={600}
              sizes="(max-width: 767px) 100vw, 32vw"
            />
            <Image
              src="/img/careers/office-3.jpg"
              alt="Office common area"
              width={900}
              height={600}
              sizes="(max-width: 767px) 100vw, 32vw"
            />
            <Image
              src="/img/careers/office-4.jpg"
              alt="People working together"
              width={900}
              height={600}
              sizes="(max-width: 767px) 100vw, 45vw"
            />
            <Image
              src="/img/careers/office-5.jpg"
              alt="Team meeting space"
              width={900}
              height={600}
              sizes="(max-width: 767px) 100vw, 32vw"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
