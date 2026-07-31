'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  CaretLeft,
  MagnifyingGlass,
} from '@phosphor-icons/react'
import styles from './careers.module.css'

const vacancy = {
  title: 'Senior SMM',
  category: 'Marketing',
  location: 'Fully remote',
  type: 'Full-time',
  href: '/careers/senior-smm',
}

export default function VacanciesPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const isVisible = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const matchesQuery =
      !normalized ||
      vacancy.title.toLowerCase().includes(normalized) ||
      vacancy.category.toLowerCase().includes(normalized)
    const matchesCategory =
      category === 'All' || vacancy.category === category
    return matchesQuery && matchesCategory
  }, [query, category])

  return (
    <div className={styles.jobsPage}>
      <section className={styles.jobsFilters}>
        <div className={styles.jobsTitleRow}>
          <div>
            <Link href="/careers" className={styles.backLink}>
              <CaretLeft
                className={styles.backLinkIcon}
                size={18}
                weight="bold"
                aria-hidden="true"
              />
              <span>Careers</span>
            </Link>
            <h1>Our vacancies</h1>
          </div>
          <label className={styles.searchField}>
            <span className="sr-only">Search vacancies</span>
            <MagnifyingGlass
              className={styles.searchIcon}
              size={22}
              weight="regular"
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for..."
            />
          </label>
        </div>

        <div className={styles.categories} aria-label="Vacancy categories">
          {['All', 'Marketing'].map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? styles.categoryActive : undefined}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.jobsResults} aria-live="polite">
        {isVisible ? (
          <Link href={vacancy.href} className={styles.jobCard}>
            <h2>{vacancy.title}</h2>
            <div>
              <span>{vacancy.location}</span>
              <span>{vacancy.type}</span>
            </div>
            <span className={styles.jobArrow} aria-hidden="true">
              <ArrowUpRight size={25} weight="bold" />
            </span>
          </Link>
        ) : (
          <div className={styles.emptyState}>
            <h2>No matching roles</h2>
            <p>Try another search or view all vacancies.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setCategory('All')
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
