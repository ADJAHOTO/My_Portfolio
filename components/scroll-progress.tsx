"use client"

import { motion, useScroll } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-primary to-purple-500 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
