import Link from "next/link"

export default function AIAlgorithmsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm underline mb-4 inline-block">
          ← Back to Simulation
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">AI Algorithms in Thraxa</h1>

        <div className="space-y-8">
          <AIAlgorithmSection
            title="Reinforcement Learning"
            description="Civilizations learn optimal strategies through trial and error, maximizing long-term rewards."
            details={[
              "Q-learning for resource management",
              "Policy gradients for diplomatic decisions",
              "Multi-arm bandits for exploration vs. exploitation",
            ]}
          />

          <AIAlgorithmSection
            title="Probabilistic Neural Networks (PNN)"
            description="Used for pattern recognition and classification tasks within the simulation."
            details={[
              "Rapid training for adaptive decision making",
              "Classifying diplomatic situations",
              "Predicting outcomes of military conflicts",
            ]}
          />

          <AIAlgorithmSection
            title="Evolutionary Algorithms"
            description="Simulates the process of natural selection to evolve optimal strategies and traits."
            details={[
              "Genetic algorithms for technology tree evolution",
              "Coevolution of competing civilizations",
              "Adaptive mutation rates based on environmental pressure",
            ]}
          />

          <AIAlgorithmSection
            title="Genetic Programming"
            description="Evolves computer programs to solve complex problems and adapt to changing environments."
            details={[
              "Evolving decision trees for resource allocation",
              "Adaptive city planning and expansion strategies",
              "Dynamic adjustment of economic policies",
            ]}
          />

          <AIAlgorithmSection
            title="Multi-Agent Reinforcement Learning"
            description="Enables multiple AI agents to learn and interact in a shared environment."
            details={[
              "Cooperative and competitive learning between civilizations",
              "Emergent behaviors in diplomatic relations",
              "Decentralized control of multiple cities within a civilization",
            ]}
          />

          <AIAlgorithmSection
            title="Graph Neural Networks (GNN)"
            description="Processes data structured as graphs, ideal for modeling complex relationships."
            details={[
              "Modeling trade networks and resource flow",
              "Analyzing and predicting diplomatic relationships",
              "Optimizing city connections and infrastructure",
            ]}
          />

          <AIAlgorithmSection
            title="Behavioral Trees"
            description="Hierarchical structure for modeling complex AI behaviors and decision-making processes."
            details={[
              "High-level strategy planning for civilizations",
              "Reactive and dynamic decision making in warfare",
              "Modular and reusable behavior patterns",
            ]}
          />
        </div>
      </div>
    </div>
  )
}

function AIAlgorithmSection({ title, description, details }) {
  return (
    <section className="bg-white/10 rounded-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">{title}</h2>
      <p className="mb-4 text-sm sm:text-base">{description}</p>
      <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </section>
  )
}

