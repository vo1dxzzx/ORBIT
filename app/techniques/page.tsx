"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  Users,
  Play,
  BookOpen,
  Target,
  ArrowLeft,
  Sun,
  Moon,
  CheckCircle,
  TrendingUp,
  Gamepad2,
  Clock,
  Star,
  Sparkles,
  Award,
  Flame,
  Trophy,
  Rocket,
  ChevronRight,
  PlayCircle,
  Lock,
  Unlock,
  Shield,
  Crosshair,
} from "lucide-react"
import Link from "next/link"

export default function TechniquesPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const themeClasses = isDarkMode ? "bg-slate-950 text-white" : "bg-gray-50 text-gray-900"
  const cardClasses = isDarkMode
    ? "bg-slate-800/60 border-slate-700/50 hover:border-cyan-400/60 backdrop-blur-sm"
    : "bg-white/90 border-gray-200/50 hover:border-cyan-400/60 backdrop-blur-sm"
  const headerClasses = isDarkMode ? "border-cyan-500/20 bg-slate-900/80" : "border-cyan-400/30 bg-white/90"

  const beginnerTechniques = [
    {
      title: "Basic Slides",
      description: "Master Neon's slide ability for speed and positioning advantages.",
      difficulty: "Beginner",
      duration: "5 min",
      comingSoon: false, // OPEN
      icon: Rocket,
      gradient: "from-green-400 to-emerald-500",
      youtubeUrl: "https://youtu.be/cSMug1GN8SM", // You can paste YouTube URL here
    },
    {
      title: "Sprint Management",
      description: "Efficiently manage Neon's sprint energy for maximum mobility.",
      difficulty: "Beginner",
      duration: "7 min",
      comingSoon: false, // OPEN
      icon: Zap,
      gradient: "from-blue-400 to-cyan-500",
      youtubeUrl: "", // You can paste YouTube URL here
    },
    {
      title: "Wall Positioning",
      description: "Learn optimal wall placement and timing for maximum effectiveness.",
      difficulty: "Beginner",
      duration: "6 min",
      comingSoon: true, // COMING SOON
      icon: Shield,
      gradient: "from-purple-400 to-pink-500",
    },
  ]

  const advancedTechniques = [
    {
      title: "Advanced Slide Positioning",
      description: "Master slide timing, positioning, and combat applications.",
      difficulty: "Advanced",
      duration: "12 min",
      comingSoon: false, // OPEN
      icon: Flame,
      gradient: "from-orange-400 to-red-500",
      youtubeUrl: "", // You can paste YouTube URL here
    },
    {
      title: "Energy Optimization",
      description: "Advanced energy management for maximum map presence.",
      difficulty: "Advanced",
      duration: "10 min",
      comingSoon: false, // OPEN
      icon: TrendingUp,
      gradient: "from-yellow-400 to-orange-500",
      youtubeUrl: "", // You can paste YouTube URL here
    },
    {
      title: "Combo Techniques",
      description: "Chain abilities together for devastating movement combinations.",
      difficulty: "Advanced",
      duration: "15 min",
      comingSoon: true, // COMING SOON
      icon: Crosshair,
      gradient: "from-cyan-400 to-blue-500",
    },
  ]

  const proTechniques = [
    {
      title: "Movement-Aim Integration",
      description: "Seamlessly integrate movement with precise aim and shooting.",
      difficulty: "Pro",
      duration: "20 min",
      comingSoon: false, // OPEN
      icon: Trophy,
      gradient: "from-red-400 to-pink-500",
      youtubeUrl: "", // You can paste YouTube URL here
    },
    {
      title: "Map Control Mastery",
      description: "Professional-level map control and positioning strategies.",
      difficulty: "Pro",
      duration: "25 min",
      comingSoon: true, // COMING SOON
      icon: Target,
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      title: "Tournament Tactics",
      description: "High-level competitive strategies used in professional play.",
      difficulty: "Pro",
      duration: "30 min",
      comingSoon: true, // COMING SOON
      icon: Award,
      gradient: "from-gold-400 to-yellow-500",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "border-green-400/50 text-green-400 bg-green-400/10"
      case "Advanced":
        return "border-yellow-400/50 text-yellow-400 bg-yellow-400/10"
      case "Pro":
        return "border-red-400/50 text-red-400 bg-red-400/10"
      default:
        return "border-cyan-400/50 text-cyan-400 bg-cyan-400/10"
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return CheckCircle
      case "Advanced":
        return TrendingUp
      case "Pro":
        return Trophy
      default:
        return CheckCircle
    }
  }

  const TechniqueCard = ({ technique, index }: { technique: any; index: number }) => {
    const DifficultyIcon = getDifficultyIcon(technique.difficulty)
    const TechIcon = technique.icon

    return (
      <Card
        className={`${cardClasses} group hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-500 w-full border-2 relative overflow-hidden`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Background gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${technique.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
        
        <CardHeader className="relative">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className={`${getDifficultyColor(technique.difficulty)} font-medium px-3 py-1`}>
              <DifficultyIcon className="w-3 h-3 mr-1.5" />
              {technique.difficulty}
            </Badge>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-cyan-400 font-medium">
                <Clock className="w-3 h-3" />
                {technique.duration}
              </div>
              {technique.comingSoon ? (
                <Lock className="w-4 h-4 text-orange-400" />
              ) : (
                <Unlock className="w-4 h-4 text-green-400" />
              )}
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${technique.gradient} bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-white/10`}>
              <TechIcon className="w-7 h-7 text-white drop-shadow-lg" />
            </div>
            <div className="flex-1">
              <CardTitle className={`text-xl mb-2 ${isDarkMode ? "text-white" : "text-gray-900"} group-hover:text-cyan-400 transition-colors duration-300`}>
                {technique.title}
              </CardTitle>
              <CardDescription className={`text-base leading-relaxed ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                {technique.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative">
          <div className="aspect-video rounded-xl overflow-hidden bg-slate-900/50 relative flex items-center justify-center w-full border border-slate-700/50 group-hover:border-cyan-400/30 transition-all duration-300">
            {technique.comingSoon ? (
              <div className="text-center space-y-4">
                <div className={`w-20 h-20 bg-gradient-to-br ${technique.gradient} bg-opacity-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 border-2 border-white/20`}>
                  <Clock className="w-10 h-10 text-cyan-400 drop-shadow-lg" />
                </div>
                <div>
                  <p className="text-cyan-400 font-semibold text-lg">Coming Soon</p>
                  <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"} mt-1`}>
                    Video tutorial in production
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className={`w-20 h-20 bg-gradient-to-br ${technique.gradient} bg-opacity-30 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 border-2 border-white/20`}>
                  <PlayCircle className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <div>
                  <p className="text-green-400 font-semibold text-lg">Ready for Video</p>
                  <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"} mt-1`}>
                    Paste YouTube URL in code
                  </p>
                </div>
              </div>
            )}
            
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0s" }} />
              <div className="absolute top-8 right-6 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              disabled={technique.comingSoon}
              className="border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/15 bg-transparent hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed px-6"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              {technique.comingSoon ? "Coming Soon" : "Watch Now"}
            </Button>
            
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Users className="w-3 h-3" />
              <span>0 views</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div
      className={`flex flex-col min-h-screen w-full ${themeClasses} relative overflow-hidden transition-all duration-700`}
    >
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none w-full h-full">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: "6s", animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/8 to-pink-500/8 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: "5s", animationDelay: "1s" }} />
      </div>

      {/* Header */}
      <header
        className={`w-full px-4 lg:px-6 h-16 flex items-center border-b ${headerClasses} backdrop-blur-md sticky top-0 z-50 transition-all duration-500`}
      >
        <Link href="/" className="flex items-center justify-center gap-3 group">
          <div className="relative">
            <img
              src="/orbit-logo.png"
              alt="Orbit Logo"
              className="h-8 w-8 filter drop-shadow-[0_0_12px_rgba(0,255,255,0.8)] group-hover:drop-shadow-[0_0_16px_rgba(0,255,255,1)] transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300">
            Orbit
          </span>
        </Link>
        <nav className="ml-auto flex gap-6 items-center">
          {[
            { href: "/#about", label: "About" },
            { href: "/#team", label: "Team" },
            { href: "/techniques", label: "Guides", active: true },
            { href: "/#settings", label: "Settings" },
            { href: "/#community", label: "Community" },
            { href: "/#join", label: "Join Us" }
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-all duration-300 relative group ${
                item.active 
                  ? "text-cyan-400" 
                  : isDarkMode ? "text-white hover:text-cyan-400" : "text-gray-700 hover:text-cyan-400"
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 ${
                item.active ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}

          {/* Enhanced Theme Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme} 
            className="p-2 hover:bg-cyan-400/10 rounded-full transition-all duration-300 hover:scale-110"
          >
            {isDarkMode ? 
              <Sun className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_8px_rgba(255,255,0,0.6)]" /> : 
              <Moon className="w-4 h-4 text-slate-600" />
            }
          </Button>
        </nav>
      </header>

      <main className="flex-1 relative z-10 w-full">
        {/* Enhanced Hero Section */}
        <section className="relative w-full py-20 md:py-32 overflow-hidden">
          <div
            className={`absolute inset-0 w-full h-full ${isDarkMode ? "bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10" : "bg-gradient-to-br from-cyan-400/20 via-blue-400/10 to-purple-400/15"}`}
          />
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />

          <div className="container mx-auto px-4 md:px-6 relative z-10 w-full max-w-7xl">
            <div className="flex flex-col items-center space-y-8 text-center w-full">
              <div className="space-y-6 w-full">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-all duration-300 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  Back to Home
                </Link>
                <Badge
                  variant="outline"
                  className="border-cyan-400/50 text-cyan-300 bg-gradient-to-r from-cyan-400/10 to-yellow-400/5 backdrop-blur-sm px-4 py-2 text-sm font-medium hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="w-3 h-3 mr-2" />
                  Master the Techniques
                  <ChevronRight className="w-3 h-3 ml-2" />
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-yellow-300 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: "3s" }}>
                    Neon Mastery
                  </span>
                  <br />
                  <span className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                    Guide
                  </span>
                </h1>
                <p
                  className={`mx-auto max-w-[700px] text-lg md:text-xl leading-relaxed ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}
                >
                  Master Neon's abilities, movement, and positioning with our comprehensive video guides.
                  <br />
                  <span className="text-cyan-400 font-semibold">From beginner basics to pro-level techniques.</span>
                </p>
              </div>
              
              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-8 mt-8">
                {[
                  { label: "Techniques", value: "9", icon: Target },
                  { label: "Available Now", value: "5", icon: Unlock },
                  { label: "Skill Levels", value: "3", icon: TrendingUp },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-all duration-300 border border-cyan-400/30">
                      <stat.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                    <div className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Techniques Content */}
        <section id="techniques-content" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className={`grid w-full grid-cols-3 mb-12 h-14 ${isDarkMode ? "bg-slate-800/50" : "bg-gray-100"} rounded-2xl p-2`}>
                <TabsTrigger value="beginner" className="flex items-center gap-3 text-base font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white transition-all duration-300">
                  <BookOpen className="w-5 h-5" />
                  <span className="hidden sm:inline">Beginner</span>
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center gap-3 text-base font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300">
                  <Zap className="w-5 h-5" />
                  <span className="hidden sm:inline">Advanced</span>
                </TabsTrigger>
                <TabsTrigger value="pro" className="flex items-center gap-3 text-base font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300">
                  <Trophy className="w-5 h-5" />
                  <span className="hidden sm:inline">Pro Level</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="beginner" className="space-y-8 w-full">
                <div className="text-center space-y-4 mb-12 w-full">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter">Beginner Fundamentals</h2>
                  </div>
                  <p className={`mx-auto max-w-[600px] text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                    Learn the core mechanics of Neon's abilities and basic gameplay fundamentals.
                    Perfect for players new to Neon or looking to solidify their foundation.
                  </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
                  {beginnerTechniques.map((technique, index) => (
                    <TechniqueCard key={index} technique={technique} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-8 w-full">
                <div className="text-center space-y-4 mb-12 w-full">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter">Advanced Techniques</h2>
                  </div>
                  <p className={`mx-auto max-w-[600px] text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                    Refine your Neon gameplay with advanced ability usage and positioning strategies.
                    Take your skills to the next level with complex movement patterns.
                  </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
                  {advancedTechniques.map((technique, index) => (
                    <TechniqueCard key={index} technique={technique} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pro" className="space-y-8 w-full">
                <div className="text-center space-y-4 mb-12 w-full">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter">Pro Level Mastery</h2>
                  </div>
                  <p className={`mx-auto max-w-[600px] text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                    Master the highest level of Neon gameplay used by professional players.
                    Perfect your technique with tournament-level strategies and mechanics.
                  </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
                  {proTechniques.map((technique, index) => (
                    <TechniqueCard key={index} technique={technique} index={index} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Enhanced Practice Tips Section */}
        <section
          className={`w-full py-16 md:py-24 ${isDarkMode ? "bg-slate-900/30" : "bg-gray-100/50"} transition-colors duration-500 backdrop-blur-sm`}
        >
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="text-center space-y-6 mb-16 w-full">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter">Practice Tips</h2>
              </div>
              <p className={`mx-auto max-w-[600px] text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                Essential tips to accelerate your learning and master Neon gameplay faster.
                Follow these guidelines to maximize your practice sessions.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 w-full">
              {[
                {
                  icon: Gamepad2,
                  title: "Use Practice Range",
                  desc: "Start every session in the practice range to warm up your movement and aim.",
                  gradient: "from-green-400 to-emerald-500",
                },
                {
                  icon: Play,
                  title: "Watch Replays",
                  desc: "Study your gameplay to identify positioning mistakes and improvement opportunities.",
                  gradient: "from-blue-400 to-cyan-500",
                },
                {
                  icon: Users,
                  title: "Practice with Friends",
                  desc: "Use custom games with friends to practice ability usage in realistic scenarios.",
                  gradient: "from-purple-400 to-pink-500",
                },
                {
                  icon: Target,
                  title: "Set Daily Goals",
                  desc: "Focus on mastering one technique at a time with specific daily practice goals.",
                  gradient: "from-yellow-400 to-orange-500",
                },
              ].map((tip, index) => (
                <Card
                  key={index}
                  className={`${cardClasses} text-center hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-500 w-full group border-2 relative overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tip.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                  <CardHeader className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tip.gradient} bg-opacity-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 border border-white/10`}>
                      <tip.icon className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-gray-900"} group-hover:text-cyan-400 transition-colors duration-300`}>
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>{tip.desc}</p>
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