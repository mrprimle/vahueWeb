// /careers itself is dark (VahueCareersPage). The light theme (data-page-theme="careers", read by app/globals.css)
// is set by the vacancy pages under it: /careers/vacancies and /careers/senior-smm.
export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
