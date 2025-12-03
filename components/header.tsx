"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#footer", label: "Contact" },
    { href: "#companies", label: "About" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div
        className="w-full mx-auto"
        style={{ maxWidth: "min(96vw, 2400px)", paddingInline: "clamp(1rem, 3vw, 4rem)" }}
      >
        <div className="flex items-center justify-between" style={{ height: "var(--header-height)" }}>
          <a href="#hero" className="flex items-center gap-2 sm:gap-3 group">
            <div
              className="relative overflow-hidden rounded transition-transform group-hover:scale-105"
              style={{ width: "var(--logo-size)", height: "var(--logo-size)" }}
            >
              <Image
                src="/dg-real-estate-logo-minimalist.jpg"
                alt="DGrealtor Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className={`font-serif font-semibold tracking-tight transition-colors ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
              style={{ fontSize: "clamp(1.125rem, 0.75vw + 0.9rem, 1.75rem)" }}
            >
              DGrealtor
            </span>
          </a>

          <nav className="flex items-center" style={{ gap: "clamp(1.25rem, 2vw + 0.5rem, 3rem)" }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-medium tracking-wide transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded ${
                  isScrolled ? "text-muted-foreground" : "text-white/90"
                }`}
                style={{ fontSize: "clamp(0.875rem, 0.5vw + 0.7rem, 1.25rem)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
