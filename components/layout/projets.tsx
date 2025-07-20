"use client"; 

import React from 'react';
import Link from 'next/link'; 
import { motion } from 'framer-motion'; 
import { Github } from 'lucide-react'; 


import { SectionHeading } from '@/components/section-heading';
import { ProjectCard } from '@/components/project-card'; 
import { Button } from '@/components/ui/button'; 

// Define the interface for the component's props
interface ProjectsSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>; 
}

export function Projets({ sectionRef }: ProjectsSectionProps) {
  return (
    <section id="projects" ref={sectionRef} className="relative py-20 md:py-32">
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
            title=" TaskFlow: Application Web de gestion des Taches"
            description="Application web permettant la gestion des taches; la visualtion des historiques et des taches et l'adaption pour permettre la gestion des utilisateurs et des admins."
            tags={["Next.js", "Postgresql", "Tailwind CSS", "TypeScript"]}
            imageUrl="/projets/task.png?height=300&width=500"
            demoUrl="https://taskflow-peach-alpha.vercel.app/"
            repoUrl="https://github.com/ADJAHOTO/TaskFlow.git"
          />
          <ProjectCard
            index={1}
            title="LinguaIA: Application web pour apprendre l'anglais"
            description="Plateforme pour apprendre l'anglais de maniere actif et interactif avec un modele d'IA pret a vous aider."
            tags={["Next.js", "Firebase", "Tailwind CSS", "TypeScript"]}
            imageUrl="/projets/learnwithia.png?height=300&width=500"
            demoUrl="#"
            repoUrl="#"
          />
          <ProjectCard
            index={2}
            title="Shopverse une application de e-commerce en ligne "
            description="Site web personnel présentant une plateforme d'achat de divers articles de haute gamme et de tout gout."
            tags={["Next.js", "TypeScript", "Tailwind CSS", "framer-motion"]}
            imageUrl="/projets/shopverse.png?height=300&width=500"
            demoUrl="https://benadjahoto-shop-modern.vercel.app/"
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
              href="https://github.com/ADJAHOTO" 
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
  );
}