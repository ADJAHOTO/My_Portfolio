"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  // Positions fixes pour les cercles animés (pour éviter Math.random() côté serveur)
  const circlePositions = [
    { left: "25%", top: "15%" },
    { left: "75%", top: "25%" },
    { left: "15%", top: "65%" },
    { left: "85%", top: "75%" },
    { left: "50%", top: "50%" },
    { left: "30%", top: "80%" },
    { left: "70%", top: "10%" },
    { left: "10%", top: "30%" },
  ]

  // Positions fixes pour les effets scintillants
  const sparklePositions = [
    { x: 30, y: 20 },
    { x: 70, y: 40 },
    { x: 20, y: 70 },
    { x: 80, y: 30 },
    { x: 50, y: 60 },
  ]

  useEffect(() => {
    setIsMounted(true)
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      container.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) scale3d(1.05, 1.05, 1.05)`
    }

    const handleMouseLeave = () => {
      container.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)"
      container.style.transition = "transform 0.5s ease"
    }

    const handleMouseEnter = () => {
      container.style.transition = "transform 0.1s ease"
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)
    container.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      container.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  // Ne pas rendre les animations côté serveur
  if (!isMounted) {
    return (
      <div className="relative aspect-square w-full max-w-[450px]">
        <div className="relative h-full w-full overflow-hidden rounded-full border-8 border-primary/10 bg-background/80 backdrop-blur-sm">
          <Image
            src="/placeholder.svg?height=450&width=450"
            alt="Portrait de Jean Bénisse"
            width={450}
            height={450}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full max-w-[450px] transition-transform duration-200 ease-out"
    >
      <motion.div
        className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30 blur-2xl"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-500 opacity-20"
        animate={{
          boxShadow: [
            "0 0 20px rgba(147, 51, 234, 0.3)",
            "0 0 40px rgba(147, 51, 234, 0.5)",
            "0 0 20px rgba(147, 51, 234, 0.3)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative h-full w-full overflow-hidden rounded-full border-8 border-primary/10 bg-background/80 backdrop-blur-sm"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2,
        }}
      >
        <Image
          src="/placeholder.svg?height=450&width=450"
          alt="Portrait de Jean Bénisse"
          width={450}
          height={450}
          className="h-full w-full object-cover"
          priority
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent"
          animate={{
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Cercles animés avec positions fixes */}
        {circlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute h-20 w-20 rounded-full ${
              resolvedTheme === "dark"
                ? "bg-white"
                : resolvedTheme === "purple"
                ? "bg-purple-500"
                : resolvedTheme === "green"
                ? "bg-green-500"
                : "bg-primary"
            } opacity-20 blur-xl`}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              left: pos.left,
              top: pos.top,
            }}
          />
        ))}

        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/30"
          animate={{
            scale: [1, 1.05, 1],
            borderColor: ["rgba(147, 51, 234, 0.3)", "rgba(147, 51, 234, 0.6)", "rgba(147, 51, 234, 0.3)"],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Effets scintillants */}
        {sparklePositions.map((pos, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute h-2 w-2 rounded-full bg-white"
            initial={{
              scale: 0,
              x: pos.x,
              y: pos.y,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 5,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}