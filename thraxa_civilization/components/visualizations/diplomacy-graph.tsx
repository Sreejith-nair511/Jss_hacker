"use client"

import { useState } from "react"
import type { WorldState, Civilization } from "@/types/simulation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DiplomacyGraphProps {
  worldState: WorldState
}

export default function DiplomacyGraph({ worldState }: DiplomacyGraphProps) {
  const [selectedCiv, setSelectedCiv] = useState<Civilization | null>(null)

  const renderDiplomacyGraph = () => {
    const nodeRadius = 40
    const centerX = 150
    const centerY = 150
    const distance = 100

    return (
      <svg width="300" height="300" className="mx-auto">
        {/* Connection line */}
        {worldState.civilizations.length >= 2 && (
          <g>
            <line
              x1={centerX - distance / 2}
              y1={centerY}
              x2={centerX + distance / 2}
              y2={centerY}
              stroke={getRelationColor(worldState.civilizations[0], worldState.civilizations[1])}
              strokeWidth="4"
            />

            {/* Trust level */}
            <text x={centerX} y={centerY - 10} textAnchor="middle" className="text-xs font-medium">
              Trust: {worldState.civilizations[0].relations[worldState.civilizations[1].id].trust}%
            </text>

            {/* Trade value */}
            <text x={centerX} y={centerY + 20} textAnchor="middle" className="text-xs">
              Trade: {worldState.civilizations[0].relations[worldState.civilizations[1].id].trade}
            </text>

            {/* War or alliance status */}
            {worldState.civilizations[0].relations[worldState.civilizations[1].id].warStatus && (
              <text x={centerX} y={centerY + 40} textAnchor="middle" className="text-xs font-bold text-red-500">
                AT WAR
              </text>
            )}

            {worldState.civilizations[0].relations[worldState.civilizations[1].id].alliance && (
              <text x={centerX} y={centerY + 40} textAnchor="middle" className="text-xs font-bold text-green-500">
                ALLIANCE
              </text>
            )}
          </g>
        )}

        {/* Civilization nodes */}
        {worldState.civilizations.map((civ, index) => {
          const x = index === 0 ? centerX - distance / 2 : centerX + distance / 2

          return (
            <g key={civ.id} onClick={() => setSelectedCiv(civ)} className="cursor-pointer">
              <circle cx={x} cy={centerY} r={nodeRadius} fill={civ.color} stroke="#000" strokeWidth="2" opacity="0.8" />
              <text x={x} y={centerY} textAnchor="middle" dominantBaseline="middle" className="text-white font-bold">
                {civ.name.substring(0, 2)}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  const getRelationColor = (civ1: Civilization, civ2: Civilization) => {
    const relation = civ1.relations[civ2.id]

    if (relation.warStatus) return "#ef4444" // Red for war
    if (relation.alliance) return "#22c55e" // Green for alliance

    if (relation.trust > 70) return "#4ade80" // Light green for high trust
    if (relation.trust > 40) return "#facc15" // Yellow for medium trust
    return "#f87171" // Light red for low trust
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Diplomacy Network</CardTitle>
        <CardDescription>Relations between civilizations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">{renderDiplomacyGraph()}</div>

          <div className="flex-1">
            {selectedCiv ? (
              <div className="space-y-2">
                <h3 className="font-bold">{selectedCiv.name}</h3>
                <p className="text-sm">Military Power: {selectedCiv.technology.military}</p>
                <p className="text-sm">Cultural Influence: {selectedCiv.technology.culture}</p>

                <h4 className="font-semibold text-sm mt-4">Diplomatic Relations:</h4>
                {Object.entries(selectedCiv.relations).map(([civId, relation]) => {
                  const otherCiv = worldState.civilizations.find((c) => c.id === civId)
                  if (!otherCiv) return null

                  return (
                    <div key={civId} className="mt-2">
                      <p className="text-sm font-medium">{otherCiv.name}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span>Trust: {relation.trust}%</span>
                        <span>Trade: {relation.trade}</span>
                        {relation.alliance && <span className="text-green-500 font-bold">ALLIANCE</span>}
                        {relation.warStatus && <span className="text-red-500 font-bold">AT WAR</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                <p>Select a civilization to view diplomatic details</p>
                <div className="mt-4">
                  <p className="font-semibold">Diplomatic Status:</p>
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 bg-red-500 mr-2"></div>
                    <span>War</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
                    <span>Neutral</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 bg-green-500 mr-2"></div>
                    <span>Alliance</span>
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

