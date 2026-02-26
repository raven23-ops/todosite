"use client"

import { useEffect, useRef, useState } from "react"
import { CreditCard, Wallet, Gift, ShieldCheck } from "lucide-react"

const paymentMethods = [
  {
    icon: Wallet,
    title: "PayPal",
    description: "Secure payments via PayPal",
  },
  {
    icon: CreditCard,
    title: "Credit Card",
    description: "Powered by G2A",
  },
  {
    icon: () => (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.7-.168-1.053-.254l.53-2.12-1.315-.328-.54 2.165c-.285-.065-.565-.13-.84-.2l-1.815-.45-.35 1.407s.975.225.955.238c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.315.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.315.33.545-2.19c2.24.427 3.93.254 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.749 1.67-1.892zm-2.99 4.196c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.221c-.37 1.49-2.662.735-3.405.548l.654-2.64c.744.186 3.137.534 2.75 2.084z" />
      </svg>
    ),
    title: "Crypto",
    description: "Bitcoin, Binance & more",
  },
  {
    icon: Gift,
    title: "Gift Cards",
    description: "Steam, Binance etc.",
  },
]

const trustBadges = [
  { label: "Fast Delivery", value: "< 5 min" },
  { label: "Happy Clients", value: "1,000+" },
  { label: "Uptime", value: "99.9%" },
]

export function PaymentSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="payment" ref={sectionRef} className="relative py-24 sm:py-32 px-6">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p
            className={`text-sm font-semibold tracking-widest uppercase text-primary mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Payment
          </p>
          <h2
            className={`text-3xl sm:text-5xl font-bold text-foreground text-balance mb-4 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Payment Methods
          </h2>
          <p
            className={`text-muted-foreground max-w-lg mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            We accept a wide range of payment methods for your convenience. All transactions are processed securely.
          </p>
        </div>

        {/* Payment cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {paymentMethods.map((method, index) => {
            const IconComponent = method.icon
            return (
              <div
                key={method.title}
                className={`group relative rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_24px_rgba(168,85,247,0.1)] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{method.title}</h3>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            )
          })}
        </div>

        {/* Trust badges */}
        <div
          className={`grid grid-cols-3 gap-6 max-w-2xl mx-auto transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {trustBadges.map((badge) => (
            <div key={badge.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary">{badge.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{badge.label}</p>
            </div>
          ))}
        </div>

        {/* Security note */}
        <div
          className={`mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground transition-all duration-700 delay-800 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span>All transactions are secure and encrypted</span>
        </div>
      </div>
    </section>
  )
}
