"use client"

import { useState } from "react"
import type { WorldState, City } from "@/types/simulation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface WorldMapProps {
  worldState: WorldState
}

export default function WorldMap({ worldState }: WorldMapProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const gridSize = 10
  const cellSize = 30

  // Find city at coordinates
  const getCityAtCoordinates = (x: number, y: number) => {
    for (const civ of worldState.civilizations) {
      for (const city of civ.cities) {
        if (city.x === x && city.y === y) {
          return { city, civilization: civ }
        }
      }
    }
    return null
  }

  // Find resource at coordinates
  const getResourceAtCoordinates = (x: number, y: number) => {
    return worldState.resourceNodes.find((node) => node.x === x && node.y === y)
  }

  // Get trade routes for a city
  const getTradeRoutesForCity = (cityId: string) => {
    return worldState.tradeRoutes.filter((route) => route.from === cityId || route.to === cityId)
  }

  // Render grid
  const renderGrid = () => {
    const grid = []

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cityInfo = getCityAtCoordinates(x, y)
        const resource = getResourceAtCoordinates(x, y)

        let cellContent = null
        const cellClass = "border border-gray-200 flex items-center justify-center"

        if (cityInfo) {
          cellContent = (
            <div
              className="w-full h-full rounded-full flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: cityInfo.civilization.color }}
              onClick={() => setSelectedCity(cityInfo.city)}
            >
              <span className="text-white text-xs font-bold">C</span>
            </div>
          )
        } else if (resource) {
          let resourceIcon = "?"
          if (resource.type === "food") resourceIcon = "🌾"
          if (resource.type === "gold") resourceIcon = "💰"
          if (resource.type === "iron") resourceIcon = "⚒️"

          cellContent = <div className="text-sm">{resourceIcon}</div>
        }

        grid.push(
          <div
            key={`${x}-${y}`}
            className={cellClass}
            style={{
              width: cellSize,
              height: cellSize,
              gridColumn: x + 1,
              gridRow: y + 1,
            }}
          >
            {cellContent}
          </div>,
        )
      }
    }

    return grid
  }

  // Render trade routes
  const renderTradeRoutes = () => {
    return worldState.tradeRoutes.map((route) => {
      const fromCity = worldState.civilizations.flatMap((civ) => civ.cities).find((city) => city.id === route.from)
      const toCity = worldState.civilizations.flatMap((civ) => civ.cities).find((city) => city.id === route.to)

      if (!fromCity || !toCity) return null

      const x1 = fromCity.x * cellSize + cellSize / 2
      const y1 = fromCity.y * cellSize + cellSize / 2
      const x2 = toCity.x * cellSize + cellSize / 2
      const y2 = toCity.y * cellSize + cellSize / 2

      return <line key={route.id} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth="2" strokeDasharray="4" />
    })
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>World Map</CardTitle>
        <CardDescription>Cities, resources, and trade routes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <div
              className="grid"
              style={{
                width: gridSize * cellSize,
                height: gridSize * cellSize,
              }}
            >
              {renderGrid()}
            </div>
            <svg
              className="absolute top-0 left-0 pointer-events-none"
              width={gridSize * cellSize}
              height={gridSize * cellSize}
            >
              {renderTradeRoutes()}
            </svg>
          </div>

          <div className="flex-1">
            {selectedCity ? (
              <div className="space-y-2">
                <h3 className="font-bold">{selectedCity.name}</h3>
                <p>Population: {selectedCity.population}</p>

                <h4 className="font-semibold text-sm mt-2">Trade Routes:</h4>
                <ul className="text-sm">
                  {getTradeRoutesForCity(selectedCity.id).map((route) => {
                    const otherCityId = route.from === selectedCity.id ? route.to : route.from
                    const otherCity = worldState.civilizations
                      .flatMap((civ) => civ.cities)
                      .find((city) => city.id === otherCityId)

                    return (
                      <li key={route.id}>
                        {route.from === selectedCity.id ? "Exports" : "Imports"} {route.resourceType} to{" "}
                        {otherCity?.name} (value: {route.value})
                      </li>
                    )
                  })}
                  {getTradeRoutesForCity(selectedCity.id).length === 0 && <li>No active trade routes</li>}
                </ul>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                <p>Select a city to view details</p>
                <div className="mt-4">
                  <p className="font-semibold">Legend:</p>
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    <span>Azurian City</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                    <span>Crimsonite City</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="mr-2">🌾</span>
                    <span>Food Resource</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="mr-2">💰</span>
                    <span>Gold Resource</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="mr-2">⚒️</span>
                    <span>Iron Resource</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

