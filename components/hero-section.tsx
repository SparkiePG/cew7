"use client"

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex items-center justify-center overflow-hidden min-h-[100dvh]">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        alt="Modern commercial building with glass facade"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      <div
        className="relative z-10 w-full text-center"
        style={{
          maxWidth: "min(92vw, 72rem)",
          paddingInline: "clamp(1rem, 3vw, 3rem)",
        }}
      >
        <h1
          className="font-serif text-white leading-tight tracking-tight text-balance"
          style={{
            fontSize: "clamp(1.75rem, 3.5vw + 1rem, 4.5rem)",
            marginBottom: "clamp(0.5rem, 1vw, 1.5rem)",
          }}
        >
          Find your next business
          <br />
          <span className="text-primary">location with us.</span>
        </h1>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute left-1/2 -translate-x-1/2 animate-bounce"
        style={{ bottom: "clamp(1.5rem, 4vh, 2.5rem)" }}
      >
        <a
          href="#companies"
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label="Scroll to companies section"
        >
          <span className="uppercase tracking-widest" style={{ fontSize: "clamp(0.625rem, 0.4vw + 0.5rem, 0.875rem)" }}>
            Scroll
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "clamp(1rem, 1.5vw + 0.5rem, 1.5rem)", height: "clamp(1rem, 1.5vw + 0.5rem, 1.5rem)" }}
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
