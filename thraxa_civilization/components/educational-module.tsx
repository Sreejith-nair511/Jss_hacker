"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EducationalModule() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("ai")

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full flex items-center justify-between p-4">
            <span className="font-medium">Educational Information</span>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="ai">AI Algorithms</TabsTrigger>
                <TabsTrigger value="civilization">Civilization Dynamics</TabsTrigger>
                <TabsTrigger value="simulation">Simulation Concepts</TabsTrigger>
              </TabsList>

              <TabsContent value="ai" className="space-y-4">
                <h3 className="font-bold text-lg">AI Algorithms in Thraxa</h3>
                <p className="text-sm">Thraxa uses several AI techniques to simulate civilization behavior:</p>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>
                    <strong>Behavioral Trees:</strong> Used for decision-making in diplomacy and economy. They allow for
                    complex, hierarchical decision processes.
                  </li>
                  <li>
                    <strong>Rule-based Systems:</strong> Govern basic interactions and resource management.
                  </li>
                  <li>
                    <strong>Utility-based AI:</strong> Helps civilizations evaluate the usefulness of actions and
                    resources.
                  </li>
                  <li>
                    <strong>Simple Machine Learning:</strong> Civilizations learn from past interactions to adjust their
                    strategies.
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="civilization" className="space-y-4">
                <h3 className="font-bold text-lg">Civilization Dynamics</h3>
                <p className="text-sm">The simulation models complex interactions between civilizations:</p>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>
                    <strong>Resource Management:</strong> Balancing food, gold, and materials for growth and
                    development.
                  </li>
                  <li>
                    <strong>Technological Progress:</strong> Advancements in various fields affect civilization
                    capabilities.
                  </li>
                  <li>
                    <strong>Diplomatic Relations:</strong> Trust, alliances, and conflicts shape inter-civilization
                    dynamics.
                  </li>
                  <li>
                    <strong>Cultural Evolution:</strong> Unique cultural traits emerge and influence civilization
                    behavior.
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="simulation" className="space-y-4">
                <h3 className="font-bold text-lg">Key Simulation Concepts</h3>
                <p className="text-sm">Thraxa incorporates several important simulation concepts:</p>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>
                    <strong>Emergent Behavior:</strong> Complex patterns arise from simple rules and interactions.
                  </li>
                  <li>
                    <strong>Stochastic Processes:</strong> Random elements introduce unpredictability and variety.
                  </li>
                  <li>
                    <strong>Feedback Loops:</strong> Actions have consequences that affect future decisions and events.
                  </li>
                  <li>
                    <strong>Multi-agent Systems:</strong> Multiple AI-driven entities interact in a shared environment.
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

