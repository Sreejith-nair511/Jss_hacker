export interface WorldState {
  currentYear: number
  civilizations: Civilization[]
  resourceNodes: ResourceNode[]
  tradeRoutes: TradeRoute[]
  events: Event[]
}

export interface Civilization {
  id: string
  name: string
  color: string
  cities: City[]
  resources: Resource[]
  technology: Technology
  relations: Record<string, Relation>
}

export interface City {
  id: string
  name: string
  x: number
  y: number
  population: number
  resources: Resource[]
}

export interface Resource {
  id: string
  type: string
  amount: number
}

export interface ResourceNode {
  id: string
  type: string
  x: number
  y: number
  amount: number
}

export interface Technology {
  agriculture: number
  military: number
  culture: number
  science: number
}

export interface Relation {
  trust: number
  trade: number
  alliance: boolean
  warStatus: boolean
}

export interface TradeRoute {
  id: string
  from: string
  to: string
  value: number
  resourceType: string
}

export interface Event {
  year: number
  description: string
}

export type BehavioralTreeNodeType = "selector" | "sequence" | "condition" | "action"

export interface BehavioralTreeNode {
  type: BehavioralTreeNodeType
  name: string
  children?: BehavioralTreeNode[]
}

