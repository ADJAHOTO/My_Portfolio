"use client"

import { motion } from "framer-motion"

interface SectionDividerProps {
  className?: string
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <motion.div
      className={`relative mx-auto my-16 h-16 w-1 ${className}`}
      initial={{ opacity: 0, height: 0 }}
      whileInView={{ opacity: 1, height: 64 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full w-full bg-gradient-to-b from-transparent via-primary to-transparent" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}
