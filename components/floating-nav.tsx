"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingNavProps extends HTMLMotionProps<"div"> {
  navItems: {
    name: string
    href: string
    icon?: React.ReactNode
  }[]
}

export function FloatingNav({ navItems, className, ...props }: FloatingNavProps) {
  const [activeItem, setActiveItem] = useState<string>("")
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Find the active section
      const sections = navItems.map((item) => item.href.substring(1))
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveItem(`#${section}`)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [navItems])

  return (
    <AnimatePresence mode="wait">
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed z-50 flex items-center justify-center space-x-4 rounded-full border border-primary/20 bg-background/80 px-4 py-3 backdrop-blur-md",
            className
          )}
          {...props}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                activeItem === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
              aria-label={item.name}
            >
              {item.icon}
              <span className="sr-only">{item.name}</span>
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}