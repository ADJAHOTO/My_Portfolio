// components/sections/ServicesSection.tsx
"use client"; // Probablement nécessaire si ServiceCard a des animations ou interactivité

import React from 'react';
// Importez les icônes nécessaires
import { Layers, Zap, Sparkles, Rocket, Users, MessageSquare } from 'lucide-react';

// Importez vos composants UI
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card'; // Assurez-vous que ServiceCard est aussi un composant client si nécessaire

// Définissez l'interface pour les props
interface ServicesSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>; // Correction pour le type null
}

export function Services({ sectionRef }: ServicesSectionProps) {
  return (
    <section id="services" ref={sectionRef} className="relative py-20 md:py-32">
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
  );
}