"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Users, Play, BookOpen, Target, ArrowLeft, Sun, Moon, CircleCheck as CheckCircle, TrendingUp, Gamepad2, Clock } from "lucide-react"
import Link from "next/link"

export default function TechniquesPage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState(tabParam || "beginner")

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam)
    }

    // Scroll to techniques content after a short delay to ensure the page has loaded
    const timer = setTimeout(() => {
      const techniquesSection = document.getElementById("techniques-content")
      if (techniquesSection) {
        techniquesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [tabParam])

  const themeClasses = "bg-slate-950 text-white"
  const cardClasses = "bg-slate-800/50 border-slate-700 hover:border-cyan-500/50"
  const headerClasses = "border-cyan-500/20 bg-slate-900/50"

  const beginnerTechniques = [
    {
      title: "Basic Slide Movement",
      description: "Master Neon's slide ability for speed and positioning advantages.",
      difficulty: "Beginner",
      comingSoon: true,
    },
    {
      title: "Sprint Management",
      description: "Efficiently manage Neon's sprint energy for maximum mobility.",
      difficulty: "Beginner",
      comingSoon: true,
    },
    {
      title: "Relay Bolt Basics",
      description: "Use Relay Bolt effectively for area denial and enemy control.",
      difficulty: "Beginner",
      comingSoon: true,
    },
  ]

  const advancedTechniques = [
    {
      title: "Advanced Slide Positioning",
      description: "Master slide timing, positioning, and combat applications.",
      difficulty: "Advanced",
      comingSoon: true,
    },
    {
      title: "Energy Optimization",
      description: "Advanced energy management for maximum map presence.",
      difficulty: "Advanced",
      comingSoon: true,
    },
    {
      title: "Relay Bolt Mastery",
      description: "Advanced Relay Bolt techniques for maximum impact.",
      difficulty: "Advanced",
      comingSoon: true,
    },
  ]

  const proTechniques = [
    {
      title: "Movement-Aim Integration",
      description: "Seamlessly integrate movement with precise aim and shooting.",
      difficulty: "Pro",
      comingSoon: true,
    },
    {
      title: "Advanced Positioning",
      description: "Use Neon's mobility for superior map control and positioning.",
      difficulty: "Pro",
      comingSoon: true,
    },
    {
      title: "Ultimate Usage Mastery",
      description: "Maximize Overdrive effectiveness in different scenarios.",
      difficulty: "Pro",
      comingSoon: true,
    },
  ]

  return (
    <div
      className={`flex flex-col min-h-screen w-full ${themeClasses} relative overflow-hidden transition-colors duration-300`}
    >
      {/* Header */}
      <header
        className={`w-full px-4 lg:px-6 h-16 flex items-center border-b ${headerClasses} backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300`}
      >
        <Link href="/" className="flex items-center justify-center gap-2">
          <div className="relative">
            <img
              src="/orbit-logo.png"
              alt="Orbit Logo"
              className="h-8 w-8 filter drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Orbit
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="/#about"
            className={`text-sm font-medium hover:text-cyan-400 transition-colors text-white`}
          >
            About
          </Link>
          <Link
            href="/#team"
            className={`text-sm font-medium hover:text-cyan-400 transition-colors text-white`}
          >
            Team
          </Link>
          <Link href="/techniques" className={`text-sm font-medium text-cyan-400 transition-colors`}>
            Guides
          </Link>
          <Link
            href="/#settings"
            className={`text-sm font-medium hover:text-cyan-400 transition-colors text-white`}
          >
            Settings
          </Link>
          <Link
            href="/#community"
            className={`text-sm font-medium hover:text-cyan-400 transition-colors text-white`}
          >
            Community
          </Link>
          <Link
            href="/#join"
            className={`text-sm font-medium hover:text-cyan-400 transition-colors text-white`}
          >
            Join Us
          </Link>

        </nav>
      </header>

      <main className="flex-1 relative z-10 w-full">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 overflow-hidden">
          <div
            className={`absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10`}
          />
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />

          <div className="container mx-auto px-4 md:px-6 relative z-10 w-full max-w-7xl">
            <div className="flex flex-col items-center space-y-8 text-center w-full">
              <div className="space-y-4 w-full">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
                <Badge
                  variant="outline"
                  className="border-cyan-400/50 text-cyan-300 bg-gradient-to-r from-cyan-400/10 to-yellow-400/5"
                >
                  <Target className="w-3 h-3 mr-1" />
                  Master the Techniques
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-yellow-300 bg-clip-text text-transparent">
                    Neon Mastery Guide
                  </span>
                </h1>
                <p
                  className={`mx-auto max-w-[700px] text-lg md:text-xl text-slate-300`}
                >
                  Master Neon's abilities, movement, and positioning with our comprehensive video guides.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Techniques Content */}
        <section id="techniques-content" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className={`grid w-full grid-cols-3 mb-12 ${isDarkMode ? "bg-slate-800/50" : "bg-gray-100"}`}>
                <TabsTrigger value="beginner" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Beginner
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Advanced
                </TabsTrigger>
                <TabsTrigger value="pro" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Pro Level
                </TabsTrigger>
              </TabsList>

              <TabsContent value="beginner" className="space-y-8 w-full">
                <div className="text-center space-y-4 mb-12 w-full">
                  <h2 className="text-3xl font-bold tracking-tighter">Beginner Fundamentals</h2>
                  <p className={`mx-auto max-w-[600px] text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                    Learn the core mechanics of Neon's abilities and basic gameplay fundamentals.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
                  {beginnerTechniques.map((technique, index) => (
                    <Card
                      key={index}
                      className={`${cardClasses} hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 opacity-75 w-full`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="border-green-400/50 text-green-400">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {technique.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-orange-400">
                            <Clock className="w-3 h-3" />
                            Coming Soon
                          </div>
                        </div>
                        <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>{technique.title}</CardTitle>
                        <CardDescription className={isDarkMode ? "text-slate-300" : "text-gray-600"}>
                          {technique.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video rounded-lg overflow-hidden bg-slate-900 relative flex items-center justify-center w-full">
                          <div className="text-center space-y-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
                              <Clock className="w-8 h-8 text-cyan-400" />
                            </div>
                            <div>
                              <p className="text-cyan-400 font-semibold text-sm">Coming Soon</p>
                              <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                                Video tutorial in production
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-8 w-full">
                <div className="text-center space-y-4 mb-12 w-full">
                  <h2 className="text-3xl font-bold tracking-tighter">Advanced Techniques</h2>
                  <p className={`mx-auto max-w-[600px] text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                    Refine your Neon gameplay with advanced ability usage and positioning strategies.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
                  {advancedTechniques.map((technique, index) => (
                    <Card
                      key={index}
                      className={`${cardClasses} hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 opacity-75 w-full`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="border-yellow-400/50 text-yellow-400">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {technique.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-orange-400">
                            <Clock className="w-3 h-3" />
                            Coming Soon
                          </div>
                        </div>
                        <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>{technique.title}</CardTitle>
                        <CardDescription className={isDarkMode ? "text-slate-300" : "text-gray-600"}>
                          {technique.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video rounded-lg overflow-hidden bg-slate-900 relative flex items-center justify-center w-full">
                          <div className="text-center space-y-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
                              <Clock className="w-8 h-8 text-cyan-400" />
                            </div>
                            <div>
                              <p className="text-cyan-400 font-semibold text-sm">Coming Soon</p>
                              <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                                Video tutorial in production
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pro" className="space-y-8 w-full">
                <div className="text-center space-y-4 mb-12 w-full">
                  <h2 className="text-3xl font-bold tracking-tighter">Pro Level Mastery</h2>
                  <p className={`mx-auto max-w-[600px] text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                    Master the highest level of Neon gameplay used by professional players.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
                  {proTechniques.map((technique, index) => (
                    <Card
                      key={index}
                      className={`${cardClasses} hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 opacity-75 w-full`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="border-red-400/50 text-red-400">
                            <Target className="w-3 h-3 mr-1" />
                            {technique.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-orange-400">
                            <Clock className="w-3 h-3" />
                            Coming Soon
                          </div>
                        </div>
                        <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>{technique.title}</CardTitle>
                        <CardDescription className={isDarkMode ? "text-slate-300" : "text-gray-600"}>
                          {technique.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video rounded-lg overflow-hidden bg-slate-900 relative flex items-center justify-center w-full">
                          <div className="text-center space-y-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
                              <Clock className="w-8 h-8 text-cyan-400" />
                            </div>
                            <div>
                              <p className="text-cyan-400 font-semibold text-sm">Coming Soon</p>
                              <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                                Video tutorial in production
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Practice Tips Section */}
        <section
          className={`w-full py-16 md:py-24 ${isDarkMode ? "bg-slate-900/30" : "bg-gray-100/50"} transition-colors duration-500`}
        >
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="text-center space-y-4 mb-12 w-full">
              <h2 className="text-3xl font-bold tracking-tighter">Practice Tips</h2>
              <p className={`mx-auto max-w-[600px] text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                Essential tips to accelerate your learning and master Neon gameplay faster.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
              {[
                {
                  icon: Gamepad2,
                  title: "Use Practice Range",
                  desc: "Start every session in the practice range to warm up your movement and aim.",
                },
                {
                  icon: Play,
                  title: "Watch Replays",
                  desc: "Study your gameplay to identify positioning mistakes and improvement opportunities.",
                },
                {
                  icon: Users,
                  title: "Practice with Friends",
                  desc: "Use custom games with friends to practice ability usage in realistic scenarios.",
                },
                {
                  icon: Target,
                  title: "Set Daily Goals",
                  desc: "Focus on mastering one technique at a time with specific daily practice goals.",
                },
              ].map((tip, index) => (
                <Card
                  key={index}
                  className={`${cardClasses} text-center hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 w-full`}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/20 to-yellow-400/20 flex items-center justify-center mx-auto mb-2">
                      <tip.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <CardTitle className={`text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-sm ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>{tip.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
