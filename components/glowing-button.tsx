"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const GlowingButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, ...props }, ref) => {
  return (
    <div className="group relative">
      <motion.div
        className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-purple-500 opacity-70 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:blur-xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <Button
        ref={ref}
        size="lg"
        className={cn(
          "relative overflow-hidden bg-gradient-to-r from-primary to-purple-500 text-white hover:from-primary/90 hover:to-purple-500/90",
          className
        )}
        {...props}
      >
        {/* Solution : Un seul enfant wrapper pour tous les éléments */}
        <div className="relative z-10 flex items-center justify-center">
          <motion.span
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {children}
          </motion.span>

          {/* Effets de scintillement */}
          {[...Array(2)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white"
              style={{
                top: i === 0 ? "20%" : "70%",
                left: i === 0 ? "10%" : "80%"
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: i === 0 ? 1 : 0.5,
                delay: i === 0 ? 0 : 0.5,
              }}
            />
          ))}
        </div>
      </Button>
    </div>
  )
})

GlowingButton.displayName = "GlowingButton"