"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Initialize canvas animation
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.8 // 80% of viewport height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Star properties
    const stars: { x: number; y: number; size: number; speed: number }[] = []
    const numStars = Math.min(window.innerWidth / 3, 200) // Responsive number of stars

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
      })
    }

    // Animation variables
    let animationId: number
    let galaxyRotation = 0

    // Animation function
    const animate = () => {
      if (!ctx) return

      // Clear canvas
      ctx.fillStyle = "rgba(10, 10, 30, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Move stars
        star.y += star.speed

        // Reset stars that go off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      // Draw galaxy in center
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const galaxySize = Math.min(canvas.width, canvas.height) * 0.3

      // Galaxy spiral arms
      galaxyRotation += 0.001
      for (let i = 0; i < 2; i++) {
        const armAngle = Math.PI * i + galaxyRotation

        for (let r = 0; r < galaxySize; r += 2) {
          const angle = armAngle + (r / galaxySize) * Math.PI * 4
          const x = centerX + Math.cos(angle) * (r * 0.8)
          const y = centerY + Math.sin(angle) * (r * 0.4) // Elliptical

          const alpha = 1 - r / galaxySize
          const hue = (r / galaxySize) * 60 + 200 // Blue to purple

          ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${alpha * 0.7})`
          ctx.beginPath()
          ctx.arc(x, y, Math.random() * 1.5 + 0.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Galaxy core
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, galaxySize * 0.2)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(0.2, "rgba(180, 180, 255, 0.6)")
      gradient.addColorStop(1, "rgba(100, 100, 255, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, galaxySize * 0.2, 0, Math.PI * 2)
      ctx.fill()

      // Continue animation
      animationId = requestAnimationFrame(animate)

      // Set animation as completed after 2 seconds for performance
      if (!hasAnimated) {
        setTimeout(() => {
          setHasAnimated(true)
        }, 2000)
      }
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [hasAnimated])

  if (!mounted) return null

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/90">
      <div className="absolute inset-0 star-bg opacity-30"></div>
      <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Nova Dash
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">Learn AI-Driven Procedural Universe Simulation</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg text-muted-foreground mb-8"
          >
            Master the art of creating procedurally generated universes with Python. From celestial bodies to complex
            ecosystems, learn how to simulate entire worlds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/courses/introduction">
              <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/playground">
              <Button variant="outline" size="lg" className="text-lg px-8 w-full sm:w-auto">
                Try the Playground
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 relative"
        >
          <div className="aspect-video rounded-lg overflow-hidden border shadow-xl">
            <div className="w-full h-full bg-black/80 flex items-center justify-center">
              <div className="relative w-full max-w-3xl mx-auto">
                <img
                  src="/placeholder.svg?height=720&width=1280"
                  alt="Universe simulation preview"
                  className="w-full h-auto rounded-md"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="rounded-full w-16 h-16 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

