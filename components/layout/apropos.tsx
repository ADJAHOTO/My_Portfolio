// components/sections/AboutSection.tsx
"use client"; // Indique que ce composant s'exécute côté client

import React from 'react';
import Image from 'next/image'; // Importez Image de Next.js
import Link from 'next/link';   // Importez Link de Next.js
import { motion } from 'framer-motion'; // Importez motion de Framer Motion
import { Github, Linkedin, Mail } from 'lucide-react'; // Importez les icônes nécessaires

// Importez vos composants UI
import { SectionHeading } from '@/components/section-heading';
import { TimelineItem } from '@/components/timeline-item'; // Assurez-vous que ce composant est créé et importé correctement
import { Button } from '@/components/ui/button'; // Votre composant Button de shadcn/ui

// Définissez l'interface pour les props
interface AboutSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>; // Correction pour le type null
}

export function AboutSection({ sectionRef }: AboutSectionProps) {
  return (
    <section id="about" ref={sectionRef} className="relative py-20 md:py-32">
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
                  year="2024 - 2025"
                  title="Licence en Génie Logiciel"
                  company="IFRI"
                  description="Spécialisation en développement d'applications Web et Mobile."
                />
                 <TimelineItem
                  year="2023 - 2024"
                  title="Deuxieme Année de Licence en Genie Logiciel"
                  company="IFRI"
                  description="Formation fondamentale en algorithmique, programmation et mathématiques."
                />
                <TimelineItem
                  year="2022 - 2023"
                  title="Premiere Année de Licence en Genie Logiciel"
                  company="IFRI"
                  description="Formation fondamentale en algorithmique, programmation et mathématiques."
                />
                <TimelineItem
                  year="2020 - 2021"
                  title="Baccalauréat Scientifique"
                  company="Complexe Scolaire Le Partage"
                  description="Obtention du baccalauréat avec mention, série scientifique."
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
                repeat: Infinity, // Correction de Number.POSITIVE_INFINITY
                ease: "easeInOut",
              }}
            />
            <div className="relative aspect-square overflow-hidden rounded-xl border border-primary/20 backdrop-blur-sm hover-3d">
              <Image
                src="/ben.png?height=500&width=500"
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
                    <Link href="https://github.com/ADJAHOTO" target="_blank" rel="noopener noreferrer"> {/* N'oubliez pas de personnaliser */}
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
                    <Link href="https://linkedin.com/in/votre_profil" target="_blank" rel="noopener noreferrer"> {/* N'oubliez pas de personnaliser */}
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
                  <Link href="mailto:jeanbenissea@gmail.com">
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
  );
}