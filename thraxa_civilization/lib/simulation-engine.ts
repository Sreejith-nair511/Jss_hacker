import type { WorldState, BehavioralTreeNode } from "@/types/simulation"

// Behavioral tree nodes for AI decision making
const diplomaticDecisionTree: BehavioralTreeNode = {
  type: "selector",
  name: "Diplomatic Decisions",
  children: [
    {
      type: "sequence",
      name: "Consider War",
      children: [
        { type: "condition", name: "Military Advantage > 30%" },
        { type: "condition", name: "Trust < 20" },
        { type: "action", name: "Declare War" },
      ],
    },
    {
      type: "sequence",
      name: "Consider Alliance",
      children: [
        { type: "condition", name: "Trust > 70" },
        { type: "condition", name: "Trade Value > 50" },
        { type: "action", name: "Form Alliance" },
      ],
    },
    {
      type: "sequence",
      name: "Improve Relations",
      children: [
        { type: "condition", name: "Trust < 50" },
        { type: "action", name: "Send Gift" },
      ],
    },
  ],
}

const economicDecisionTree: BehavioralTreeNode = {
  type: "selector",
  name: "Economic Decisions",
  children: [
    {
      type: "sequence",
      name: "Resource Crisis",
      children: [
        { type: "condition", name: "Food < 200" },
        { type: "action", name: "Prioritize Agriculture" },
      ],
    },
    {
      type: "sequence",
      name: "Trade Opportunity",
      children: [
        { type: "condition", name: "Excess Resources" },
        { type: "action", name: "Establish Trade Route" },
      ],
    },
    {
      type: "action",
      name: "Balanced Growth",
    },
  ],
}

// Simulation engine with AI decision making
export const simulationEngine = {
  processNextTurn(state: WorldState): WorldState {
    // Create a deep copy of the state to avoid mutations
    const newState = JSON.parse(JSON.stringify(state)) as WorldState

    // Advance year
    newState.currentYear += 1

    // Process each civilization
    newState.civilizations.forEach((civ) => {
      // Grow population
      civ.cities.forEach((city) => {
        city.population = Math.floor(city.population * (1 + Math.random() * 0.1))
      })

      // Update resources
      civ.resources.forEach((resource) => {
        // Base production
        let production = 0

        if (resource.type === "food") {
          production = civ.cities.length * 10 * (1 + civ.technology.agriculture / 100)
        } else if (resource.type === "gold") {
          production = civ.cities.reduce((sum, city) => sum + city.population / 10, 0)
        } else if (resource.type === "iron") {
          production = civ.cities.length * 5
        }

        // Consumption
        let consumption = 0
        if (resource.type === "food") {
          consumption = civ.cities.reduce((sum, city) => sum + city.population / 5, 0)
        }

        // Update amount
        resource.amount = Math.max(0, resource.amount + production - consumption)
      })

      // Update technology
      const sciencePoints = civ.technology.science / 10
      civ.technology.agriculture += Math.random() * sciencePoints
      civ.technology.military += Math.random() * sciencePoints
      civ.technology.culture += Math.random() * sciencePoints
      civ.technology.science += (Math.random() * sciencePoints) / 2

      // Process diplomatic relations
      Object.keys(civ.relations).forEach((otherCivId) => {
        const relation = civ.relations[otherCivId]

        // Random fluctuation in trust
        relation.trust += Math.floor(Math.random() * 11) - 5
        relation.trust = Math.max(0, Math.min(100, relation.trust))

        // Update trade based on trust
        relation.trade = Math.floor(relation.trade * (0.9 + relation.trust / 500))

        // AI decision making for war/peace
        if (relation.trust < 20 && !relation.warStatus && Math.random() < 0.1) {
          relation.warStatus = true
          relation.alliance = false
          newState.events.push({
            year: newState.currentYear,
            description: `${civ.name} declared war on ${newState.civilizations.find((c) => c.id === otherCivId)?.name}!`,
          })
        } else if (relation.warStatus && relation.trust > 40 && Math.random() < 0.2) {
          relation.warStatus = false
          newState.events.push({
            year: newState.currentYear,
            description: `${civ.name} made peace with ${newState.civilizations.find((c) => c.id === otherCivId)?.name}.`,
          })
        }

        // AI decision making for alliances
        if (relation.trust > 75 && !relation.alliance && !relation.warStatus && Math.random() < 0.2) {
          relation.alliance = true
          newState.events.push({
            year: newState.currentYear,
            description: `${civ.name} formed an alliance with ${newState.civilizations.find((c) => c.id === otherCivId)?.name}!`,
          })
        } else if (relation.alliance && relation.trust < 50 && Math.random() < 0.1) {
          relation.alliance = false
          newState.events.push({
            year: newState.currentYear,
            description: `The alliance between ${civ.name} and ${newState.civilizations.find((c) => c.id === otherCivId)?.name} has ended.`,
          })
        }
      })
    })

    // Update trade routes
    newState.tradeRoutes.forEach((route) => {
      // Fluctuate trade value
      route.value = Math.max(5, Math.min(100, route.value + Math.floor(Math.random() * 11) - 5))
    })

    // Limit events history
    if (newState.events.length > 10) {
      newState.events = newState.events.slice(newState.events.length - 10)
    }

    return newState
  },

  getDiplomaticDecisionTree(): BehavioralTreeNode {
    return diplomaticDecisionTree
  },

  getEconomicDecisionTree(): BehavioralTreeNode {
    return economicDecisionTree
  },
}

