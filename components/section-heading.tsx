"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  const titleWords = title.split(" ")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="space-y-4 text-center"
    >
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex flex-wrap justify-center gap-x-3">
        {titleWords.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent inline-block"
          >
            {word}
          </motion.span>
        ))}
      </h2>
      <motion.p
        className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  )
}
