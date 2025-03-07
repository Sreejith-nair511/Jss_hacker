"use client"

import { useState, useCallback } from "react"
import { simulationEngine } from "@/lib/simulation-engine"
import type { WorldState } from "@/types/simulation"

const initialWorldState: WorldState = {
  currentYear: 1,
  civilizations: [
    {
      id: "civ1",
      name: "Azurians",
      color: "#3b82f6",
      cities: [
        { id: "city1", name: "Azuria", x: 2, y: 2, population: 100, resources: [] },
        { id: "city2", name: "Bluehaven", x: 3, y: 1, population: 80, resources: [] },
      ],
      resources: [
        { id: "res1", type: "food", amount: 500 },
        { id: "res2", type: "gold", amount: 300 },
        { id: "res3", type: "iron", amount: 200 },
      ],
      technology: {
        agriculture: 10,
        military: 5,
        culture: 8,
        science: 12,
      },
      relations: {
        civ2: {
          trust: 50,
          trade: 30,
          alliance: false,
          warStatus: false,
        },
      },
    },
    {
      id: "civ2",
      name: "Crimsonites",
      color: "#ef4444",
      cities: [
        { id: "city3", name: "Crimson Peak", x: 7, y: 7, population: 120, resources: [] },
        { id: "city4", name: "Redfort", x: 6, y: 8, population: 90, resources: [] },
      ],
      resources: [
        { id: "res4", type: "food", amount: 400 },
        { id: "res5", type: "gold", amount: 350 },
        { id: "res6", type: "iron", amount: 250 },
      ],
      technology: {
        agriculture: 8,
        military: 15,
        culture: 6,
        science: 10,
      },
      relations: {
        civ1: {
          trust: 40,
          trade: 30,
          alliance: false,
          warStatus: false,
        },
      },
    },
  ],
  resourceNodes: [
    { id: "node1", type: "food", x: 1, y: 3, amount: 100 },
    { id: "node2", type: "gold", x: 4, y: 4, amount: 100 },
    { id: "node3", type: "iron", x: 8, y: 2, amount: 100 },
    { id: "node4", type: "food", x: 6, y: 6, amount: 100 },
    { id: "node5", type: "gold", x: 2, y: 7, amount: 100 },
  ],
  tradeRoutes: [
    { id: "trade1", from: "city1", to: "city3", value: 30, resourceType: "food" },
    { id: "trade2", from: "city2", to: "city4", value: 20, resourceType: "gold" },
  ],
  events: [],
}

export function useSimulation() {
  const [worldState, setWorldState] = useState<WorldState>(initialWorldState)
  const [isPaused, setIsPaused] = useState(true)

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev)
  }, [])

  const advanceTime = useCallback(() => {
    setWorldState((prevState) => {
      return simulationEngine.processNextTurn(prevState)
    })
  }, [])

  const resetSimulation = useCallback(() => {
    setWorldState(initialWorldState)
    setIsPaused(true)
  }, [])

  return {
    worldState,
    isPaused,
    togglePause,
    advanceTime,
    resetSimulation,
  }
}

