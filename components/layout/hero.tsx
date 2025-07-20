
"use client"; // Indicates this component runs on the client side

import React from 'react';
import Link from 'next/link'; // Import Link from Next.js
import { motion, MotionValue } from 'framer-motion'; // Import motion and MotionValue from Framer Motion
import { ArrowDown } from 'lucide-react'; // Import the necessary icon

// Import your UI components
import { GlowingButton } from '@/components/glowing-button'; // Make sure GlowingButton is a client component
import { HeroImage } from '@/components/hero-image'; // Make sure HeroImage is a client component
import { Button } from '@/components/ui/button'; // Your shadcn/ui Button component

// Define the interface for the component's props
interface HeroSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>; // Corrected type for null
  y: MotionValue<number>; // For parallax/scroll animations
  opacity: MotionValue<number>; // For scroll-linked opacity
}

export function HeroSection({ sectionRef, y, opacity }: HeroSectionProps) {
  return (
    <section
      id="home"
      ref={sectionRef}
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
              /* Corrected Number.POSITIVE_INFINITY to Infinity */
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}