"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  index: number
  title: string
  description: string
  tags: string[]
  imageUrl: string
  demoUrl: string
  repoUrl: string
}

export function ProjectCard({ index, title, description, tags, imageUrl, demoUrl, repoUrl }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card
        className="group relative overflow-hidden border-primary/20 bg-background/80 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            width={500}
            height={300}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button asChild variant="outline" className="border-primary/20 bg-background/80 backdrop-blur-md">
              <Link href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Voir la démo
              </Link>
            </Button>
          </motion.div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold">{title}</h3>
            <motion.div animate={{ rotate: isHovered ? 45 : 0 }} transition={{ duration: 0.3 }}>
              <ArrowUpRight className="h-5 w-5 text-primary" />
            </motion.div>
          </div>
          <p className="mt-2 text-muted-foreground">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="border-primary/10 bg-primary/5">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end p-6 pt-0">
          <Button variant="ghost" size="sm" asChild className="text-primary hover:bg-primary/10">
            <Link href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              Code source
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
