"use client"

import { useState } from "react"
import type { WorldState } from "@/types/simulation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"

interface TechnologyChartProps {
  worldState: WorldState
}

export default function TechnologyChart({ worldState }: TechnologyChartProps) {
  const [selectedCiv, setSelectedCiv] = useState<string>(worldState.civilizations[0].id)

  // Get selected civilization
  const civilization = worldState.civilizations.find((civ) => civ.id === selectedCiv) || worldState.civilizations[0]

  // Prepare tech data for radar chart
  const techData = [
    { subject: "Agriculture", A: civilization.technology.agriculture },
    { subject: "Military", A: civilization.technology.military },
    { subject: "Culture", A: civilization.technology.culture },
    { subject: "Science", A: civilization.technology.science },
  ]

  // Calculate total population
  const totalPopulation = civilization.cities.reduce((sum, city) => sum + city.population, 0)

  // Calculate average tech level
  const avgTechLevel =
    (civilization.technology.agriculture +
      civilization.technology.military +
      civilization.technology.culture +
      civilization.technology.science) /
    4

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Technology & Culture</CardTitle>
        <CardDescription>Technological advancement and cultural evolution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="text-sm font-medium mb-1 block">Civilization:</label>
          <select
            className="w-full p-2 border rounded-md"
            value={selectedCiv}
            onChange={(e) => setSelectedCiv(e.target.value)}
          >
            {worldState.civilizations.map((civ) => (
              <option key={civ.id} value={civ.id}>
                {civ.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Technology Levels</h3>
            <ChartContainer
              config={{
                A: {
                  label: civilization.name,
                  color: civilization.color,
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={techData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 30]} />
                  <Radar
                    name={civilization.name}
                    dataKey="A"
                    stroke={civilization.color}
                    fill={civilization.color}
                    fillOpacity={0.6}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Population</span>
                <span className="text-sm">{totalPopulation}</span>
              </div>
              <Progress value={Math.min(100, totalPopulation / 5)} />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Agriculture</span>
                <span className="text-sm">{civilization.technology.agriculture.toFixed(1)}</span>
              </div>
              <Progress value={Math.min(100, civilization.technology.agriculture * 3)} />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Military</span>
                <span className="text-sm">{civilization.technology.military.toFixed(1)}</span>
              </div>
              <Progress value={Math.min(100, civilization.technology.military * 3)} />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Culture</span>
                <span className="text-sm">{civilization.technology.culture.toFixed(1)}</span>
              </div>
              <Progress value={Math.min(100, civilization.technology.culture * 3)} />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Science</span>
                <span className="text-sm">{civilization.technology.science.toFixed(1)}</span>
              </div>
              <Progress value={Math.min(100, civilization.technology.science * 3)} />
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm">
          <p>
            Average Technology Level: <span className="font-medium">{avgTechLevel.toFixed(1)}</span>
          </p>
          <p>
            Total Population: <span className="font-medium">{totalPopulation}</span>
          </p>
          <p>
            Number of Cities: <span className="font-medium">{civilization.cities.length}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

