const testimonials = [
  {
    quote:
      "SmoothOpsX saved us hundreds of hours. We went from scrambling at every regulation change to proactively staying ahead. Highly recommended.",
    author: "Sarah Chen",
    role: "CTO at DataFlow",
  },
  {
    quote:
      "The plain-English summaries are a game changer. Our engineering team can finally understand compliance requirements without needing a legal degree.",
    author: "Marcus Johnson",
    role: "VP of Engineering at CloudBase",
  },
  {
    quote:
      "We were able to pass our SOC2 audit months ahead of schedule. SmoothOpsX made it easy to track exactly what we needed to fix.",
    author: "Elena Rodriguez",
    role: "Head of Security at FinStack",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Loved by{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              engineering teams
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            See what teams are saying about staying compliant with SmoothOpsX.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:border-white/20"
            >
              {/* Quote icon */}
              <svg
                className="h-8 w-8 text-emerald-400 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
              </svg>
              <p className="text-gray-300 text-sm leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6">
                <p className="text-white font-medium text-sm">
                  {testimonial.author}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
