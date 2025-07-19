"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

interface DevShowcaseProps {
  images: {
    src: string
    alt: string
  }[]
}

// Positions prédéfinies pour les points animés
const DOT_POSITIONS = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  initialX: `${Math.floor((i * 5) % 100)}%`,
  initialY: `${Math.floor((i * 7) % 100)}%`,
  initialOpacity: 0.2 + (i % 10) * 0.03,
  durations: [10 + (i % 10), 15 + (i % 5), 8 + (i % 7)],
}));

export function DevShowcase({ images }: DevShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { resolvedTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  // Rendu minimal côté serveur
  if (!isMounted) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-primary/20">
        <div className="relative h-full w-full">
          <Image
            src={images[0]?.src || "/placeholder.svg"}
            alt={images[0]?.alt || ""}
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            resolvedTheme === "dark"
              ? "from-background via-background/70 to-transparent"
              : "from-background via-background/60 to-transparent"
          }`} />
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-primary/20">
      {/* Animated background - seulement côté client */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgba(147, 51, 234, 0.2), transparent, rgba(168, 85, 247, 0.2))",
            "linear-gradient(to bottom right, rgba(168, 85, 247, 0.2), transparent, rgba(147, 51, 234, 0.2))",
          ],
        }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      {/* Images */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]?.src || "/placeholder.svg"}
              alt={images[currentIndex]?.alt || ""}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay with gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            resolvedTheme === "dark"
              ? "from-background via-background/70 to-transparent"
              : "from-background via-background/60 to-transparent"
          }`}
        />

        {/* Animated dots overlay - avec positions prédéfinies */}
        <div className="absolute inset-0 overflow-hidden">
          {DOT_POSITIONS.map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute h-2 w-2 rounded-full bg-primary/30"
              initial={{
                x: dot.initialX,
                y: dot.initialY,
                opacity: dot.initialOpacity,
              }}
              animate={{
                x: [
                  `${Math.floor((dot.id * 5) % 100)}%`,
                  `${Math.floor((dot.id * 3) % 100)}%`,
                  `${Math.floor((dot.id * 7) % 100)}%`
                ],
                y: [
                  `${Math.floor((dot.id * 7) % 100)}%`,
                  `${Math.floor((dot.id * 11) % 100)}%`,
                  `${Math.floor((dot.id * 5) % 100)}%`
                ],
                opacity: [dot.initialOpacity, dot.initialOpacity + 0.3, dot.initialOpacity],
              }}
              transition={{
                duration: dot.durations[0],
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-primary" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}