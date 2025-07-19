"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Code,
  Github,
  Linkedin,
  Mail,
  ArrowDown,
  ChevronRight,
  Zap,
  Sparkles,
  Layers,
  Rocket,
  Users,
  MessageSquare,
  Menu,
  X,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ProjectCard } from "@/components/project-card"
import { TechBadge } from "@/components/tech-badge"
import { ContactForm } from "@/components/contact-form"
import { ParticlesBackground } from "@/components/particles-background"
import { GlowingButton } from "@/components/glowing-button"
import { AnimatedText } from "@/components/animated-text"
import { HeroImage } from "@/components/hero-image"
import { TimelineItem } from "@/components/timeline-item"
import { ScrollProgress } from "@/components/scroll-progress"
import { MobileMenu } from "@/components/mobile-menu"
import { BlogCard } from "@/components/blog-card"
import { ServiceCard } from "@/components/service-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { ProcessStep } from "@/components/process-step"
import { SectionHeading } from "@/components/section-heading"
import { FloatingNav } from "@/components/floating-nav"
import { useMobile } from "@/hooks/use-mobile"
import { DevShowcase } from "@/components/dev-showcase"
import { SectionDivider } from "@/components/section-divider"
import { ImageCarousel } from "@/components/image-carousel"

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
    { src: "/placeholder.svg?height=600&width=800", alt: "Développeur en action" },
    { src: "/placeholder.svg?height=600&width=800", alt: "Espace de travail moderne" },
    { src: "/placeholder.svg?height=600&width=800", alt: "Collaboration d'équipe" },
    { src: "/placeholder.svg?height=600&width=800", alt: "Session de code" },
  ]

  // Images for the carousel
  const carouselImages = [
    { src: "/placeholder.svg?height=600&width=1200", alt: "Projet 1" },
    { src: "/placeholder.svg?height=600&width=1200", alt: "Projet 2" },
    { src: "/placeholder.svg?height=600&width=1200", alt: "Projet 3" },
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
        <section
          id="home"
          ref={sections[0].ref}
          className="relative flex min-h-screen items-center justify-center pt-16"
        >
          <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-70" />
          </motion.div>

          <div className="container relative z-10">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-md border border-primary/20"
                  >
                    <span className="relative overflow-hidden inline-block">
                      <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        Étudiant en Licence 3 à IFRI
                      </motion.span>
                    </span>
                  </motion.div>

                  <div className="space-y-4">
                    <motion.h1
                      className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <motion.span
                        className="inline-block bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                          delay: 0.5,
                        }}
                      >
                        ADJAHOTO
                      </motion.span>{" "}
                      <motion.span
                        className="inline-block bg-gradient-to-r from-purple-400 to-primary bg-clip-text text-transparent"
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                          delay: 0.7,
                        }}
                      >
                        Jean Bénisse
                      </motion.span>
                    </motion.h1>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    <p className="text-xl text-muted-foreground md:text-2xl relative overflow-hidden leading-relaxed">
                      <motion.span
                        initial={{ y: 40 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        className="block"
                      >
                        <span className="text-primary font-medium">Passionné</span> de développement web, je transforme
                        des
                        <span className="relative mx-2">
                          <motion.span
                            className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                          />
                          <span className="relative">concepts</span>
                        </span>
                        en
                        <span className="relative mx-2">
                          <motion.span
                            className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 1.7 }}
                          />
                          <span className="relative">solutions digitales</span>
                        </span>
                        <span className="text-primary font-medium">innovantes</span>.
                      </motion.span>
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  >
                    <GlowingButton asChild>
                      <Link href="#projects">Découvrir mes projets</Link>
                    </GlowingButton>
                    <Button variant="outline" size="lg" asChild className="group border-primary/20 backdrop-blur-md">
                      <Link href="#contact" className="flex items-center gap-2">
                        Me contacter
                        <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className="relative mx-auto max-w-[450px]"
              >
                <HeroImage />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <Link href="#showcase" className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <span>Scroll pour découvrir</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <ArrowDown className="h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Developer Showcase Section */}
        <section id="showcase" ref={sections[1].ref} className="relative py-20 md:py-32">
          <div className="container relative z-10 space-y-16">
            <SectionHeading
              title="Développeur en Action"
              subtitle="Découvrez mon univers de développement et mes réalisations."
            />

            <div className="grid gap-12 md:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h3 className="text-3xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    Transformer des idées en expériences digitales
                  </span>
                </h3>

                <p className="text-xl leading-relaxed text-muted-foreground">
                  En tant que développeur web passionné, je m&apos;efforce de créer des applications
                  <span className="mx-2 text-primary font-medium">performantes</span>,
                  <span className="mx-2 text-primary font-medium">accessibles</span> et
                  <span className="mx-2 text-primary font-medium">esthétiques</span>.
                </p>

                <p className="text-xl leading-relaxed text-muted-foreground">
                  Chaque ligne de code est une opportunité de résoudre un problème et d&apos;améliorer l&apos;expérience
                  utilisateur.
                </p>

                <div className="flex flex-wrap gap-6">
                  <Button variant="outline" size="lg" asChild className="group border-primary/20 backdrop-blur-md">
                    <Link href="#projects" className="flex items-center gap-2">
                      Voir mes projets
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="group bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                  >
                    <Link href="#contact" className="flex items-center gap-2">
                      Discuter d&apos;un projet
                      <ExternalLink className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[500px] w-full"
              >
                <DevShowcase images={devImages} />
              </motion.div>
            </div>

            <div className="mt-16">
              <ImageCarousel images={carouselImages} className="mx-auto max-w-5xl" />
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Projects Section */}
        <section id="projects" ref={sections[2].ref} className="relative py-20 md:py-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
          </div>

          <div className="container relative z-10 space-y-16">
            <SectionHeading
              title="Projets Académiques"
              subtitle="Découvrez une sélection de mes réalisations pendant mon parcours à IFRI."
            />

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                index={0}
                title="Système de Gestion Scolaire"
                description="Application web permettant la gestion des étudiants, des cours et des notes pour une institution éducative."
                tags={["React", "Node.js", "MongoDB", "Express"]}
                imageUrl="/placeholder.svg?height=300&width=500"
                demoUrl="#"
                repoUrl="#"
              />
              <ProjectCard
                index={1}
                title="Application de Quiz Interactif"
                description="Plateforme de quiz en temps réel pour les étudiants avec système de classement et statistiques personnalisées."
                tags={["Next.js", "Firebase", "Tailwind CSS", "TypeScript"]}
                imageUrl="/placeholder.svg?height=300&width=500"
                demoUrl="#"
                repoUrl="#"
              />
              <ProjectCard
                index={2}
                title="Portfolio Personnel"
                description="Site web personnel présentant mes compétences, projets et parcours académique avec un design moderne et responsive."
                tags={["React", "Framer Motion", "Tailwind CSS", "Next.js"]}
                imageUrl="/placeholder.svg?height=300&width=500"
                demoUrl="#"
                repoUrl="#"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Button variant="outline" size="lg" asChild className="group border-primary/20 backdrop-blur-md">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  Voir plus sur GitHub
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* Services Section */}
        <section id="services" ref={sections[3].ref} className="relative py-20 md:py-32">
          <div className="container relative z-10 space-y-16">
            <SectionHeading title="Mes Services" subtitle="Des solutions adaptées pour vos projets web." />

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                icon={<Layers className="h-10 w-10" />}
                title="Développement Frontend"
                description="Création d'interfaces utilisateur modernes et responsives avec React, Next.js et Tailwind CSS."
                index={0}
              />
              <ServiceCard
                icon={<Zap className="h-10 w-10" />}
                title="Développement Backend"
                description="Mise en place d'APIs et de bases de données pour alimenter vos applications web."
                index={1}
              />
              <ServiceCard
                icon={<Sparkles className="h-10 w-10" />}
                title="Intégration Web"
                description="Intégration de maquettes et création de sites web statiques avec HTML, CSS et JavaScript."
                index={2}
              />
              <ServiceCard
                icon={<Rocket className="h-10 w-10" />}
                title="Optimisation Performance"
                description="Amélioration des performances de vos sites web pour une expérience utilisateur optimale."
                index={3}
              />
              <ServiceCard
                icon={<Users className="h-10 w-10" />}
                title="Projets Académiques"
                description="Collaboration sur des projets académiques et aide aux étudiants en informatique."
                index={4}
              />
              <ServiceCard
                icon={<MessageSquare className="h-10 w-10" />}
                title="Support Technique"
                description="Assistance et dépannage pour vos projets web existants."
                index={5}
              />
            </div>
          </div>
        </section>

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
        <section id="technologies" ref={sections[5].ref} className="relative py-20 md:py-32">
          <div className="container relative z-10 space-y-16">
            <SectionHeading
              title="Stack Technologique"
              subtitle="Les technologies que j'utilise pour développer des applications web modernes."
            />

            <div className="grid gap-16">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold">Frontend</h3>
                <div className="flex flex-wrap gap-5">
                  {[
                    { name: "HTML/CSS", icon: "/placeholder.svg?height=40&width=40", delay: 0 },
                    { name: "JavaScript", icon: "/placeholder.svg?height=40&width=40", delay: 0.1 },
                    { name: "React", icon: "/placeholder.svg?height=40&width=40", delay: 0.2 },
                    { name: "Next.js", icon: "/placeholder.svg?height=40&width=40", delay: 0.3 },
                    { name: "Tailwind CSS", icon: "/placeholder.svg?height=40&width=40", delay: 0.4 },
                    { name: "Framer Motion", icon: "/placeholder.svg?height=40&width=40", delay: 0.5 },
                  ].map((tech) => (
                    <TechBadge key={tech.name} name={tech.name} icon={tech.icon} delay={tech.delay} />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold">Backend</h3>
                <div className="flex flex-wrap gap-5">
                  {[
                    { name: "Node.js", icon: "/placeholder.svg?height=40&width=40", delay: 0 },
                    { name: "Express", icon: "/placeholder.svg?height=40&width=40", delay: 0.1 },
                    { name: "MongoDB", icon: "/placeholder.svg?height=40&width=40", delay: 0.2 },
                    { name: "MySQL", icon: "/placeholder.svg?height=40&width=40", delay: 0.3 },
                    { name: "Firebase", icon: "/placeholder.svg?height=40&width=40", delay: 0.4 },
                    { name: "REST API", icon: "/placeholder.svg?height=40&width=40", delay: 0.5 },
                  ].map((tech) => (
                    <TechBadge key={tech.name} name={tech.name} icon={tech.icon} delay={tech.delay} />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold">Outils & Autres</h3>
                <div className="flex flex-wrap gap-5">
                  {[
                    { name: "Git", icon: "/placeholder.svg?height=40&width=40", delay: 0 },
                    { name: "GitHub", icon: "/placeholder.svg?height=40&width=40", delay: 0.1 },
                    { name: "VS Code", icon: "/placeholder.svg?height=40&width=40", delay: 0.2 },
                    { name: "Figma", icon: "/placeholder.svg?height=40&width=40", delay: 0.3 },
                    { name: "Vercel", icon: "/placeholder.svg?height=40&width=40", delay: 0.4 },
                    { name: "Netlify", icon: "/placeholder.svg?height=40&width=40", delay: 0.5 },
                  ].map((tech) => (
                    <TechBadge key={tech.name} name={tech.name} icon={tech.icon} delay={tech.delay} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Testimonials Section */}
        <section id="testimonials" ref={sections[6].ref} className="relative py-20 md:py-32">
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

        <SectionDivider />

        {/* Blog Section */}
        <section id="blog" ref={sections[7].ref} className="relative py-20 md:py-32">
          <div className="container relative z-10 space-y-16">
            <SectionHeading
              title="Blog & Insights"
              subtitle="Mes réflexions sur les technologies web et mon parcours d'apprentissage."
            />

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              <BlogCard
                title="Mon expérience avec Next.js"
                excerpt="Comment Next.js a transformé ma façon de développer des applications web et accéléré mon workflow."
                date="15 Avril 2023"
                category="Développement"
                imageUrl="/placeholder.svg?height=300&width=500"
                slug="/blog/experience-nextjs"
                index={0}
              />
              <BlogCard
                title="L'importance de l'UI/UX dans les projets web"
                excerpt="Pourquoi l'expérience utilisateur est cruciale pour le succès de vos applications et comment l'améliorer."
                date="28 Mars 2023"
                category="Design"
                imageUrl="/placeholder.svg?height=300&width=500"
                slug="/blog/importance-ui-ux"
                index={1}
              />
              <BlogCard
                title="Mon parcours à IFRI"
                excerpt="Retour sur mes trois années d'études à l'Institut de Formation et de Recherche en Informatique."
                date="10 Février 2023"
                category="Parcours"
                imageUrl="/placeholder.svg?height=300&width=500"
                slug="/blog/parcours-ifri"
                index={2}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Button
                asChild
                className="group bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
              >
                <Link href="/blog" className="flex items-center gap-2">
                  Voir tous les articles
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* About Section */}
        <section id="about" ref={sections[8].ref} className="relative py-20 md:py-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
          </div>

          <div className="container relative z-10 space-y-16">
            <SectionHeading title="À Propos de Moi" subtitle="Mon parcours, mes passions et mes objectifs." />

            <div className="grid gap-16 md:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <motion.h3
                    className="text-2xl font-bold relative inline-block"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                      Mon Parcours
                    </span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-primary to-purple-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </motion.h3>
                  <motion.p
                    className="text-lg text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Je suis <span className="text-primary font-medium">ADJAHOTO Jean Bénisse</span>, étudiant en Licence
                    3 à l&apos;Institut de Formation et de Recherche en Informatique (IFRI). Passionné par le développement
                    web, je me spécialise dans la création d&apos;applications modernes et performantes.
                  </motion.p>
                  <motion.p
                    className="text-lg text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Mon parcours académique m&apos;a permis d&apos;acquérir de solides compétences techniques tout en développant
                    ma créativité et ma capacité à résoudre des problèmes complexes. Je suis constamment à la recherche
                    de nouvelles technologies et méthodologies pour améliorer mes compétences et rester à la pointe de
                    l&apos;innovation dans le domaine du développement web.
                  </motion.p>
                </div>

                <div className="space-y-6">
                  <motion.h3
                    className="text-2xl font-bold relative inline-block"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                      Parcours Académique
                    </span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-primary to-purple-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </motion.h3>
                  <div className="space-y-8">
                    <TimelineItem
                      year="2022 - Présent"
                      title="Licence en Informatique"
                      company="IFRI"
                      description="Spécialisation en développement d'applications et systèmes d'information."
                    />
                    <TimelineItem
                      year="2020 - 2022"
                      title="DEUG en Informatique"
                      company="IFRI"
                      description="Formation fondamentale en algorithmique, programmation et mathématiques."
                    />
                    <TimelineItem
                      year="2019 - 2020"
                      title="Baccalauréat Scientifique"
                      company="Lycée Technique"
                      description="Obtention du baccalauréat avec mention, spécialité mathématiques."
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mx-auto"
              >
                <motion.div
                  className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl opacity-70"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative aspect-square overflow-hidden rounded-xl border border-primary/20 backdrop-blur-sm hover-3d">
                  <Image
                    src="/placeholder.svg?height=500&width=500"
                    alt="Portrait de Jean Bénisse"
                    width={500}
                    height={500}
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <motion.h3
                      className="text-xl font-bold"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      ADJAHOTO Jean Bénisse
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      Étudiant en L3 Informatique
                    </motion.p>
                    <motion.div
                      className="mt-4 flex justify-center gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="rounded-full border-primary/20 backdrop-blur-md"
                      >
                        <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="rounded-full border-primary/20 backdrop-blur-md"
                      >
                        <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="rounded-full border-primary/20 backdrop-blur-md"
                      >
                        <Link href="mailto:contact@example.com">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Contact Section */}
        <section id="contact" ref={sections[9].ref} className="relative py-20 md:py-32">
          <div className="container relative z-10">
            <div className="mx-auto max-w-[800px] space-y-16">
              <SectionHeading
                title="Contactez-Moi"
                subtitle="Vous avez un projet ou une question ? N'hésitez pas à me contacter !"
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl opacity-50" />
                <div className="relative rounded-xl border border-primary/20 bg-background/80 p-8 backdrop-blur-md">
                  <ContactForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-12 md:py-16">
        <div className="container flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
            >
              <Code className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">ADJAHOTO Jean Bénisse</span>
          </div>

          <div className="flex flex-wrap gap-6 md:gap-10">
            {desktopNavItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex gap-4">
            <Button variant="outline" size="icon" asChild className="rounded-full border-primary/20 backdrop-blur-md">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="rounded-full border-primary/20 backdrop-blur-md">
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="rounded-full border-primary/20 backdrop-blur-md">
              <Link href="mailto:contact@example.com">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="container mt-10 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ADJAHOTO Jean Bénisse. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
