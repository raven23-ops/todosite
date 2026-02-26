"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 group">
          <Image src="/images/raven-logo.png" alt="RAVEN shop logo" width={32} height={32} className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            RAVEN <span className="text-primary font-normal text-sm">shop</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            Pricing
          </a>
          <a href="#payment" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            Payment
          </a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            FAQ
          </a>
          <a
            href="https://discord.gg/yYyWCeMj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-accent hover:shadow-[0_0_24px_rgba(168,85,247,0.4)]"
          >
            Purchase Now
          </a>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-up">
          <div className="flex flex-col gap-4 px-6 py-6">
            <a href="#pricing" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#payment" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Payment
            </a>
            <a href="#faq" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
            <a
              href="https://discord.gg/yYyWCeMj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Purchase Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
