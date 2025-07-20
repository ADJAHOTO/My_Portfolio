"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { BlogCard } from '@/components/blog-card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface Certification {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  pdfUrl: string;
}

interface BlogSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export function Blog({ sectionRef }: BlogSectionProps) {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const certifications: Certification[] = [
    {
      title: "Certification Git et Github",
      excerpt: "Certification officielle de openclassroom attestant ma maitrise des bases des outils Git et Github.",
      date: "15 Décembre 2024",
      category: "Développement",
      imageUrl: "/certif/git.png", // Remplacez par le chemin de votre image de prévisualisation
      pdfUrl: "/certif/Git_Github.pdf" // Remplacez par le chemin de votre PDF
    },
    {
      title: "Certification Javascript",
      excerpt: "Certification officielle de openclassroom attestant ma maitrise des bases du javascript.",
      date: "28 Janvier 2025",
      category: "Developpement",
      imageUrl: "/certif/js.png",
      pdfUrl: "/certif/JavaScript.pdf"
    },
    {
      title: "Meta Back-End Développeur ",
      excerpt: "Formation en cours de 8 mois sur coursera pour etre certifié developpeur backend agrégé par Meta.",
      date: "En cours",
      category: "Back-End Development",
      imageUrl: "/certif/back.png",
      pdfUrl: "/certif/Coursera TRXLO0C3FFM4.pdf"
    }
  ];

  return (
    <section id="blog" ref={sectionRef} className="relative py-20 md:py-32">
      <div className="container relative z-10 space-y-16">
        <SectionHeading
          title="Mes Certifications"
          subtitle="Les différents certifications que j'ai pu acquérir pour renforcer mes compétences."
        />

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certif, index) => (
            <Dialog 
              key={index} 
              open={openDialog === certif.pdfUrl} 
              onOpenChange={(isOpen) => setOpenDialog(isOpen ? certif.pdfUrl : null)}
            >
              <DialogTrigger asChild>
                <div>
                  <BlogCard
                    title={certif.title}
                    excerpt={certif.excerpt}
                    date={certif.date}
                    category={certif.category}
                    imageUrl={certif.imageUrl}
                    slug="#"
                    index={index}
                  />
                </div>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl h-[90vh]">
                <div className="h-full w-full">
                  <iframe 
                    src={certif.pdfUrl} 
                    width="100%" 
                    height="100%" 
                    className="border-0"
                    allowFullScreen
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
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
            <Link href="#" className="flex items-center gap-2">
              Voir toutes les certifications
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}