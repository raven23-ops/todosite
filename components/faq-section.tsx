"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How do I purchase?",
    answer:
      "Simply click the 'Purchase Now' button to join our Discord server. Open a ticket and our team will assist you with your order right away.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most orders are delivered within 20 minutes. In rare cases during peak hours, delivery may take up to 1+ hours.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept PayPal, Crypto (Bitcoin, Binance), Credit Cards (via G2A), and Gift Cards (Steam, Binance, etc.).",
  },
  {
    question: "Is it safe to buy from RAVEN Shop?",
    answer:
      "Absolutely. We have served over 1,``0 happy customers with a 99.9% uptime. All transactions are secure and your data is encrypted.",
  },
  {
    question: "Do prices change?",
    answer:
      "Prices may vary depending on the market. We always try to offer the most competitive rates available.",
  },
]

function FaqItem({
  faq,
  index,
  isVisible,
}: {
  faq: { question: string; answer: string }
  index: number
  isVisible: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`border border-border rounded-xl overflow-hidden transition-all duration-500 ${
        open ? "bg-card border-primary/30" : "bg-card/50 hover:border-primary/20"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 80 + 200}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left px-6 py-5"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-foreground pr-4">{faq.question}</span>
        <ChevronDown
          className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  )
}

export function FaqSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="faq" ref={sectionRef} className="relative py-24 sm:py-32 px-6">
      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <p
            className={`text-sm font-semibold tracking-widest uppercase text-primary mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            FAQ
          </p>
          <h2
            className={`text-3xl sm:text-5xl font-bold text-foreground text-balance transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <FaqItem key={faq.question} faq={faq} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
