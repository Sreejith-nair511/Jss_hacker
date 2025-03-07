"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, GraduationCap, BookOpen, Users, Github } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block">Nova Dash</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/courses"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/courses") ? "text-primary" : "text-muted-foreground"}`}
          >
            Courses
          </Link>
          <Link
            href="/playground"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/playground") ? "text-primary" : "text-muted-foreground"}`}
          >
            Playground
          </Link>
          <Link
            href="/community"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/community") ? "text-primary" : "text-muted-foreground"}`}
          >
            Community
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/about") ? "text-primary" : "text-muted-foreground"}`}
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href="/login" className="hidden sm:block">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup" className="hidden sm:block">
            <Button size="sm">Sign up</Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/courses"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 text-lg font-medium ${isActive("/courses") ? "text-primary" : ""}`}
                >
                  <BookOpen className="h-5 w-5" />
                  Courses
                </Link>
                <Link
                  href="/playground"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 text-lg font-medium ${isActive("/playground") ? "text-primary" : ""}`}
                >
                  <Github className="h-5 w-5" />
                  Playground
                </Link>
                <Link
                  href="/community"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 text-lg font-medium ${isActive("/community") ? "text-primary" : ""}`}
                >
                  <Users className="h-5 w-5" />
                  Community
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 text-lg font-medium ${isActive("/about") ? "text-primary" : ""}`}
                >
                  <GraduationCap className="h-5 w-5" />
                  About
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

