import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import Image from "next/image"

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="min-h-screen flex flex-col">
        <NavBar />

        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-6">About Nova Dash</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <p className="text-lg mb-4">
                Nova Dash is a cutting-edge platform dedicated to teaching the art and science of procedural universe
                simulation. Our mission is to empower students, researchers, and enthusiasts with the tools and
                knowledge to create vast, realistic digital universes.
              </p>
              <p className="text-lg mb-4">
                Founded by a team of astrophysicists, computer scientists, and educators, Nova Dash combines rigorous
                scientific principles with state-of-the-art programming techniques to offer a unique learning
                experience.
              </p>
            </div>
            <Image
              src="/images/team.jpg"
              alt="Nova Dash Team"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg mb-8">
            We envision a future where the boundaries between scientific simulation and creative expression blur, where
            students can explore the cosmos through code, and where the next generation of game developers and
            researchers can push the limits of procedural generation.
          </p>

          <h2 className="text-3xl font-bold mb-4">What Sets Us Apart</h2>
          <ul className="list-disc list-inside text-lg mb-8 space-y-2">
            <li>
              Comprehensive curriculum covering everything from basic algorithms to advanced AI-driven simulations
            </li>
            <li>Interactive, hands-on learning with real-time visualization of your code</li>
            <li>A supportive community of learners and experts</li>
            <li>Cutting-edge tools and resources based on the latest research in procedural generation</li>
            <li>Flexible learning paths suitable for beginners and experienced programmers alike</li>
          </ul>

          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Join Us on This Cosmic Journey</h2>
            <p className="text-lg">
              Whether you're dreaming of creating the next big space exploration game, conducting research in
              computational astrophysics, or simply curious about how virtual universes are built, Nova Dash has
              something for you. Start your journey today and unlock the power to create entire worlds with code.
            </p>
          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  )
}

