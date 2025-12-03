"use client"

const awards = [
  "Excellence in Real Estate",
  "Top 100 Realtors",
  "Client Choice Award",
  "Best Commercial Agent 2024",
  "Service Award",
  "Industry Leadership",
  "Innovation Award 2023",
  "Market Excellence",
  "Professional Excellence",
  "Community Impact",
  "Rising Star Award",
  "Regional Top Agent",
]

const certificates = [
  "Commercial Appraisal",
  "Licensed Commercial Agent",
  "Property Management Cert.",
  "Real Estate Investment",
  "Market Analysis",
  "Valuation Expert",
  "Legal Compliance",
  "Negotiation Specialist",
  "Business Development",
  "Financial Analysis",
  "Property Law",
  "Risk Management",
]

const MIN_ITEMS = 6

function InfiniteScrollRow({
  items,
  direction = "left",
}: {
  items: string[]
  direction?: "left" | "right"
}) {
  const getDisplayItems = () => {
    if (items.length === 0) return []
    if (items.length === 1) {
      return Array(MIN_ITEMS).fill(items[0])
    }
    let displayItems = [...items]
    while (displayItems.length < MIN_ITEMS) {
      displayItems = [...displayItems, ...items]
    }
    return displayItems
  }

  const displayItems = getDisplayItems()
  const animationClass = direction === "left" ? "infinite-scroll-left" : "infinite-scroll-right"

  const renderItem = (item: string, index: number, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${index}`}
      className="infinite-scroll-item flex-shrink-0 border border-white/30 rounded-sm flex items-center justify-center hover:bg-white/10 transition-all award-card-item"
    >
      <span
        className="text-center leading-tight font-semibold text-white/90"
        style={{ fontSize: "clamp(0.7rem, 0.4vw + 0.55rem, 0.95rem)" }}
      >
        {item}
      </span>
    </div>
  )

  return (
    <div className="infinite-scroll-container">
      <div className={`infinite-scroll-track ${animationClass}`}>
        {displayItems.map((item, index) => renderItem(item, index, "a"))}
        {displayItems.map((item, index) => renderItem(item, index, "b"))}
      </div>
    </div>
  )
}

export default function AwardsCertificates() {
  return (
    <section
      id="awards"
      className="overflow-hidden w-full"
      style={{
        backgroundColor: "#818380",
        paddingBlock: "clamp(2.5rem, 4vw + 1.5rem, 6rem)",
      }}
    >
      <div
        className="w-full mx-auto"
        style={{
          maxWidth: "min(94vw, 1400px)",
          paddingInline: "clamp(1rem, 3vw, 3rem)",
        }}
      >
        <h2
          className="font-serif text-center text-white"
          style={{
            fontSize: "clamp(1.5rem, 1.5vw + 1rem, 2.75rem)",
            marginBottom: "clamp(1.5rem, 2.5vw + 1rem, 3.5rem)",
          }}
        >
          Awards and Certificates
        </h2>

        <div
          className="flex flex-col lg:flex-row justify-center items-stretch"
          style={{ gap: "clamp(1.5rem, 2vw + 1rem, 3rem)" }}
        >
          {/* Awards Column */}
          <div className="flex flex-col items-center w-full lg:w-[48%]">
            <h3
              className="font-serif text-white text-center w-full"
              style={{
                fontSize: "clamp(1.125rem, 1vw + 0.75rem, 2rem)",
                marginBottom: "clamp(1rem, 1.5vw + 0.5rem, 2rem)",
              }}
            >
              Award
            </h3>
            <div className="w-full flex flex-col" style={{ gap: "clamp(0.5rem, 0.75vw + 0.25rem, 1.25rem)" }}>
              <InfiniteScrollRow items={awards.slice(0, 4)} direction="right" />
              <InfiniteScrollRow items={awards.slice(4, 8)} direction="left" />
              <InfiniteScrollRow items={awards.slice(8, 12)} direction="right" />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block self-stretch flex-shrink-0 w-0.5 bg-white/30" />
          <div className="lg:hidden w-3/4 mx-auto h-0.5 bg-white/30" />

          {/* Certificates Column */}
          <div className="flex flex-col items-center w-full lg:w-[48%]">
            <h3
              className="font-serif text-white text-center w-full"
              style={{
                fontSize: "clamp(1.125rem, 1vw + 0.75rem, 2rem)",
                marginBottom: "clamp(1rem, 1.5vw + 0.5rem, 2rem)",
              }}
            >
              Certificates
            </h3>
            <div className="w-full flex flex-col" style={{ gap: "clamp(0.5rem, 0.75vw + 0.25rem, 1.25rem)" }}>
              <InfiniteScrollRow items={certificates.slice(0, 4)} direction="left" />
              <InfiniteScrollRow items={certificates.slice(4, 8)} direction="right" />
              <InfiniteScrollRow items={certificates.slice(8, 12)} direction="left" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
