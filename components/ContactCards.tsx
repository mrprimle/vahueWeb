import Link from 'next/link'

export default function ContactCards() {
  return (
    <section id="contact" className="bg-white py-16 md:py-24 lg:py-28">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-10 md:mb-14">
          Contact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Book a Strategy Call */}
          <Link
            href="https://calendly.com/mike_at_pletava/vahue-ai-discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#f97316] rounded-2xl md:rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[220px] hover:bg-[#ea580c] transition-colors"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            <div className="mt-auto">
              <p className="text-white font-bold text-lg">
                Book a Strategy Call
              </p>
            </div>
          </Link>

          {/* Email */}
          <a
            href="mailto:human@vahue.ai"
            className="bg-bg-gray rounded-2xl md:rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[220px] hover:bg-[#ededf0] transition-colors"
          >
            <svg
              className="w-8 h-8 text-[#f97316]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <div className="mt-auto">
              <p className="text-dark font-bold text-lg mb-1">Email</p>
              <p className="text-dark/50 text-sm">
                human@vahue.ai
              </p>
            </div>
          </a>

          {/* Telegram */}
          <Link
            href="https://t.me/mdviz"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-bg-gray rounded-2xl md:rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[220px] hover:bg-[#ededf0] transition-colors"
          >
            <svg
              className="w-8 h-8 text-[#f97316]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            <div className="mt-auto">
              <p className="text-dark font-bold text-lg mb-1">
                Contact Mike (Founder) on Telegram
              </p>
              <p className="text-dark/50 text-sm">
                @mdviz
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
