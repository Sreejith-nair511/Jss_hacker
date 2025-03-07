"use client"

import { useState } from "react"
import type { WorldState, BehavioralTreeNode } from "@/types/simulation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { simulationEngine } from "@/lib/simulation-engine"

interface BehavioralTreeViewProps {
  worldState: WorldState
}

export default function BehavioralTreeView({ worldState }: BehavioralTreeViewProps) {
  const [selectedTab, setSelectedTab] = useState("diplomatic")

  const diplomaticTree = simulationEngine.getDiplomaticDecisionTree()
  const economicTree = simulationEngine.getEconomicDecisionTree()

  const renderTreeNode = (node: BehavioralTreeNode, level = 0, index = 0) => {
    const nodeWidth = 120
    const nodeHeight = 40
    const horizontalGap = 20
    const verticalGap = 60

    // Calculate position
    const x = index * (nodeWidth + horizontalGap)
    const y = level * (nodeHeight + verticalGap)

    // Node color based on type
    let bgColor = "#e2e8f0" // Default gray
    const textColor = "#1e293b"

    if (node.type === "selector") {
      bgColor = "#93c5fd" // Blue for selector
    } else if (node.type === "sequence") {
      bgColor = "#86efac" // Green for sequence
    } else if (node.type === "condition") {
      bgColor = "#fcd34d" // Yellow for condition
    } else if (node.type === "action") {
      bgColor = "#f87171" // Red for action
    }

    return (
      <g key={`${level}-${index}-${node.name}`}>
        {/* Node */}
        <rect
          x={x}
          y={y}
          width={nodeWidth}
          height={nodeHeight}
          rx={5}
          ry={5}
          fill={bgColor}
          stroke="#475569"
          strokeWidth="1"
        />

        {/* Node text */}
        <text
          x={x + nodeWidth / 2}
          y={y + nodeHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill={textColor}
        >
          {node.name}
        </text>

        {/* Node type */}
        <text
          x={x + nodeWidth / 2}
          y={y + nodeHeight - 5}
          textAnchor="middle"
          fontSize="8"
          fill={textColor}
          opacity="0.7"
        >
          {node.type}
        </text>

        {/* Children */}
        {node.children &&
          node.children.map((child, childIndex) => {
            const childElement = renderTreeNode(child, level + 1, childIndex)

            // Calculate connection line
            const childX = childIndex * (nodeWidth + horizontalGap) + nodeWidth / 2
            const childY = (level + 1) * (nodeHeight + verticalGap)

            return (
              <g key={`connection-${level}-${index}-${childIndex}`}>
                <line
                  x1={x + nodeWidth / 2}
                  y1={y + nodeHeight}
                  x2={childX}
                  y2={childY}
                  stroke="#475569"
                  strokeWidth="1"
                />
                {childElement}
              </g>
            )
          })}
      </g>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>AI Decision Making</CardTitle>
        <CardDescription>Behavioral trees for civilization AI</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="diplomatic">Diplomatic AI</TabsTrigger>
            <TabsTrigger value="economic">Economic AI</TabsTrigger>
          </TabsList>

          <TabsContent value="diplomatic" className="h-[350px] overflow-auto">
            <div className="p-4">
              <svg width="400" height="400">
                {renderTreeNode(diplomaticTree)}
              </svg>
            </div>
            <div className="mt-4 text-sm">
              <p className="font-medium">How it works:</p>
              <p>
                The diplomatic AI uses a behavioral tree to make decisions about relations with other civilizations. It
                evaluates conditions like military advantage and trust levels before taking actions like declaring war
                or forming alliances.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="economic" className="h-[350px] overflow-auto">
            <div className="p-4">
              <svg width="400" height="400">
                {renderTreeNode(economicTree)}
              </svg>
            </div>
            <div className="mt-4 text-sm">
              <p className="font-medium">How it works:</p>
              <p>
                The economic AI prioritizes different actions based on resource levels and trade opportunities. It can
                focus on agriculture during food shortages or establish trade routes when there are excess resources.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

