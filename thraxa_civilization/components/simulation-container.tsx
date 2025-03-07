"use client"

import { useState, useEffect } from "react"
import WorldMap from "@/components/visualizations/world-map"
import DiplomacyGraph from "@/components/visualizations/diplomacy-graph"
import BehavioralTreeView from "@/components/visualizations/behavioral-tree-view"
import EconomyGraph from "@/components/visualizations/economy-graph"
import TechnologyChart from "@/components/visualizations/technology-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import StartAnimation from "@/components/start-animation"
import { useSimulation } from "@/hooks/use-simulation"
import Link from "next/link"

export default function SimulationContainer() {
  const [showStartAnimation, setShowStartAnimation] = useState(true)
  const [simulationSpeed, setSimulationSpeed] = useState(1)
  const { worldState, isPaused, togglePause, advanceTime, resetSimulation } = useSimulation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStartAnimation(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isPaused && !showStartAnimation) {
      const interval = setInterval(() => {
        advanceTime()
      }, 1000 / simulationSpeed)

      return () => clearInterval(interval)
    }
  }, [isPaused, simulationSpeed, advanceTime, showStartAnimation])

  if (showStartAnimation) {
    return <StartAnimation />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Thraxa Civilization Simulator</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <Link href="/ai-algorithms" className="text-sm underline">
              Learn about AI Algorithms
            </Link>
            <div className="text-sm">Year: {worldState.currentYear}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Button variant={isPaused ? "default" : "secondary"} size="sm" onClick={togglePause}>
            {isPaused ? "Play" : "Pause"}
          </Button>
          <Button variant="secondary" size="sm" onClick={resetSimulation}>
            Reset
          </Button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs whitespace-nowrap">Speed:</span>
            <Slider
              className="w-24"
              value={[simulationSpeed]}
              min={0.5}
              max={3}
              step={0.5}
              onValueChange={(value) => setSimulationSpeed(value[0])}
            />
          </div>
        </div>

        <Tabs defaultValue="world" className="w-full">
          <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full bg-white/10 rounded-lg">
            <TabsTrigger value="world">🟢 World</TabsTrigger>
            <TabsTrigger value="diplomacy">🟠 Diplomacy</TabsTrigger>
            <TabsTrigger value="ai">🔵 AI</TabsTrigger>
            <TabsTrigger value="economy">🔴 Economy</TabsTrigger>
            <TabsTrigger value="tech">🟡 Tech</TabsTrigger>
          </TabsList>

          <TabsContent value="world" className="h-[400px] sm:h-[500px] bg-white/10 rounded-lg p-4 overflow-auto">
            <WorldMap worldState={worldState} />
          </TabsContent>

          <TabsContent value="diplomacy" className="h-[400px] sm:h-[500px] bg-white/10 rounded-lg p-4 overflow-auto">
            <DiplomacyGraph worldState={worldState} />
          </TabsContent>

          <TabsContent value="ai" className="h-[400px] sm:h-[500px] bg-white/10 rounded-lg p-4 overflow-auto">
            <BehavioralTreeView worldState={worldState} />
          </TabsContent>

          <TabsContent value="economy" className="h-[400px] sm:h-[500px] bg-white/10 rounded-lg p-4 overflow-auto">
            <EconomyGraph worldState={worldState} />
          </TabsContent>

          <TabsContent value="tech" className="h-[400px] sm:h-[500px] bg-white/10 rounded-lg p-4 overflow-auto">
            <TechnologyChart worldState={worldState} />
          </TabsContent>
        </Tabs>

        <div className="bg-white/10 p-4 rounded-lg text-sm">
          <h3 className="font-medium mb-2">Learning Points:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>AI decision-making uses advanced algorithms like reinforcement learning and behavioral trees</li>
            <li>Civilizations evolve through genetic programming and evolutionary algorithms</li>
            <li>Diplomatic relations are modeled using Graph Neural Networks (GNN)</li>
            <li>Multi-agent reinforcement learning governs complex interactions between civilizations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

