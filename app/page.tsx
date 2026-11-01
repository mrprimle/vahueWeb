// Stub: the page agent for / replaces this file.
import Link from 'next/link'

export default function Page() {
  return (
    <section className="min-h-svh px-6 pt-40 pb-24 text-center">
      <h1 className="header2">Home</h1>
      <p className="mt-6 body2-regular">
        <Link className="underline" href="/">
          Home
        </Link>
      </p>
    </section>
  )
}
