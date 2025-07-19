"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let mouseX = 0
    let mouseY = 0
    let mouseTimeout: NodeJS.Timeout

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return

      mouseX = e.clientX
      mouseY = e.clientY

      // Add more particles around mouse
      for (let i = 0; i < 2; i++) {
        const size = Math.random() * 2 + 1
        const speedFactor = Math.random() * 2 + 1
        particles.push(
          new Particle(mouseX + Math.random() * 40 - 20, mouseY + Math.random() * 40 - 20, size, true, speedFactor),
        )
      }

      // Limit particles
      if (particles.length > 200) {
        particles = particles.slice(-200)
      }

      // Reset mouse moving flag after delay
      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => {
        // Mouse stopped moving - could be used for future features
      }, 100)
    }

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      isMouseParticle: boolean
      speedFactor: number
      originalSize: number

      constructor(x?: number, y?: number, size?: number, isMouseParticle = false, speedFactor = 1) {
        if (!canvas) {
          // Fallback values if canvas is not available
          this.x = x ?? 0
          this.y = y ?? 0
        } else {
          this.x = x ?? Math.random() * canvas.width
          this.y = y ?? Math.random() * canvas.height
        }

        this.originalSize = size ?? Math.random() * 3 + 1
        this.size = this.originalSize
        this.speedX = (Math.random() * 1 - 0.5) * speedFactor
        this.speedY = (Math.random() * 1 - 0.5) * speedFactor
        this.isMouseParticle = isMouseParticle
        this.speedFactor = speedFactor
        this.alpha = isMouseParticle ? 0.8 : Math.random() * 0.5 + 0.1

        // Set color based on theme
        if (resolvedTheme === "dark") {
          this.color = `rgba(255, 255, 255, ${this.alpha})`
        } else if (resolvedTheme === "purple") {
          this.color = `rgba(147, 51, 234, ${this.alpha})`
        } else if (resolvedTheme === "green") {
          this.color = `rgba(16, 185, 129, ${this.alpha})`
        } else {
          this.color = `rgba(124, 58, 237, ${this.alpha})`
        }
      }

      update() {
        if (!canvas) return

        this.x += this.speedX
        this.y += this.speedY

        // Mouse particle behavior
        if (this.isMouseParticle) {
          this.size *= 0.95
          if (this.size < 0.1) {
            this.size = 0.1
          }
        }

        // Boundary check
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

        // Fade out mouse particles
        if (this.isMouseParticle) {
          this.alpha *= 0.96
          if (this.alpha < 0.05) {
            this.alpha = 0.05
          }
        }
      }

      draw() {
        if (!ctx) return

        ctx.fillStyle = this.isMouseParticle
          ? `rgba(${
              resolvedTheme === "dark"
                ? "255, 255, 255"
                : resolvedTheme === "purple"
                  ? "147, 51, 234"
                  : resolvedTheme === "green"
                    ? "16, 185, 129"
                    : "124, 58, 237"
            }, ${this.alpha})`
          : this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    const initParticles = () => {
      if (!canvas) return

      particles = []
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 150)

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        // Connect particles
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = particles[i].isMouseParticle || particles[j].isMouseParticle ? 200 : 150

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle =
              particles[i].isMouseParticle || particles[j].isMouseParticle
                ? `rgba(${
                    resolvedTheme === "dark"
                      ? "255, 255, 255"
                      : resolvedTheme === "purple"
                        ? "147, 51, 234"
                        : resolvedTheme === "green"
                          ? "16, 185, 129"
                          : "124, 58, 237"
                  }, ${0.1 * (1 - distance / maxDistance)})`
                : `rgba(${
                    resolvedTheme === "dark"
                      ? "255, 255, 255"
                      : resolvedTheme === "purple"
                        ? "147, 51, 234"
                        : resolvedTheme === "green"
                          ? "16, 185, 129"
                          : "124, 58, 237"
                  }, ${0.2 * (1 - distance / maxDistance)})`
            ctx.lineWidth = particles[i].isMouseParticle || particles[j].isMouseParticle ? 0.6 : 0.2
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Remove tiny mouse particles
      particles = particles.filter((p) => !p.isMouseParticle || p.size > 0.1)

      animationFrameId = requestAnimationFrame(animate)
    }

    // Initialize
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    resizeCanvas()
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      clearTimeout(mouseTimeout)
    }
  }, [resolvedTheme])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}
