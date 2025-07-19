"use client"

import { motion, type Variants } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  staggerChildren?: number
  once?: boolean
  highlightWords?: string[]
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  staggerChildren = 0.1,
  once = true,
  highlightWords = [],
}: AnimatedTextProps) {
  const words = text.split(" ")

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    }),
  }

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      style={{ display: "inline-flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={className}
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.includes(word)

        return (
          <motion.span
            key={index}
            variants={child}
            style={{ marginRight: "0.25em", position: "relative" }}
            className={isHighlighted ? "text-primary font-medium" : ""}
          >
            {word}
            {isHighlighted && (
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            )}
          </motion.span>
        )
      })}
    </motion.div>
  )
}