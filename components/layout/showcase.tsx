"use client"; 

import React from 'react';
import Link from 'next/link'; 
import { motion } from 'framer-motion'; 
import { ChevronRight, ExternalLink } from 'lucide-react'; 

// Import your UI components
import { SectionHeading } from '@/components/section-heading';
import { DevShowcase } from '@/components/dev-showcase'; 
import { ImageCarousel } from '@/components/image-carousel'; 
import { Button } from '@/components/ui/button'; 

// Define the interface for the component's props
interface ShowcaseSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>; 
  devImages: { src: string; alt: string }[]; 
  carouselImages: { src: string; alt: string }[]; 
}

export function Showcase({ sectionRef, devImages, carouselImages }: ShowcaseSectionProps) {
  return (
    <section id="showcase" ref={sectionRef} className="relative py-20 md:py-32">
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
            {/* Make sure devImages is passed */}
            <DevShowcase images={devImages} />
          </motion.div>
        </div>

        <div className="mt-16">
          {/* Make sure carouselImages is passed */}
          <ImageCarousel images={carouselImages} className="mx-auto max-w-5xl" />
        </div>
      </div>
    </section>
  );
}