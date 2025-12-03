import Image from "next/image"

const FOOTER_CONFIG = {
  companyName: "DGrealtor",
  email: "DGrealtor@mail.in",
  address: {
    line1: "123 Business District",
    line2: "New York, NY 10001",
  },
}

// Inline SVG components to avoid lucide-react dependency
const MapPinIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={16}
    height={16}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const MailIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={16}
    height={16}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

export default function Footer() {
  return (
    <footer id="footer" className="bg-foreground text-background">
      <div
        className="w-full mx-auto"
        style={{
          maxWidth: "min(96vw, 2400px)",
          paddingInline: "clamp(1rem, 3vw, 4rem)",
          paddingBlock: "clamp(2rem, 3vw + 1rem, 4rem)",
        }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
          {/* Logo, Name and Address - LEFT side */}
          <div className="flex flex-col" style={{ gap: "clamp(1rem, 1.5vw + 0.5rem, 2rem)" }}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className="relative overflow-hidden rounded"
                style={{ width: "var(--logo-size)", height: "var(--logo-size)" }}
              >
                <Image src="/dg-real-estate-logo-minimalist.jpg" alt="DGrealtor Logo" fill className="object-contain" />
              </div>
              <span className="font-serif font-semibold" style={{ fontSize: "clamp(1.25rem, 1vw + 1rem, 2rem)" }}>
                {FOOTER_CONFIG.companyName}
              </span>
            </div>

            <div>
              <p
                className="font-semibold flex items-center gap-2 mb-2"
                style={{ fontSize: "clamp(0.875rem, 0.5vw + 0.7rem, 1.25rem)" }}
              >
                <MapPinIcon className="text-primary" />
                Address
              </p>
              <p
                className="text-background/80 leading-relaxed pl-6"
                style={{ fontSize: "clamp(0.875rem, 0.5vw + 0.7rem, 1.125rem)" }}
              >
                {FOOTER_CONFIG.address.line1}
                <br />
                {FOOTER_CONFIG.address.line2}
              </p>
            </div>
          </div>

          {/* Email - RIGHT side */}
          <div className="flex flex-col items-start sm:items-end gap-2">
            <p
              className="font-semibold flex items-center gap-2"
              style={{ fontSize: "clamp(0.875rem, 0.5vw + 0.7rem, 1.25rem)" }}
            >
              <MailIcon className="text-primary" />
              Email
            </p>
            <a
              href={`mailto:${FOOTER_CONFIG.email}`}
              className="text-background/80 hover:text-primary transition-colors"
              style={{ fontSize: "clamp(0.875rem, 0.5vw + 0.7rem, 1.125rem)" }}
            >
              {FOOTER_CONFIG.email}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="border-t border-white/10"
          style={{ marginTop: "clamp(1.5rem, 2vw + 1rem, 3rem)", paddingTop: "clamp(1rem, 1.5vw + 0.5rem, 2rem)" }}
        >
          <p className="text-background/50 text-center" style={{ fontSize: "clamp(0.75rem, 0.4vw + 0.6rem, 1rem)" }}>
            © {new Date().getFullYear()} {FOOTER_CONFIG.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
