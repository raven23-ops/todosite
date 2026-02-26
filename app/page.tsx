import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { StarfieldBackground } from "@/components/starfield-background"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Starfield background */}
      <StarfieldBackground />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Navbar />

      <HeroSection />

      {/* Divider */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <PricingSection />

      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <FaqSection />

      <Footer />
    </main>
  )
}
