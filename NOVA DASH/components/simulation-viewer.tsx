"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"

export function SimulationViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    let animationId: number
    let time = 0

    // Simple star system visualization
    const drawStarSystem = () => {
      if (!ctx) return

      // Clear canvas
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Center of the canvas
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw star
      ctx.fillStyle = "#FFD700"
      ctx.beginPath()
      ctx.arc(centerX, centerY, 20 * zoom, 0, Math.PI * 2)
      ctx.fill()

      // Draw planets
      const planets = [
        { distance: 50, size: 5, color: "#A52A2A", speed: 0.02 },
        { distance: 80, size: 8, color: "#4169E1", speed: 0.015 },
        { distance: 120, size: 10, color: "#32CD32", speed: 0.01 },
        { distance: 170, size: 7, color: "#FF4500", speed: 0.005 },
        { distance: 220, size: 15, color: "#B8860B", speed: 0.002 },
      ]

      planets.forEach((planet) => {
        const adjustedDistance = planet.distance * zoom
        const angle = time * planet.speed * speed

        const x = centerX + Math.cos(angle) * adjustedDistance
        const y = centerY + Math.sin(angle) * adjustedDistance

        // Draw orbit
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.beginPath()
        ctx.arc(centerX, centerY, adjustedDistance, 0, Math.PI * 2)
        ctx.stroke()

        // Draw planet
        ctx.fillStyle = planet.color
        ctx.beginPath()
        ctx.arc(x, y, planet.size * zoom, 0, Math.PI * 2)
        ctx.fill()
      })

      // Update time if animation is playing
      if (isPlaying) {
        time += 0.01
      }

      // Continue animation loop
      animationId = requestAnimationFrame(drawStarSystem)
    }

    // Start animation
    drawStarSystem()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPlaying, zoom, speed])

  const togglePlay = () => setIsPlaying(!isPlaying)
  const resetSimulation = () => {
    setIsPlaying(false)
    setZoom(1)
    setSpeed(1)
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5))

  return (
    <div className="flex flex-col space-y-4">
      <Card className="p-0 overflow-hidden relative">
        <canvas ref={canvasRef} className="w-full h-[400px] bg-black" />

        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
          <div className="flex space-x-2">
            <Button variant="secondary" size="sm" onClick={togglePlay} className="bg-black/50 hover:bg-black/70">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="secondary" size="sm" onClick={resetSimulation} className="bg-black/50 hover:bg-black/70">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button variant="secondary" size="sm" onClick={handleZoomOut} className="bg-black/50 hover:bg-black/70">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" onClick={handleZoomIn} className="bg-black/50 hover:bg-black/70">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Simulation Speed</span>
            <span className="text-sm">{speed.toFixed(1)}x</span>
          </div>
          <Slider value={[speed]} min={0.1} max={3} step={0.1} onValueChange={(value) => setSpeed(value[0])} />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Zoom Level</span>
            <span className="text-sm">{zoom.toFixed(1)}x</span>
          </div>
          <Slider value={[zoom]} min={0.5} max={3} step={0.1} onValueChange={(value) => setZoom(value[0])} />
        </div>
      </div>
    </div>
  )
}

