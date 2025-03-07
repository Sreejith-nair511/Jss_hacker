import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { CourseOverview } from "@/components/course-overview"
import { FeatureHighlights } from "@/components/feature-highlights"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { NavBar } from "@/components/nav-bar"
import { PageTransition } from "@/components/page-transition"
import Image from "next/image"

export default function Home() {
  return (
    <PageTransition>
      <main className="min-h-screen flex flex-col">
        <NavBar />
        <HeroSection />
        <CourseOverview />
        <FeatureHighlights />
        <Testimonials />
        <section className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Own Universe?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join Nova Dash today and embark on a journey to master procedural universe simulation with Python.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/courses/introduction">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Learning Now
              </Button>
            </Link>
            <Link href="/playground">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Try the Playground
              </Button>
            </Link>
          </div>
        </section>
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Explore the Cosmos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Image
                src="/images/galaxy.jpg"
                alt="Spiral Galaxy"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
              <Image
                src="/images/planet.jpg"
                alt="Exoplanet"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
              <Image
                src="/images/nebula.jpg"
                alt="Colorful Nebula"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </PageTransition>
  )
}

