import Link from "next/link"
import { GraduationCap, Github, Twitter, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Nova Dash</span>
            </Link>
            <p className="text-muted-foreground mb-4">Learn AI-Driven Procedural Universe Simulation in Python</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Courses</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses/fundamentals"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Fundamentals of Procedural Generation
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/celestial-bodies"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Celestial Body Generation
                </Link>
              </li>
              <li>
                <Link href="/courses/terrain" className="text-muted-foreground hover:text-primary transition-colors">
                  Terrain & Atmosphere Simulation
                </Link>
              </li>
              <li>
                <Link href="/courses/ecosystems" className="text-muted-foreground hover:text-primary transition-colors">
                  Ecosystem & Life Simulation
                </Link>
              </li>
              <li>
                <Link href="/courses/ai-systems" className="text-muted-foreground hover:text-primary transition-colors">
                  AI-Driven Simulation Systems
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/playground" className="text-muted-foreground hover:text-primary transition-colors">
                  Code Playground
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-muted-foreground hover:text-primary transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Nova Dash. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center">
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 mr-4"
            >
              <Mail className="h-4 w-4" />
              Contact Support
            </Link>
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by Sreejith and kdbugger
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

