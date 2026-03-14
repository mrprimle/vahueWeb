export default function Stats() {
  const stats = [
    { value: '16', label: 'Total Awards' },
    { value: '7+', label: 'Years of Services' },
    { value: '30+', label: 'Team Members' },
    { value: '75+', label: 'Happy Clients' },
  ]

  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-wrap justify-between gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="border border-[#F4F5F6] rounded-[32px] p-3 bg-[#F4F5F680] w-[calc(50%-0.5rem)] md:w-[200px] lg:w-[240px] aspect-square"
            >
              <div className="bg-white rounded-[24px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)] h-full flex flex-col items-center justify-center text-center">
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-animated mb-2">
                  {stat.value}
                </p>
                <p className="text-[#86868b] text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
