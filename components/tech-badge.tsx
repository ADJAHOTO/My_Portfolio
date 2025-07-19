"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface TechBadgeProps {
  name: string
  icon: string
  delay: number
}

export function TechBadge({ name, icon, delay }: TechBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 backdrop-blur-md"
    >
      <div className="relative h-6 w-6 overflow-hidden rounded-full">
        <Image src={icon || "/placeholder.svg"} alt={name} width={24} height={24} className="object-contain" />
      </div>
      <span className="text-sm font-medium">{name}</span>
    </motion.div>
  )
}
