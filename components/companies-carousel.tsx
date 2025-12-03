"use client"

import Image from "next/image"

const companies = [
  { name: "Global Assets", logo: "/global-assets-corporate-logo.jpg" },
  { name: "TechCorp", logo: "/techcorp-technology-company-logo.jpg" },
  { name: "BuildRight", logo: "/buildright-construction-company-logo.jpg" },
  { name: "Metro Solutions", logo: "/metro-solutions-business-logo.jpg" },
  { name: "Urban Spaces", logo: "/urban-spaces-real-estate-logo.jpg" },
  { name: "Prime Ventures", logo: "/prime-ventures-investment-logo.jpg" },
]

const MIN_ITEMS_FOR_LOOP = 8

export default function CompaniesCarousel() {
  const getDisplayItems = () => {
    if (companies.length === 0) return []
    if (companies.length === 1) {
      return Array(MIN_ITEMS_FOR_LOOP).fill(companies[0])
    }
    let items = [...companies]
    while (items.length < MIN_ITEMS_FOR_LOOP) {
      items = [...items, ...companies]
    }
    return items
  }

  const displayItems = getDisplayItems()

  return (
    <section
      id="companies"
      className="overflow-hidden w-full"
      style={{
        backgroundColor: "#f0efe7",
        scrollMarginTop: "5rem",
        paddingBlock: "clamp(2rem, 3.5vw + 1.5rem, 5rem)",
      }}
    >
      <div
        className="w-full mx-auto"
        style={{
          maxWidth: "min(96vw, 2400px)",
          paddingInline: "clamp(1rem, 3vw, 4rem)",
          marginBottom: "clamp(1.5rem, 2.5vw + 1rem, 3.5rem)",
        }}
      >
        <div className="flex justify-center">
          <h2
            className="font-serif text-foreground italic tracking-wide"
            style={{ fontSize: "clamp(1.25rem, 1.25vw + 0.9rem, 2.5rem)" }}
          >
            Company worked with
          </h2>
        </div>
      </div>

      <div className="w-full infinite-scroll-container">
        <div className="infinite-scroll-track infinite-scroll-right scroll-slower flex items-center">
          {/* First set of items */}
          {displayItems.map((company, index) => (
            <div
              key={`a-${index}`}
              className="infinite-scroll-item flex items-center justify-center flex-shrink-0 carousel-logo-item"
            >
              <Image
                src={company.logo || "/placeholder.svg"}
                alt={`${company.name} logo`}
                width={160}
                height={80}
                className="w-full h-full object-contain grayscale opacity-40 hover:opacity-60 transition-opacity duration-300"
                style={{ background: "transparent" }}
              />
            </div>
          ))}
          {/* Second set of items for seamless looping */}
          {displayItems.map((company, index) => (
            <div
              key={`b-${index}`}
              className="infinite-scroll-item flex items-center justify-center flex-shrink-0 carousel-logo-item"
            >
              <Image
                src={company.logo || "/placeholder.svg"}
                alt={`${company.name} logo`}
                width={160}
                height={80}
                className="w-full h-full object-contain grayscale opacity-40 hover:opacity-60 transition-opacity duration-300"
                style={{ background: "transparent" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
