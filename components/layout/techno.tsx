// components/sections/TechnologiesSection.tsx
"use client"; // Indique que ce composant s'exécute côté client

import React from 'react';
import { motion } from 'framer-motion'; // Importez motion de Framer Motion

// Importez vos composants UI
import { SectionHeading } from '@/components/section-heading';
import { TechBadge } from '@/components/tech-badge'; // Assurez-vous que TechBadge est bien un composant client

// Définissez l'interface pour les props
interface TechnologiesSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>; // Correction pour le type null
}

export function Techno({ sectionRef }: TechnologiesSectionProps) {
  return (
    <section id="technologies" ref={sectionRef} className="relative py-20 md:py-32">
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
                { name: "HTML", icon: "/techno/html-svgrepo-com.svg?height=40&width=40", delay: 0 },
                { name: "CSS", icon: "/techno/css-3.svg?height=40&width=40", delay: 0.1 },
                { name: "Tailwind CSS", icon: "/techno/tailwindcss-icon.svg?height=40&width=40", delay: 0.2 },
                { name: "Bootstrap", icon: "/techno/bootstrap.svg?height=40&width=40", delay: 0.3 },
                { name: "TypeScript", icon: "/techno/typescript.svg?height=40&width=40", delay: 0.4 },
                { name: "JavaScript", icon: "/techno/javascript.svg?height=40&width=40", delay: 0.5 },
                { name: "React", icon: "/techno/reactts.svg?height=40&width=40", delay: 0.6 },
                { name: "Next.js", icon: "/techno/nextjs-fill.svg?height=40&width=40", delay: 0.7 },
                { name: "Vue.js", icon: "/techno/vue-vuejs-javascript-js-framework.svg?height=40&width=40", delay: 0.8 },
                { name: "Framer Motion", icon: "/techno/motion.png?height=40&width=40", delay: 0.9 }
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
                { name: "Node.js", icon: "/techno/node-js.svg?height=40&width=40", delay: 0 },
                { name: "Express", icon: "/techno/express.svg?height=40&width=40", delay: 0.1 },
                { name: "MongoDB", icon: "/techno/mongo.svg?height=40&width=40", delay: 0.2 },
                { name: "MySQL", icon: "/techno/mysql.svg?height=40&width=40", delay: 0.3 },
                { name: "Firebase", icon: "/techno/firebase.svg?height=40&width=40", delay: 0.4 },
                { name: "Prisma", icon: "/techno/light-prisma.svg?height=40&width=40", delay: 0.5 },
                { name: "PostgreSQL", icon: "/techno/postgresql-logo.svg?height=40&width=40", delay: 0.6 },
                { name: "REST API", icon: "/techno/rest-api.svg?height=40&width=40", delay: 0.7 },
                { name: "Fastapi", icon: "/techno/fastapi.svg?height=40&width=40", delay: 0.8 },
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
                { name: "Git", icon: "/techno/git.svg?height=40&width=40", delay: 0 },
                { name: "GitHub", icon: "/techno/github-142.svg?height=40&width=40", delay: 0.1 },
                { name: "VS Code", icon: "/techno/vs-code.svg?height=40&width=40", delay: 0.2 },
                { name: "Figma", icon: "/techno/figma.svg?height=40&width=40", delay: 0.3 },
                { name: "Vercel", icon: "/techno/vercel-logo.svg?height=40&width=40", delay: 0.4 },
                { name: "Netlify", icon: "/techno/netlify.svg?height=40&width=40", delay: 0.5 },
              ].map((tech) => (
                <TechBadge key={tech.name} name={tech.name} icon={tech.icon} delay={tech.delay} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}