"use client"

import { useState } from "react"
import type { WorldState } from "@/types/simulation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface EconomyGraphProps {
  worldState: WorldState
}

export default function EconomyGraph({ worldState }: EconomyGraphProps) {
  const [selectedTab, setSelectedTab] = useState("resources")

  // Prepare resource data for chart
  const resourceData = worldState.civilizations.map((civ) => {
    const foodResource = civ.resources.find((r) => r.type === "food")
    const goldResource = civ.resources.find((r) => r.type === "gold")
    const ironResource = civ.resources.find((r) => r.type === "iron")

    return {
      name: civ.name,
      food: foodResource?.amount || 0,
      gold: goldResource?.amount || 0,
      iron: ironResource?.amount || 0,
    }
  })

  // Prepare trade data
  const tradeData = worldState.civilizations.map((civ) => {
    let totalTradeValue = 0

    // Sum up all trade values for this civilization
    Object.values(civ.relations).forEach((relation) => {
      totalTradeValue += relation.trade
    })

    return {
      name: civ.name,
      tradeValue: totalTradeValue,
    }
  })

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Economy & War</CardTitle>
        <CardDescription>Resources, trade, and military power</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="trade">Trade & Military</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="h-[350px]">
            <ChartContainer
              config={{
                food: {
                  label: "Food",
                  color: "hsl(var(--chart-1))",
                },
                gold: {
                  label: "Gold",
                  color: "hsl(var(--chart-2))",
                },
                iron: {
                  label: "Iron",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="food" fill="var(--color-food)" name="Food" />
                  <Bar dataKey="gold" fill="var(--color-gold)" name="Gold" />
                  <Bar dataKey="iron" fill="var(--color-iron)" name="Iron" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="trade" className="h-[350px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2">Trade Value</h3>
                <ChartContainer
                  config={{
                    tradeValue: {
                      label: "Trade Value",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tradeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="tradeValue" fill="var(--color-tradeValue)" name="Trade Value" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2">Military Power</h3>
                <ChartContainer
                  config={{
                    military: {
                      label: "Military",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={worldState.civilizations.map((civ) => ({
                        name: civ.name,
                        military: civ.technology.military,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="military" fill="var(--color-military)" name="Military Power" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

