"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PythonEditor } from "@/components/python-editor"
import { SimulationViewer } from "@/components/simulation-viewer"
import { PlaygroundControls } from "@/components/playground-controls"
import { Separator } from "@/components/ui/separator"
import { Save, Download, Upload, Share, Code, Play, Settings } from "lucide-react"
import { PageTransition } from "@/components/page-transition"

export default function PlaygroundPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("terrain")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Template code examples
  const templates = {
    terrain: `import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap

def generate_terrain(width, height, scale=10.0, octaves=6, persistence=0.5, lacunarity=2.0, seed=None):
    """Generate terrain using Perlin-like noise"""
    if seed is not None:
        np.random.seed(seed)
    
    # Create an empty noise array
    terrain = np.zeros((height, width))
    
    # Generate noise by summing octaves
    max_amplitude = 0
    amplitude = 1.0
    frequency = 1.0
    
    for i in range(octaves):
        # Generate random gradient vectors
        grid = np.random.rand(int(height/scale*frequency)+1, int(width/scale*frequency)+1) * 2 - 1
        
        # For each pixel, compute the dot product between the gradient vectors and distance vectors
        for y in range(height):
            for x in range(width):
                # Compute grid cell coordinates
                grid_y = int(y / scale * frequency)
                grid_x = int(x / scale * frequency)
                
                # Compute local coordinates within the grid cell (0 to 1)
                local_y = (y / scale * frequency) - grid_y
                local_x = (x / scale * frequency) - grid_x
                
                # Get gradients from grid
                g00 = grid[grid_y, grid_x]
                g01 = grid[grid_y, grid_x+1]
                g10 = grid[grid_y+1, grid_x]
                g11 = grid[grid_y+1, grid_x+1]
                
                # Compute dot products
                v00 = g00 * local_x + g00 * local_y
                v01 = g01 * (local_x - 1) + g01 * local_y
                v10 = g10 * local_x + g10 * (local_y - 1)
                v11 = g11 * (local_x - 1) + g11 * (local_y - 1)
                
                # Bilinear interpolation
                wx = local_x * local_x * (3 - 2 * local_x)
                wy = local_y * local_y * (3 - 2 * local_y)
                
                vx0 = v00 + wx * (v01 - v00)
                vx1 = v10 + wx * (v11 - v10)
                value = vx0 + wy * (vx1 - vx0)
                
                # Add noise value to the result
                terrain[y, x] += value * amplitude
        
        # Update parameters for next octave
        max_amplitude += amplitude
        amplitude *= persistence
        frequency *= lacunarity
    
    # Normalize terrain to range [0, 1]
    terrain = (terrain / max_amplitude + 1) / 2
    
    return terrain

# Generate terrain
width, height = 512, 512
terrain = generate_terrain(width, height, scale=64.0, octaves=8, persistence=0.5, lacunarity=2.0, seed=42)

# Create a custom colormap for terrain visualization
terrain_colors = [
    (0.0, (0.0, 0.0, 0.5)),    # Deep water
    (0.3, (0.0, 0.0, 1.0)),    # Shallow water
    (0.4, (0.8, 0.8, 0.0)),    # Beach
    (0.5, (0.0, 0.8, 0.0)),    # Grass
    (0.7, (0.5, 0.5, 0.0)),    # Mountain
    (0.9, (0.5, 0.5, 0.5)),    # Mountain peak
    (1.0, (1.0, 1.0, 1.0))     # Snow
]

terrain_cmap = LinearSegmentedColormap.from_list('terrain', terrain_colors)

# Plot the terrain
plt.figure(figsize=(10, 10))
plt.imshow(terrain, cmap=terrain_cmap)
plt.title('Procedural Terrain Generation')
plt.axis('off')
plt.tight_layout()
plt.show()

print("Terrain generation complete!")
print("This terrain could be used as a height map for a 3D world or game level.")
print("Try adjusting the parameters to create different types of terrain:")
print("- Increase 'scale' for larger features (mountains, valleys)")
print("- Increase 'octaves' for more detail")
print("- Adjust 'persistence' to control how much each octave contributes")
print("- Change 'seed' for completely different terrain patterns")`,

    galaxy: `import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
import random

def generate_galaxy(num_stars=10000, spiral_arms=5, arm_width=0.5, rotation=2.0, size=1000, seed=None):
    """Generate a spiral galaxy with the given parameters"""
    if seed is not None:
        random.seed(seed)
        np.random.seed(seed)
    
    # Create empty arrays for star positions and colors
    x = np.zeros(num_stars)
    y = np.zeros(num_stars)
    colors = np.zeros((num_stars, 3))
    
    # Core-to-edge ratio (how much of the galaxy is in the central bulge)
    core_ratio = 0.3
    
    # Generate stars
    for i in range(num_stars):
        # Decide if this star is in the core or in a spiral arm
        in_core = random.random() < core_ratio
        
        if in_core:
            # Core stars follow a normal distribution around the center
            distance = abs(np.random.normal(0, 0.5))
            angle = random.random() * 2 * np.pi
            
            # Older, redder stars in the core
            colors[i] = [
                min(1.0, 0.8 + random.random() * 0.2),  # Red
                min(1.0, 0.5 + random.random() * 0.3),  # Green
                min(1.0, 0.3 + random.random() * 0.2)   # Blue
            ]
        else:
            # Spiral arm stars
            arm = random.randint(0, spiral_arms - 1)
            arm_angle = 2 * np.pi * arm / spiral_arms
            
            # Distance from center (exponential distribution for spiral shape)
            distance = random.random() ** 0.5  # Square root to spread stars outward
            
            # Angle based on distance (creates the spiral)
            angle = arm_angle + rotation * distance
            
            # Add some random variation to create arm width
            angle += (random.random() - 0.5) * arm_width * (1 - distance)
            
            # Younger, bluer stars in the arms
            colors[i] = [
                min(1.0, 0.5 + random.random() * 0.5),  # Red
                min(1.0, 0.5 + random.random() * 0.5),  # Green
                min(1.0, 0.8 + random.random() * 0.2)   # Blue
            ]
        
        # Convert polar coordinates to Cartesian
        x[i] = distance * np.cos(angle) * size / 2
        y[i] = distance * np.sin(angle) * size / 2
    
    return x, y, colors

# Generate galaxy
x, y, colors = generate_galaxy(num_stars=20000, spiral_arms=5, arm_width=0.5, rotation=3.0, seed=42)

# Plot the galaxy
plt.figure(figsize=(10, 10), facecolor='black')
plt.scatter(x, y, s=1, c=colors)
plt.title('Procedural Galaxy Generation', color='white')
plt.xlim(-500, 500)
plt.ylim(-500, 500)
plt.axis('off')
plt.tight_layout()
plt.show()

print("Galaxy generation complete!")
print("This procedural galaxy contains 20,000 stars arranged in 5 spiral arms.")
print("Try adjusting the parameters to create different types of galaxies:")
print("- Increase 'spiral_arms' for more arms")
print("- Adjust 'arm_width' to make arms tighter or looser")
print("- Change 'rotation' to control how tightly the arms spiral")
print("- Change 'seed' for completely different galaxy patterns")`,

    ecosystem: `import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import random

class Creature:
    def __init__(self, x, y, energy, speed, size, color):
        self.x = x
        self.y = y
        self.energy = energy
        self.speed = speed
        self.size = size
        self.color = color
        self.age = 0
        self.max_age = random.randint(50, 100)
    
    def move(self, width, height, food_map):
        # Find direction with most food (simple AI)
        best_direction = None
        best_food = 0
        
        directions = [
            (0, 1),   # North
            (1, 1),   # Northeast
            (1, 0),   # East
            (1, -1),  # Southeast
            (0, -1),  # South
            (-1, -1), # Southwest
            (-1, 0),  # West
            (-1, 1)   # Northwest
        ]
        
        for dx, dy in directions:
            new_x = int((self.x + dx * self.speed) % width)
            new_y = int((self.y + dy * self.speed) % height)
            
            # Check food in this direction
            food_value = food_map[new_y, new_x]
            
            if food_value > best_food:
                best_food = food_value
                best_direction = (dx, dy)
        
        # If no good direction found, move randomly
        if best_direction is None or random.random() < 0.2:  # 20% chance of random movement
            best_direction = random.choice(directions)
        
        # Move in the chosen direction
        self.x = (self.x + best_direction[0] * self.speed) % width
        self.y = (self.y + best_direction[1] * self.speed) % height
        
        # Consume energy for movement
        self.energy -= 0.1 * self.speed * self.size
        
        # Eat food at new position
        food_amount = food_map[int(self.y), int(self.x)] * 0.2
        self.energy += food_amount
        food_map[int(self.y), int(self.x)] -= food_amount
        
        # Age the creature
        self.age += 1
    
    def reproduce(self, width, height):
        # Reproduce if enough energy
        if self.energy > 20 and random.random() < 0.05:  # 5% chance per step if enough energy
            # Create child with slight mutations
            child_speed = max(0.5, min(5, self.speed + random.uniform(-0.2, 0.2)))
            child_size = max(0.5, min(3, self.size + random.uniform(-0.1, 0.1)))
            
            # Color based on attributes (red=speed, green=size)
            child_color = [
                min(1.0, child_speed / 5),
                min(1.0, child_size / 3),
                0.5
            ]
            
            child = Creature(
                self.x + random.uniform(-5, 5),
                self.y + random.uniform(-5, 5),
                self.energy / 3,  # Give 1/3 of energy to child
                child_speed,
                child_size,
                child_color
            )
            
            self.energy /= 2  # Parent loses energy from reproduction
            
            return child
        return None
    
    def is_alive(self):
        return self.energy > 0 and self.age < self.max_age

def generate_food_map(width, height, regrowth_rate=0.01):
    """Generate and update food resources on the map"""
    # Add some food according to regrowth rate
    new_food = np.random.random((height, width)) * regrowth_rate
    return new_food

def run_ecosystem_simulation(width=100, height=100, num_creatures=50, num_steps=1000, seed=None):
    """Run a simple ecosystem simulation"""
    if seed is not None:
        random.seed(seed)
        np.random.seed(seed)
    
    # Initialize food map with random distribution
    food_map = np.random.random((height, width)) * 0.5
    
    # Create initial creatures
    creatures = []
    for _ in range(num_creatures):
        creatures.append(Creature(
            random.uniform(0, width),
            random.uniform(0, height),
            random.uniform(10, 20),  # Initial energy
            random.uniform(0.5, 2.0),  # Speed
            random.uniform(0.5, 1.5),  # Size
            [random.random(), random.random(), 0.5]  # Color
        ))
    
    # Statistics tracking
    population_history = []
    avg_speed_history = []
    avg_size_history = []
    
    # Run simulation
    for step in range(num_steps):
        # Regrow food
        food_map += generate_food_map(width, height)
        food_map = np.clip(food_map, 0, 1)  # Cap food at maximum value of 1
        
        # Move creatures and handle reproduction
        new_creatures = []
        for creature in creatures:
            creature.move(width, height, food_map)
            
            # Possible reproduction
            child = creature.reproduce(width, height)
            if child:
                new_creatures.append(child)
        
        # Add new creatures
        creatures.extend(new_creatures)
        
        # Remove dead creatures
        creatures = [c for c in creatures if c.is_alive()]
        
        # Record statistics
        population_history.append(len(creatures))
        if creatures:
            avg_speed_history.append(sum(c.speed for c in creatures) / len(creatures))
            avg_size_history.append(sum(c.size for c in creatures) / len(creatures))
        else:
            avg_speed_history.append(0)
            avg_size_history.append(0)
        
        # Print status every 100 steps
        if step % 100 == 0:
            print(f"Step {step}: {len(creatures)} creatures")
    
    # Plot results
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 12))
    
    # Plot population over time
    ax1.plot(population_history, 'b-', label='Population')
    ax1.set_title('Ecosystem Simulation Results')
    ax1.set_xlabel('Time Steps')
    ax1.set_ylabel('Population')
    ax1.legend()
    ax1.grid(True)
    
    # Plot average traits over time
    ax2.plot(avg_speed_history, 'r-', label='Avg Speed')
    ax2.plot(avg_size_history, 'g-', label='Avg Size')
    ax2.set_xlabel('Time Steps')
    ax2.set_ylabel('Trait Value')
    ax2.legend()
    ax2.grid(True)
    
    plt.tight_layout()
    plt.show()
    
    # Final state visualization
    plt.figure(figsize=(10, 10))
    
    # Plot final food distribution
    plt.imshow(food_map, cmap='Greens', alpha=0.6)
    
    # Plot final creature positions
    if creatures:
        x_positions = [c.x for c in creatures]
        y_positions = [c.y for c in creatures]
        sizes = [c.size * 50 for c in creatures]
        colors = [c.color for c in creatures]
        plt.scatter(x_positions, y_positions, s=sizes, c=colors)
    
    plt.title(f'Final Ecosystem State: {len(creatures)} creatures')
    plt.colorbar(label='Food Availability')
    plt.axis('off')
    plt.tight_layout()
    plt.show()
    
    return {
        'population_history': population_history,
        'avg_speed_history': avg_speed_history,
        'avg_size_history': avg_size_history,
        'final_creatures': len(creatures)
    }

# Run the simulation
results = run_ecosystem_simulation(width=100, height=100, num_creatures=50, num_steps=500, seed=42)

print("\nSimulation complete!")
print(f"Final population: {results['final_creatures']} creatures")
print(f"Evolution trends:")
print(f"- Starting average speed: {results['avg_speed_history'][0]:.2f}")
print(f"- Final average speed: {results['avg_speed_history'][-1]:.2f}")
print(f"- Starting average size: {results['avg_size_history'][0]:.2f}")
print(f"- Final average size: {results['avg_size_history'][-1]:.2f}")
print("\nTry adjusting parameters to see different evolutionary outcomes:")
print("- Increase initial population for more genetic diversity")
print("- Adjust food regrowth rate to create different selection pressures")
print("- Change reproduction energy threshold to affect population growth")
`,
  }

  return (
    <PageTransition>
      <main className="min-h-screen flex flex-col">
        <NavBar />

        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Python Playground</h1>
                <p className="text-muted-foreground">
                  Experiment with procedural generation techniques in an interactive environment
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Choose a Template</CardTitle>
                    <CardDescription>Start with a pre-built example or create your own from scratch</CardDescription>
                  </div>

                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="terrain">Terrain Generation</SelectItem>
                      <SelectItem value="galaxy">Galaxy Simulation</SelectItem>
                      <SelectItem value="ecosystem">Ecosystem Evolution</SelectItem>
                      <SelectItem value="blank">Blank Template</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Separator />

                <Tabs defaultValue="code" className="w-full">
                  <div className="flex justify-between items-center p-4 bg-muted/30">
                    <TabsList>
                      <TabsTrigger value="code">
                        <Code className="mr-2 h-4 w-4" />
                        Code
                      </TabsTrigger>
                      <TabsTrigger value="visualization">
                        <Play className="mr-2 h-4 w-4" />
                        Visualization
                      </TabsTrigger>
                      <TabsTrigger value="settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </TabsTrigger>
                    </TabsList>

                    <Button>
                      <Play className="mr-2 h-4 w-4" />
                      Run Simulation
                    </Button>
                  </div>

                  <TabsContent value="code" className="m-0">
                    <PythonEditor initialCode={templates[selectedTemplate as keyof typeof templates] || ""} />
                  </TabsContent>

                  <TabsContent value="visualization" className="m-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                      <div className="col-span-2">
                        <SimulationViewer />
                      </div>
                      <div className="border-l">
                        <PlaygroundControls />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="m-0 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Simulation Settings</CardTitle>
                          <CardDescription>Configure parameters for your simulation</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Simulation Speed</label>
                              <Select defaultValue="normal">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select speed" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="slow">Slow</SelectItem>
                                  <SelectItem value="normal">Normal</SelectItem>
                                  <SelectItem value="fast">Fast</SelectItem>
                                  <SelectItem value="realtime">Real-time</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Output Format</label>
                              <Select defaultValue="interactive">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select format" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="interactive">Interactive</SelectItem>
                                  <SelectItem value="static">Static Image</SelectItem>
                                  <SelectItem value="animation">Animation</SelectItem>
                                  <SelectItem value="data">Raw Data</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Random Seed</label>
                              <div className="flex gap-2">
                                <input
                                  type="number"
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder="Enter seed (optional)"
                                  defaultValue="42"
                                />
                                <Button variant="outline" size="icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                  </svg>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Visualization Settings</CardTitle>
                          <CardDescription>Configure how your simulation is displayed</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Color Scheme</label>
                              <Select defaultValue="terrain">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select scheme" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="terrain">Terrain</SelectItem>
                                  <SelectItem value="spectral">Spectral</SelectItem>
                                  <SelectItem value="viridis">Viridis</SelectItem>
                                  <SelectItem value="plasma">Plasma</SelectItem>
                                  <SelectItem value="custom">Custom</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Resolution</label>
                              <Select defaultValue="medium">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select resolution" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low (256x256)</SelectItem>
                                  <SelectItem value="medium">Medium (512x512)</SelectItem>
                                  <SelectItem value="high">High (1024x1024)</SelectItem>
                                  <SelectItem value="ultra">Ultra (2048x2048)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Display Mode</label>
                              <Select defaultValue="3d">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2d">2D Map</SelectItem>
                                  <SelectItem value="3d">3D Render</SelectItem>
                                  <SelectItem value="contour">Contour Lines</SelectItem>
                                  <SelectItem value="wireframe">Wireframe</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  )
}

