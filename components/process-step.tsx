"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface ProcessStepProps {
  number: string
  title: string
  description: string
  index: number
}

export function ProcessStep({ number, title, description, index }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card className="group h-full overflow-hidden border-primary/20 bg-background/80 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
        <CardContent className="p-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <span className="text-2xl font-bold">{number}</span>
          </div>
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
