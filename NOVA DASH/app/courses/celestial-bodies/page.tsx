import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PythonEditor } from "@/components/python-editor"
import { SimulationViewer } from "@/components/simulation-viewer"
import { CourseSidebar } from "@/components/course-sidebar"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Code, Play, CheckCircle2 } from "lucide-react"

export default function CelestialBodiesPage() {
  // Course content
  const courseContent = {
    title: "Celestial Body Generation",
    description: "Create stars, planets, and moons with realistic properties and appearances",
    progress: 15,
    currentLesson: 1,
    totalLessons: 7,
    objectives: [
      "Understand the physics of celestial bodies",
      "Learn to generate realistic star systems",
      "Create procedural planets with varied characteristics",
      "Implement orbital mechanics for realistic movement",
    ],
    prerequisites: [
      "Completion of Fundamentals of Procedural Generation module",
      "Basic understanding of physics concepts",
      "Familiarity with Python and NumPy",
    ],
  }

  // Python code example for this lesson
  const starSystemCode = `import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
import random
from mpl_toolkits.mplot3d import Axes3D

class Star:
    def __init__(self, mass, radius, temperature, age, position=[0, 0, 0]):
        self.mass = mass  # In solar masses
        self.radius = radius  # In solar radii
        self.temperature = temperature  # In Kelvin
        self.age = age  # In billions of years
        self.position = np.array(position)  # [x, y, z] in AU
        self.planets = []
        
        # Determine star type and color based on temperature
        self.determine_type_and_color()
    
    def determine_type_and_color(self):
        # Determine star type based on temperature
        if self.temperature > 30000:
            self.type = "O-type"
            self.color = [0.8, 0.8, 1.0]  # Blue
        elif self.temperature > 10000:
            self.type = "B-type"
            self.color = [0.8, 0.9, 1.0]  # Blue-white
        elif self.temperature > 7500:
            self.type = "A-type"
            self.color = [1.0, 1.0, 1.0]  # White
        elif self.temperature > 6000:
            self.type = "F-type"
            self.color = [1.0, 1.0, 0.8]  # Yellow-white
        elif self.temperature > 5200:
            self.type = "G-type"
            self.color = [1.0, 0.9, 0.0]  # Yellow (like our Sun)
        elif self.temperature > 3700:
            self.type = "K-type"
            self.color = [1.0, 0.7, 0.0]  # Orange
        else:
            self.type = "M-type"
            self.color = [1.0, 0.3, 0.0]  # Red
    
    def add_planet(self, planet):
        self.planets.append(planet)
        planet.star = self
    
    def __str__(self):
        return f"{self.type} star: {self.mass:.1f} solar masses, {self.temperature:,} K"

class Planet:
    def __init__(self, mass, radius, orbit_distance, orbit_eccentricity, orbit_inclination, composition):
        self.mass = mass  # In Earth masses
        self.radius = radius  # In Earth radii
        self.orbit_distance = orbit_distance  # In AU
        self.orbit_eccentricity = orbit_eccentricity  # 0 = circular, 1 = parabolic
        self.orbit_inclination = orbit_inclination  # In degrees
        self.composition = composition  # Dictionary of composition percentages
        self.moons = []
        self.star = None
        self.position = np.zeros(3)  # [x, y, z] in AU
        self.orbit_angle = random.uniform(0, 2 * np.pi)  # Random starting position
        
        # Determine planet type and color based on composition and orbit
        self.determine_type_and_color()
    
    def determine_type_and_color(self):
        # Simplified planet type determination
        if "gas" in self.composition and self.composition["gas"] > 70:
            if self.mass > 50:  # Jupiter-like
                self.type = "Gas Giant"
                self.color = [0.8, 0.7, 0.5]  # Jupiter-like colors
            else:  # Neptune-like
                self.type = "Ice Giant"
                self.color = [0.5, 0.7, 0.9]  # Neptune-like colors
        elif "rock" in self.composition and self.composition["rock"] > 60:
            if self.orbit_distance < 0.8:  # Close to star
                self.type = "Rocky (Hot)"
                self.color = [0.8, 0.4, 0.2]  # Reddish
            elif 0.8 <= self.orbit_distance <= 1.5:  # Habitable zone (approx)
                self.type = "Rocky (Temperate)"
                self.color = [0.2, 0.5, 0.8]  # Bluish (water)
            else:  # Far from star
                self.type = "Rocky (Cold)"
                self.color = [0.8, 0.8, 0.9]  # Icy white
        else:
            self.type = "Mixed Composition"
            self.color = [0.6, 0.6, 0.6]  # Gray
    
    def add_moon(self, moon):
        self.moons.append(moon)
        moon.planet = self
    
    def update_position(self, time):
        # Calculate position based on orbital parameters
        # This is a simplified model
        angle = self.orbit_angle + time * np.sqrt(1 / self.orbit_distance**3)  # Kepler's third law
        
        # Calculate position in orbital plane
        x = self.orbit_distance * np.cos(angle) * (1 - self.orbit_eccentricity**2) / (1 + self.orbit_eccentricity * np.cos(angle))
        y = self.orbit_distance * np.sin(angle) * (1 - self.orbit_eccentricity**2) / (1 + self.orbit_eccentricity * np.cos(angle))
        
        # Apply inclination
        inclination_rad = np.radians(self.orbit_inclination)
        z = y * np.sin(inclination_rad)
        y = y * np.cos(inclination_rad)
        
        self.position = np.array([x, y, z])
        if self.star:
            self.position += self.star.position
    
    def __str__(self):
        return f"{self.type} planet: {self.mass:.1f} Earth masses, {self.radius:.1f} Earth radii, {self.orbit_distance:.2f} AU"

def generate_star_system(seed=None):
    """Generate a procedural star system"""
    if seed is not None:
        random.seed(seed)
        np.random.seed(seed)
    
    # Generate the central star
    star_mass = random.uniform(0.1, 2.0)  # Solar masses
    star_radius = star_mass ** 0.8  # Approximate relation
    
    # Temperature depends on mass (simplified)
    if star_mass < 0.5:
        star_temp = random.uniform(2500, 4000)  # M-type
    elif star_mass < 0.8:
        star_temp = random.uniform(4000, 5200)  # K-type
    elif star_mass < 1.05:
        star_temp = random.uniform(5200, 6000)  # G-type
    elif star_mass < 1.4:
        star_temp = random.uniform(6000, 7500)  # F-type
    else:
        star_temp = random.uniform(7500, 10000)  # A-type
    
    star_age = random.uniform(0.1, 10.0)  # Billions of years
    
    star = Star(star_mass, star_radius, star_temp, star_age)
    
    # Determine number of planets based on star mass
    num_planets = int(random.uniform(0, 8))
    
    # Generate planets
    for i in range(num_planets):
        # Planet properties
        planet_mass = 10 ** random.uniform(-1, 2)  # Earth masses, log scale
        planet_radius = planet_mass ** 0.4  # Approximate relation
        
        # Orbit properties
        min_orbit = 0.1 * star_mass  # Minimum stable orbit
        if i == 0:
            orbit_distance = random.uniform(min_orbit, min_orbit + 0.5)
        else:
            # Each planet is further out than the previous one
            prev_orbit = star.planets[-1].orbit_distance
            orbit_distance = random.uniform(prev_orbit + 0.1, prev_orbit + 2.0)
        
        orbit_eccentricity = random.uniform(0, 0.2)  # Most planets have low eccentricity
        orbit_inclination = random.uniform(0, 10)  # Most planets have low inclination
        
        # Composition depends on orbit distance
        if orbit_distance < 0.7:  # Inner planets
            composition = {
                "rock": random.uniform(70, 95),
                "metal": random.uniform(5, 30),
                "gas": random.uniform(0, 5)
            }
        elif orbit_distance < 2.0:  # Middle planets
            composition = {
                "rock": random.uniform(40, 80),
                "metal": random.uniform(5, 20),
                "gas": random.uniform(10, 40),
                "ice": random.uniform(0, 20)
            }
        else:  # Outer planets
            if random.random() < 0.7:  # 70% chance of gas giant
                composition = {
                    "rock": random.uniform(5, 15),
                    "metal": random.uniform(0, 5),
                    "gas": random.uniform(70, 95),
                    "ice": random.uniform(0, 20)
                }
            else:  # 30% chance of ice/rock world
                composition = {
                    "rock": random.uniform(30, 60),
                    "metal": random.uniform(0, 10),
                    "gas": random.uniform(10, 30),
                    "ice": random.uniform(20, 60)
                }
        
        planet = Planet(planet_mass, planet_radius, orbit_distance, orbit_eccentricity, orbit_inclination, composition)
        star.add_planet(planet)
        
        # Generate moons for larger planets
        if planet_mass > 1:  # Only planets larger than Earth get moons
            num_moons = int(random.uniform(0, min(5, planet_mass / 5)))
            # Moon generation would go here (simplified for brevity)
    
    return star

def visualize_star_system(star, time=0):
    """Visualize the star system in 3D"""
    # Update positions of all planets
    for planet in star.planets:
        planet.update_position(time)
    
    # Create 3D plot
    fig = plt.figure(figsize=(12, 10))
    ax = fig.add_subplot(111, projection='3d')
    
    # Plot star
    ax.scatter([star.position[0]], [star.position[1]], [star.position[2]], 
               s=star.radius * 50, c=[star.color], alpha=0.8, edgecolors='none')
    
    # Plot planets
    for planet in star.planets:
        ax.scatter([planet.position[0]], [planet.position[1]], [planet.position[2]], 
                   s=planet.radius * 20, c=[planet.color], alpha=0.8, edgecolors='none')
        
        # Plot orbit
        theta = np.linspace(0, 2*np.pi, 100)
        orbit_x = planet.orbit_distance * np.cos(theta)
        orbit_y = planet.orbit_distance * np.sin(theta)
        orbit_z = np.zeros_like(theta)
        
        # Apply inclination to orbit
        inclination_rad = np.radians(planet.orbit_inclination)
        orbit_z = orbit_y * np.sin(inclination_rad)
        orbit_y = orbit_y * np.cos(inclination_rad)
        
        ax.plot(orbit_x + star.position[0], orbit_y + star.position[1], orbit_z + star.position[2], 
                color='gray', alpha=0.2)
    
    # Set axis limits
    max_orbit = max([p.orbit_distance for p in star.planets]) if star.planets else 1
    ax.set_xlim(-max_orbit*1.2, max_orbit*1.2)
    ax.set_ylim(-max_orbit*1.2, max_orbit*1.2)
    ax.set_zlim(-max_orbit*0.6, max_orbit*0.6)
    
    # Labels
    ax.set_xlabel('X (AU)')
    ax.set_ylabel('Y (AU)')
    ax.set_zlabel('Z (AU)')
    ax.set_title(f'Procedural Star System: {star.type} Star with {len(star.planets)} planets')
    
    plt.tight_layout()
    return fig

# Generate and visualize a star system
seed = 42
star_system = generate_star_system(seed)

print(f"Generated Star System (Seed: {seed})")
print(f"Central Star: {star_system}")
print(f"Number of Planets: {len(star_system.planets)}")
for i, planet in enumerate(star_system.planets):
    print(f"Planet {i+1}: {planet}")

# Visualize the system
fig = visualize_star_system(star_system)
plt.show()

print("\nTry experimenting with different seeds to generate unique star systems!")
print("You can also modify the code to create different types of stars or planetary compositions.")
`

  return (
    <main className="min-h-screen flex flex-col">
      <NavBar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-20 lg:self-start">
            <CourseSidebar />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{courseContent.title}</h1>
                  <p className="text-muted-foreground">{courseContent.description}</p>
                </div>
                <Badge className="w-fit" variant="outline">
                  Lesson {courseContent.currentLesson} of {courseContent.totalLessons}
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{courseContent.progress}%</span>
                  </div>
                  <Progress value={courseContent.progress} className="h-2" />
                </div>
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark as Complete
                </Button>
              </div>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Lesson 1: Introduction to Celestial Body Generation</CardTitle>
                <CardDescription>
                  Learn the principles of generating realistic stars, planets, and moons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Understanding Celestial Bodies</h3>
                  <p>
                    Celestial bodies are natural objects that exist in space, including stars, planets, moons,
                    asteroids, and comets. In procedural generation, we can create these objects with realistic
                    properties based on scientific principles while allowing for creative variation.
                  </p>

                  <h4>Key Concepts in Celestial Body Generation:</h4>
                  <ul>
                    <li>
                      <strong>Star Formation</strong> - Stars form from clouds of gas and dust, with their mass
                      determining their color, temperature, and lifespan.
                    </li>
                    <li>
                      <strong>Planetary Systems</strong> - Planets form in disks around stars, with their composition
                      varying based on distance from the star.
                    </li>
                    <li>
                      <strong>Orbital Mechanics</strong> - Celestial bodies follow orbital paths determined by gravity,
                      with parameters like eccentricity and inclination.
                    </li>
                    <li>
                      <strong>Surface Generation</strong> - Planetary surfaces are shaped by various processes including
                      impacts, tectonics, erosion, and atmospheric effects.
                    </li>
                  </ul>

                  <h3>Learning Objectives</h3>
                  <ul>
                    {courseContent.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>

                  <h3>Prerequisites</h3>
                  <ul>
                    {courseContent.prerequisites.map((prerequisite, index) => (
                      <li key={index}>{prerequisite}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="learn">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="learn">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Learn
                </TabsTrigger>
                <TabsTrigger value="code">
                  <Code className="h-4 w-4 mr-2" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="visualize">
                  <Play className="h-4 w-4 mr-2" />
                  Visualize
                </TabsTrigger>
              </TabsList>

              <TabsContent value="learn" className="p-4 border rounded-md mt-2">
                <h3 className="text-xl font-bold mb-4">The Science of Star Systems</h3>
                <p className="mb-4">
                  Star systems are complex arrangements of celestial bodies that form through natural processes.
                  Understanding these processes helps us create more realistic procedural generations.
                </p>

                <h4 className="text-lg font-semibold mb-2">Star Types and Properties:</h4>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Star Type</th>
                        <th className="border p-2 text-left">Temperature (K)</th>
                        <th className="border p-2 text-left">Color</th>
                        <th className="border p-2 text-left">Mass Range (Solar)</th>
                        <th className="border p-2 text-left">Lifespan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">O-type</td>
                        <td className="border p-2">30,000+</td>
                        <td className="border p-2">Blue</td>
                        <td className="border p-2">15-90</td>
                        <td className="border p-2">1-10 million years</td>
                      </tr>
                      <tr>
                        <td className="border p-2">B-type</td>
                        <td className="border p-2">10,000-30,000</td>
                        <td className="border p-2">Blue-white</td>
                        <td className="border p-2">2.5-15</td>
                        <td className="border p-2">10-100 million years</td>
                      </tr>
                      <tr>
                        <td className="border p-2">A-type</td>
                        <td className="border p-2">7,500-10,000</td>
                        <td className="border p-2">White</td>
                        <td className="border p-2">1.4-2.5</td>
                        <td className="border p-2">100-1,000 million years</td>
                      </tr>
                      <tr>
                        <td className="border p-2">F-type</td>
                        <td className="border p-2">6,000-7,500</td>
                        <td className="border p-2">Yellow-white</td>
                        <td className="border p-2">1.05-1.4</td>
                        <td className="border p-2">1-5 billion years</td>
                      </tr>
                      <tr>
                        <td className="border p-2">G-type (Sun)</td>
                        <td className="border p-2">5,200-6,000</td>
                        <td className="border p-2">Yellow</td>
                        <td className="border p-2">0.8-1.05</td>
                        <td className="border p-2">5-15 billion years</td>
                      </tr>
                      <tr>
                        <td className="border p-2">K-type</td>
                        <td className="border p-2">3,700-5,200</td>
                        <td className="border p-2">Orange</td>
                        <td className="border p-2">0.5-0.8</td>
                        <td className="border p-2">15-30 billion years</td>
                      </tr>
                      <tr>
                        <td className="border p-2">M-type</td>
                        <td className="border p-2">2,500-3,700</td>
                        <td className="border p-2">Red</td>
                        <td className="border p-2">0.08-0.5</td>
                        <td className="border p-2">30-200 billion years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-lg font-semibold mb-2">Planet Formation and Types:</h4>
                <p className="mb-4">
                  Planets form in the protoplanetary disk around a young star. Their composition and characteristics are
                  largely determined by their distance from the star:
                </p>

                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <strong>Terrestrial Planets</strong> - Rocky worlds that form in the inner regions of a star system
                    where temperatures are high. Examples: Mercury, Venus, Earth, Mars.
                  </li>
                  <li>
                    <strong>Gas Giants</strong> - Large planets with thick atmospheres of hydrogen and helium that form
                    in the outer regions. Examples: Jupiter, Saturn.
                  </li>
                  <li>
                    <strong>Ice Giants</strong> - Planets with cores of rock and ice, surrounded by thick atmospheres.
                    Examples: Uranus, Neptune.
                  </li>
                  <li>
                    <strong>Dwarf Planets</strong> - Smaller bodies that orbit stars and have sufficient mass to be
                    rounded by their own gravity. Example: Pluto.
                  </li>
                </ul>

                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="font-semibold mb-2">Pro Tip:</h4>
                  <p>
                    When generating star systems, consider the "habitable zone" - the region around a star where
                    temperatures allow liquid water to exist on a planet's surface. This zone varies based on the star's
                    temperature and luminosity.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="code" className="mt-2">
                <PythonEditor initialCode={starSystemCode} />
              </TabsContent>

              <TabsContent value="visualize" className="mt-2">
                <SimulationViewer />
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-6">
              <Link href="/courses/fundamentals">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Module
                </Button>
              </Link>
              <Link href="/courses/celestial-bodies/lesson-2">
                <Button>
                  Next Lesson
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

