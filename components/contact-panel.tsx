"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "clamp(1rem, 1.5vw, 1.25rem)", height: "clamp(1rem, 1.5vw, 1.25rem)" }}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const MessageCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "clamp(1rem, 1.5vw, 1.25rem)", height: "clamp(1rem, 1.5vw, 1.25rem)" }}
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
)

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "clamp(0.75rem, 1vw, 0.875rem)", height: "clamp(0.75rem, 1vw, 0.875rem)" }}
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
)

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const AlertCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "0.75rem", height: "0.75rem" }}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
)

interface FormData {
  fullName: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  fullName?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => firstInputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return "Email is required"
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address"
    }
    const domain = email.toLowerCase().split("@")[1]
    const allowedDomains = ["gmail.com", "yahoo.com", "yahoo.co.uk", "yahoo.in"]
    if (!allowedDomains.includes(domain)) {
      return "Unsupported email address. Only Gmail and Yahoo Mail are accepted."
    }
    return undefined
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }
    const emailError = validateEmail(formData.email)
    if (emailError) {
      newErrors.email = emailError
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    setIsSubmitting(true)
    try {
      const GOOGLE_FORM_URL =
        "https://docs.google.com/forms/d/e/1FAIpQLSdLAm9-acrTTJPZONyRtddSC1dqeLxEdlE5VtEdJQf8M-cZBQ/formResponse"
      const formBody = new FormData()
      formBody.append("entry.1633920210", formData.fullName)
      formBody.append("entry.227649005", formData.email)
      formBody.append("entry.790080973", formData.subject)
      formBody.append("entry.1770822543", formData.message)
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formBody,
      })
      setIsSuccess(true)
      setFormData({ fullName: "", email: "", subject: "", message: "" })
      setErrors({})
      setTimeout(() => {
        setIsSuccess(false)
        setIsOpen(false)
      }, 5000)
    } catch {
      setErrors({ message: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <>
      {/* Toggle Button - Using fluid sizing */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed z-40 flex items-center fluid-gap-xs bg-primary text-primary-foreground font-medium rounded-full shadow-lg transition-all hover:opacity-90 hover:shadow-xl hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          bottom: "clamp(1rem, 3vw, 1.5rem)",
          right: "clamp(1rem, 3vw, 1.5rem)",
          padding: "clamp(0.625rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)",
          fontSize: "var(--text-sm)",
        }}
        aria-label="Open contact form"
      >
        <MessageCircleIcon />
        <span className="hidden sm:inline">Contact Me</span>
      </button>

      {/* Contact Panel - Using fluid sizing */}
      <div
        id="contact"
        ref={panelRef}
        className={`fixed z-50 bg-card rounded-lg shadow-2xl transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          bottom: "clamp(1rem, 3vw, 1.5rem)",
          right: "clamp(1rem, 3vw, 1.5rem)",
          width: "clamp(18rem, 85vw, 24rem)",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-panel-title"
      >
        {/* Panel Header */}
        <div
          className="flex items-center justify-between border-b border-border"
          style={{ padding: "clamp(0.75rem, 2vw, 1rem)" }}
        >
          <h2 id="contact-panel-title" className="font-serif fluid-text-lg text-foreground">
            Contact Me
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close contact form"
          >
            <XIcon />
          </button>
        </div>

        {/* Panel Content */}
        <div style={{ padding: "clamp(0.75rem, 2vw, 1rem)", maxHeight: "68vh", overflowY: "auto" }}>
          {isSuccess ? (
            /* Success State */
            <div className="py-6 text-center">
              <div
                className="mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center"
                style={{ width: "clamp(3rem, 6vw, 4rem)", height: "clamp(3rem, 6vw, 4rem)" }}
              >
                <CheckCircleIcon
                  className="text-green-600"
                  style={
                    { width: "clamp(1.5rem, 3vw, 2rem)", height: "clamp(1.5rem, 3vw, 2rem)" } as React.CSSProperties
                  }
                />
              </div>
              <h3 className="font-serif fluid-text-xl text-foreground mb-2">Ticket Created!</h3>
              <p className="text-muted-foreground fluid-text-sm">We'll get back to you within 5-7 days.</p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} noValidate className="flex flex-col fluid-gap-sm">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block fluid-text-sm font-medium text-foreground mb-1">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full border rounded-sm bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent fluid-text-sm ${
                    errors.fullName ? "border-destructive" : "border-input"
                  }`}
                  style={{ padding: "clamp(0.5rem, 1vw, 0.625rem) clamp(0.75rem, 1.5vw, 0.875rem)" }}
                  placeholder="John Smith"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                {errors.fullName && (
                  <p
                    id="fullName-error"
                    className="mt-1 fluid-text-xs text-destructive flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircleIcon />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block fluid-text-sm font-medium text-foreground mb-1">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border rounded-sm bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent fluid-text-sm ${
                    errors.email ? "border-destructive" : "border-input"
                  }`}
                  style={{ padding: "clamp(0.5rem, 1vw, 0.625rem) clamp(0.75rem, 1.5vw, 0.875rem)" }}
                  placeholder="you@gmail.com"
                  aria-invalid={!!errors.email}
                  aria-describedby="email-hint email-error"
                />
                <p id="email-hint" className="mt-1 fluid-text-xs text-muted-foreground">
                  Gmail or Yahoo addresses only
                </p>
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-1 fluid-text-xs text-destructive flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircleIcon />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block fluid-text-sm font-medium text-foreground mb-1">
                  Subject <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full border rounded-sm bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent fluid-text-sm ${
                    errors.subject ? "border-destructive" : "border-input"
                  }`}
                  style={{ padding: "clamp(0.5rem, 1vw, 0.625rem) clamp(0.75rem, 1.5vw, 0.875rem)" }}
                  placeholder="Inquiry about retail space"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && (
                  <p
                    id="subject-error"
                    className="mt-1 fluid-text-xs text-destructive flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircleIcon />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block fluid-text-sm font-medium text-foreground mb-1">
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full border rounded-sm bg-background transition-colors resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent fluid-text-sm ${
                    errors.message ? "border-destructive" : "border-input"
                  }`}
                  style={{ padding: "clamp(0.5rem, 1vw, 0.625rem) clamp(0.75rem, 1.5vw, 0.875rem)" }}
                  placeholder="Tell us about your requirements..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-1 fluid-text-xs text-destructive flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircleIcon />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center fluid-gap-xs bg-primary text-primary-foreground font-medium rounded-sm transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 fluid-text-sm"
                style={{ padding: "clamp(0.625rem, 1.5vw, 0.75rem) clamp(1rem, 2vw, 1.25rem)" }}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <SendIcon />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
