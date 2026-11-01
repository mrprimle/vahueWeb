import type { Metadata } from 'next'
import VacanciesPage from '@/components/careers/VacanciesPage'

export const metadata: Metadata = {
  title: 'Open Vacancies',
  description: 'Explore open roles at Vahue.',
}

export default function Page() {
  return (
    <div data-page-theme="careers">
      <VacanciesPage />
    </div>
  )
}
