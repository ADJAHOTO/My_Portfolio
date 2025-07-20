// import { Suspense } from "react"
// import HomePage from "@/components/home-page"

// export default function Home() {
//   return (
//     <Suspense fallback={<div>Chargement...</div>}>
//       <HomePage />
//     </Suspense>
//   )
// }


"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Code,
 
  Menu,
  X,
  
} from "lucide-react"

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

import  Footer  from "@/components/layout/footer"
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

  const sections = [
    { id: "home", ref: useRef<HTMLDivElement>(null), label: "Accueil" },
    { id: "showcase", ref: useRef<HTMLDivElement>(null), label: "Showcase" },
    { id: "projects", ref: useRef<HTMLDivElement>(null), label: "Projets" },
    { id: "services", ref: useRef<HTMLDivElement>(null), label: "Services" },
    { id: "process", ref: useRef<HTMLDivElement>(null), label: "Processus" },
    { id: "technologies", ref: useRef<HTMLDivElement>(null), label: "Technologies" },
    { id: "testimonials", ref: useRef<HTMLDivElement>(null), label: "Témoignages" },
    { id: "blog", ref: useRef<HTMLDivElement>(null), label: "Blog" },
    { id: "about", ref: useRef<HTMLDivElement>(null), label: "À propos" },
    { id: "contact", ref: useRef<HTMLDivElement>(null), label: "Contact" },
  ]

  // Parallax effect for hero section
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  // Check which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current)
      }
    })

    return () => {
      sections.forEach((section) => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current)
        }
      })
    }
  }, [])

  // Reduced nav items for desktop to avoid overflow
  const desktopNavItems = [
    { name: "Accueil", href: "#home" },
    { name: "Showcase", href: "#showcase" },
    { name: "Projets", href: "#projects" },
    { name: "Technologies", href: "#technologies" },
    { name: "Blog", href: "#blog" },
    { name: "À propos", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  // All nav items for mobile menu
  const allNavItems = sections.map((section) => ({
    name: section.label,
    href: `#${section.id}`,
  }))

  // Floating nav for mobile
  const floatingNavItems = [
    {
      name: "Accueil",
      href: "#home",
      icon: <span className="h-4 w-4">🏠</span>,
    },
    {
      name: "Showcase",
      href: "#showcase",
      icon: <span className="h-4 w-4">✨</span>,
    },
    {
      name: "Projets",
      href: "#projects",
      icon: <span className="h-4 w-4">💻</span>,
    },
    {
      name: "Technologies",
      href: "#technologies",
      icon: <span className="h-4 w-4">⚙️</span>,
    },
    {
      name: "À propos",
      href: "#about",
      icon: <span className="h-4 w-4">👨‍💻</span>,
    },
    {
      name: "Contact",
      href: "#contact",
      icon: <span className="h-4 w-4">📧</span>,
    },
  ]

  // Images for the developer showcase
  const devImages = [
    { src: "/img-carousel/devaction.jpg?height=600&width=800", alt: "Développeur en action" },
    { src: "/img-carousel/espwork.jpg?height=600&width=800", alt: "Espace de travail moderne" },
    { src: "/img-carousel/teamwork.jpg?height=600&width=800", alt: "Collaboration d'équipe" },
    { src: "/img-carousel/code.jpg?height=600&width=800", alt: "Session de code" },
  ]

  // Images for the carousel
  const carouselImages = [
    { src: "/projets/task.png?height=600&width=1200", alt: "Projet 1" },
    { src: "/projets/learnwithia.png?height=600&width=1200", alt: "Projet 2" },
    { src: "/projets/beningastro.png?height=600&width=1200", alt: "Projet 3" },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-background/80">
      <ScrollProgress />
      <ParticlesBackground />

      {/* Floating Nav for Mobile */}
      {isMobile && <FloatingNav navItems={floatingNavItems} className="bottom-4 left-1/2 -translate-x-1/2 md:hidden" />}

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/10"
            >
              <Code className="h-5 w-5 text-primary" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">
              <AnimatedText text="JB Dev" />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {desktopNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1) ? "text-primary" : "text-foreground/80 hover:text-primary"
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
                className="relative z-50"
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
        {/* Hero Section */}
         <HeroSection
          sectionRef={sections[0].ref}
          scrollYProgress={scrollYProgress}
          y={y}
          opacity={opacity}
        />

        {/* Developer Showcase Section */}
         <Showcase
          sectionRef={sections[1].ref}
          devImages={devImages}
          carouselImages={carouselImages}
        /> 
  

        <SectionDivider />

        {/* Projects Section */}
        <Projets sectionRef={sections[2].ref} />

      

        <SectionDivider />

        {/* Services Section */}
        <Services sectionRef={sections[3].ref} />
          
        <SectionDivider />

        {/* Process Section */}
        <section id="process" ref={sections[4].ref} className="relative py-20 md:py-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
          </div>

          <div className="container relative z-10 space-y-16">
            <SectionHeading title="Ma Méthodologie" subtitle="Une approche structurée pour des projets réussis." />

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              <ProcessStep
                number="01"
                title="Analyse"
                description="Compréhension approfondie de vos besoins et objectifs pour définir le périmètre du projet."
                index={0}
              />
              <ProcessStep
                number="02"
                title="Conception"
                description="Élaboration de maquettes et définition de l'architecture technique pour visualiser le résultat final."
                index={1}
              />
              <ProcessStep
                number="03"
                title="Développement"
                description="Codage progressif avec des points de validation réguliers pour s'adapter à vos retours."
                index={2}
              />
              <ProcessStep
                number="04"
                title="Livraison"
                description="Tests finaux, déploiement et transfert de compétences pour assurer la pérennité de votre solution."
                index={3}
              />
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Technologies Section */}
        <Techno sectionRef={sections[5].ref} />
          

        <SectionDivider />

        {/* Testimonials Section */}
        {/* <section id="testimonials" ref={sections[6].ref} className="relative py-20 md:py-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
          </div>

          <div className="container relative z-10 space-y-16">
            <SectionHeading title="Témoignages" subtitle="Ce que mes camarades et professeurs disent de mon travail." />

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="Jean Bénisse est un étudiant brillant avec une grande capacité d'apprentissage et d'adaptation. Ses projets sont toujours bien structurés et innovants."
                author="Dr. Koffi Mensah"
                position="Professeur à IFRI"
                avatar="/placeholder.svg?height=100&width=100"
                index={0}
              />
              <TestimonialCard
                quote="Travailler avec Jean sur notre projet de groupe a été une expérience enrichissante. Sa rigueur et sa créativité ont grandement contribué à notre succès."
                author="Aïcha Konaté"
                position="Camarade de promotion"
                avatar="/placeholder.svg?height=100&width=100"
                index={1}
              />
              <TestimonialCard
                quote="Jean a une approche méthodique du développement web et une réelle passion pour les nouvelles technologies. Un étudiant prometteur avec un bel avenir."
                author="Prof. Amina Diallo"
                position="Responsable de filière à IFRI"
                avatar="/placeholder.svg?height=100&width=100"
                index={2}
              />
            </div>
          </div>
        </section>

        <SectionDivider /> */}

        {/* Blog Section */}
        <Blog sectionRef={sections[6].ref} />

        <SectionDivider />

        {/* About Section */}
        <AboutSection sectionRef={sections[7].ref} />

        <SectionDivider />

        {/* Contact Section */}
        <Contact sectionRef={sections[8].ref} />
      </main>

      {/* Footer */}
       <Footer desktopNavItems={desktopNavItems} />
    </div>
  )
}
