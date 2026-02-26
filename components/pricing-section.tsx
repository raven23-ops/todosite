"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { CreditCard, Wallet, Gift, ShieldCheck, Zap, Users, Clock } from "lucide-react"

const paymentMethods = [
  {
    icon: Wallet,
    title: "PayPal",
    description: "Secure instant payments",
  },
  {
    icon: CreditCard,
    title: "Credit Card",
    description: "Powered by G2A",
  },
  {
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
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

const stats = [
  { icon: Zap, label: "Fast Delivery", value: "< 5 min" },
  { icon: Users, label: "Trusted By", value: "1,000+" },
  { icon: Clock, label: "Uptime", value: "99.9%" },
]

export function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="pricing" ref={sectionRef} className="relative py-20 sm:py-28 px-6">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[120px]" />

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          {/* LEFT: Pricing image - constrained size */}
          <div
            className={`relative w-full max-w-[300px] mx-auto lg:mx-0 shrink-0 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Outer soft glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-primary/30 via-transparent to-primary/30 opacity-50 blur-xl animate-pulse-glow" />

            {/* Border glow */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-primary/40 via-primary/10 to-primary/40" />

            {/* Image card */}
            <div className="relative rounded-2xl overflow-hidden border border-primary/15 bg-card/90 backdrop-blur-sm shadow-[0_0_50px_-15px_rgba(168,85,247,0.2)]">
              <Image
                src="/images/prices.png"
                alt="RAVEN Shop pricing - Robux tiers and prices"
                width={300}
                height={520}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* RIGHT: Payment methods + stats + CTA */}
          <div className="flex-1 w-full lg:pt-4">
            {/* Section label */}
            <p
              className={`text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 transition-all duration-600 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Payment Methods
            </p>
            <h2
              className={`text-2xl sm:text-3xl font-bold text-foreground mb-2 transition-all duration-600 delay-150 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Multiple ways to pay
            </h2>
            <p
              className={`text-sm text-muted-foreground leading-relaxed mb-8 max-w-md transition-all duration-600 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              All transactions are processed securely. Choose your preferred payment method below.
            </p>

            {/* Payment method cards - 2x2 grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {paymentMethods.map((method, index) => {
                const IconComponent = method.icon
                return (
                  <div
                    key={method.title}
                    className={`group relative rounded-xl border border-border bg-card/60 backdrop-blur-sm p-4 transition-all duration-500 hover:border-primary/30 hover:bg-card ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: `${index * 80 + 250}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/15 group-hover:bg-primary/15 transition-colors">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{method.title}</h3>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Stats row */}
            <div
              className={`flex items-center gap-6 mb-8 transition-all duration-600 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={stat.label} className="flex items-center gap-2">
                    {index > 0 && <div className="w-px h-8 bg-border -ml-3 mr--1" />}
                    <IconComponent className="h-4 w-4 text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-foreground leading-tight">{stat.value}</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">{stat.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA + security */}
            <div
              className={`transition-all duration-600 delay-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <a
                href="https://discord.gg/yYyWCeMj"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-accent hover:shadow-[0_0_36px_rgba(168,85,247,0.4)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <svg className="relative h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                </svg>
                <span className="relative">Purchase Now on Discord</span>
              </a>

              <div className="flex items-center gap-1.5 mt-4 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary/70" />
                <span>All transactions are secure and encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
