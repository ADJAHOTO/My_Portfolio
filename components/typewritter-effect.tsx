"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TypewriterEffectProps {
  text: string
  className?: string
  cursorClassName?: string
  delay?: number
  speed?: number
  onComplete?: () => void
}

export function TypewriterEffect({
  text,
  className,
  cursorClassName,
  delay = 0,
  speed = 100,
  onComplete,
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (delay > 0 && currentIndex === 0) {
      timeout = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }
      }, delay)
    } else if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed) // Adjust typing speed here
    } else if (!isComplete) {
      setIsComplete(true)
      if (onComplete) onComplete()
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, text, delay, speed, isComplete, onComplete])

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={cn("inline-block", className)}>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
        {displayText}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className={cn("ml-1 inline-block h-[1em] w-[2px] bg-current", cursorClassName)}
      />
    </span>
  )
}
