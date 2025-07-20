// components/layout/Footer.jsx
"use client"; // Indique que ce composant s'exécute côté client

import React from 'react';
import Link from 'next/link'; // Importez Link de Next.js
import { motion } from 'framer-motion'; // Importez motion de Framer Motion
import { Code, Github, Linkedin, Mail } from 'lucide-react'; // Importez les icônes nécessaires

// Importez les composants UI que vous utilisez
import { Button } from '@/components/ui/button';

const Footer = ({ desktopNavItems }) => { // desktopNavItems doit être passé en prop
  return (
    <footer className="border-t border-primary/10 py-12 md:py-16">
      <div className="container flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }} // Remplacez Number.POSITIVE_INFINITY par Infinity
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
          >
            <Code className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight">ADJAHOTO Jean Bénisse</span>
        </div>

        {/* Vérifiez que desktopNavItems est défini avant de le mapper */}
        {desktopNavItems && (
          <div className="flex flex-wrap gap-6 md:gap-10">
            {desktopNavItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                {item.name}
              </Link>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          <Button variant="outline" size="icon" asChild className="rounded-full border-primary/20 backdrop-blur-md">
            <Link href="https://github.com/ADJAHOTO" target="_blank" rel="noopener noreferrer"> {/* Mettez votre vrai profil GitHub ici */}
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild className="rounded-full border-primary/20 backdrop-blur-md">
            <Link href="https://linkedin.com/in/votre_profil" target="_blank" rel="noopener noreferrer"> {/* Mettez votre vrai profil LinkedIn ici */}
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild className="rounded-full border-primary/20 backdrop-blur-md">
            <Link href="mailto:benisseadjahoto@gmail.com"> 
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
  );
};

export default Footer;