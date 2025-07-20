"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Code, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ParticlesBackground } from "@/components/particles-background"
import { AnimatedText } from "@/components/animated-text"
import { ScrollProgress } from "@/components/scroll-progress"
import { MobileMenu } from "@/components/mobile-menu"
import { ProcessStep } from "@/components/process-step"
import { SectionHeading } from "@/components/section-heading"
import { FloatingNav } from "@/components/floating-nav"
import { useMobile } from "@/hooks/use-mobile"
import { SectionDivider } from "@/components/section-divider"

import Footer from "@/components/layout/footer"
import { Contact } from "@/components/layout/contact"
import { AboutSection } from "@/components/layout/apropos"
import { Blog } from "@/components/layout/blog"
import { Techno } from "@/components/layout/techno"
import { Services } from "@/components/layout/services"
import { Projets } from "@/components/layout/projets"
import { Showcase } from "@/components/layout/showcase"
import { HeroSection } from "@/components/layout/hero"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const isMobile = useMobile()

  // Références pour les sections
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    showcase: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    process: useRef<HTMLDivElement>(null),
    technologies: useRef<HTMLDivElement>(null),
    blog: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  }

  const sections = Object.entries(sectionRefs).map(([id, ref]) => ({ id, ref }))

  const y = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((section) => {
      if (section.ref.current) observer.observe(section.ref.current)
    })

    return () => {
      sections.forEach((section) => {
        if (section.ref.current) observer.unobserve(section.ref.current)
      })
    }
  }, [])

  const desktopNavItems = [
    { name: "Accueil", href: "#home" },
    { name: "Showcase", href: "#showcase" },
    { name: "Projets", href: "#projects" },
    { name: "Technologies", href: "#technologies" },
    { name: "Blog", href: "#blog" },
    { name: "À propos", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  const allNavItems = sections.map(({ id }) => ({
    name: id.charAt(0).toUpperCase() + id.slice(1),
    href: `#${id}`,
  }))

  const floatingNavItems = [
    { name: "Accueil", href: "#home", icon: <span>🏠</span> },
    { name: "Showcase", href: "#showcase", icon: <span>✨</span> },
    { name: "Projets", href: "#projects", icon: <span>💻</span> },
    { name: "Technologies", href: "#technologies", icon: <span>⚙️</span> },
    { name: "À propos", href: "#about", icon: <span>👨‍💻</span> },
    { name: "Contact", href: "#contact", icon: <span>📧</span> },
  ]

  const devImages = [
    { src: "/img-carousel/devaction.jpg", alt: "Développeur en action" },
    { src: "/img-carousel/espwork.jpg", alt: "Espace de travail moderne" },
    { src: "/img-carousel/teamwork.jpg", alt: "Collaboration d'équipe" },
    { src: "/img-carousel/code.jpg", alt: "Session de code" },
  ]

  const carouselImages = [
    { src: "/projets/task.png", alt: "Projet 1" },
    { src: "/projets/learnwithia.png", alt: "Projet 2" },
    { src: "/projets/beningastro.png", alt: "Projet 3" },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-background/80">
      <ScrollProgress />
      <ParticlesBackground />

      {isMobile && (
        <FloatingNav navItems={floatingNavItems} className="bottom-4 left-1/2 -translate-x-1/2 md:hidden" />
      )}

      <header className="fixed top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/10"
            >
              <Code className="h-5 w-5 text-primary" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">
              <AnimatedText text="JB Dev" />
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {desktopNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ${
                    activeSection === item.href.substring(1) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
            <AnimatePresence>
              {isMobileMenuOpen && (
                <MobileMenu
                  activeSection={activeSection}
                  navItems={allNavItems}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <main className="relative">
        <HeroSection sectionRef={sectionRefs.home} y={y} opacity={opacity} />
        <Showcase sectionRef={sectionRefs.showcase} devImages={devImages} carouselImages={carouselImages} />
        <SectionDivider />
        <Projets sectionRef={sectionRefs.projects} />
        <SectionDivider />
        <Services sectionRef={sectionRefs.services} />

        <SectionDivider />

        <section id="process" ref={sectionRefs.process} className="relative py-20 md:py-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
          </div>

          <div className="container relative z-10 space-y-16">
            <SectionHeading title="Ma Méthodologie" subtitle="Une approche structurée pour des projets réussis." />
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              <ProcessStep number="01" title="Analyse" description="Compréhension..." index={0} />
              <ProcessStep number="02" title="Conception" description="Maquettes et architecture..." index={1} />
              <ProcessStep number="03" title="Développement" description="Codage avec retours..." index={2} />
              <ProcessStep number="04" title="Livraison" description="Tests, déploiement..." index={3} />
            </div>
          </div>
        </section>

        <SectionDivider />
        <Techno sectionRef={sectionRefs.technologies} />
        <SectionDivider />
        <Blog sectionRef={sectionRefs.blog} />
        <SectionDivider />
        <AboutSection sectionRef={sectionRefs.about} />
        <SectionDivider />
        <Contact sectionRef={sectionRefs.contact} />
      </main>

      <Footer desktopNavItems={desktopNavItems} />
    </div>
  )
}
