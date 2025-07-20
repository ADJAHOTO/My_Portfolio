// components/sections/ContactSection.jsx
"use client"; // Indique que ce composant s'exécute côté client

import React from 'react';
import { motion } from 'framer-motion'; // Importez motion de Framer Motion

// Importez vos composants UI et de formulaire
import { SectionHeading } from '@/components/section-heading';
import { ContactForm } from '@/components/contact-form'; // Assurez-vous que ContactForm est bien un composant client aussi

interface ContactSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export function Contact({ sectionRef }: ContactSectionProps) {
  return (
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-32">
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
  );
}