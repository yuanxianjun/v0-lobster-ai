"use client"

import { useState, useEffect, useCallback } from "react"
import { ParticleBackground } from "@/components/particle-background"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ComparisonTable } from "@/components/comparison-table"
import { RankingsSection } from "@/components/rankings-section"
import { TimelineSection } from "@/components/timeline-section"
import { GuidesSection } from "@/components/guides-section"
import { ProductWizard } from "@/components/product-wizard"
import { Footer } from "@/components/footer"

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")

  const handleNavigate = useCallback((section: string) => {
    const element = document.getElementById(section)
    if (element) {
      const offset = 80 // navbar height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "comparison", "rankings", "timeline", "guides", "wizard"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative min-h-screen bg-[#0f172a]">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Hero Section */}
      <div id="hero">
        <HeroSection onNavigate={handleNavigate} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Comparison Table */}
        <ComparisonTable />

        {/* Rankings Section */}
        <RankingsSection />

        {/* Timeline Section */}
        <TimelineSection />

        {/* Guides Section */}
        <GuidesSection />

        {/* Product Wizard */}
        <ProductWizard />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
