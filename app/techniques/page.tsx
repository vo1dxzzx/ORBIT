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
  Award,
  Rocket,
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

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  const themeClasses = isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
  const cardClasses = isDarkMode
    ? "bg-gray-900/30 border-gray-800/50 hover:border-gray-700/80"
    : "bg-white/80 border-gray-200/50 hover:border-gray-300/80"
  const headerClasses = isDarkMode ? "border-gray-800/50 bg-black/80" : "border-gray-200/50 bg-white/90"

  const beginnerTechniques = [
    {
      title: "Basic Slides",
      description: "Master Neon's slide ability for speed and positioning advantages.",
      difficulty: "Beginner",
      duration: "15 sec",
      comingSoon: false,
      icon: Rocket,
      youtubeUrl: "https://youtu.be/cSMug1GN8SM",
    },
    {
      title: "Sprint Management",
      description: "Efficiently manage Neon's sprint energy for maximum mobility.",
      difficulty: "Beginner",
      duration: "30 sec",
      comingSoon: false,
      icon: Zap,
      youtubeUrl: "https://www.youtube.com/watch?v=UX-9K4l2TsU",
    },
    {
      title: "Wall Positioning",
      description: "Learn optimal wall placement and timing for maximum effectiveness.",
      difficulty: "Beginner",
      duration: "6 min",
      comingSoon: true,
      icon: Shield,
    },
  ]

  const advancedTechniques = [
    {
      title: "Ability Usage + Comms",
      description: "Master slide timing, positioning, and combat applications.",
      difficulty: "Advanced",
      duration: "30 sec",
      comingSoon: false,
      icon: Target,
      youtubeUrl: "https://www.youtube.com/watch?v=5VEc9xuq44Y",
    },
    {
      title: "Using Boxes and Ropes",
      description: "Advanced movement using boxes and ropes for maximum map presence.",
      difficulty: "Advanced",
      duration: "30 sec",
      comingSoon: false,
      icon: TrendingUp,
      youtubeUrl: "https://www.youtube.com/watch?v=OVT4NFeZULY",
    },
    {
      title: "Combo Techniques",
      description: "Chain abilities together for devastating movement combinations.",
      difficulty: "Advanced",
      duration: "15 min",
      comingSoon: true,
      icon: Crosshair,
    },
  ]

  const proTechniques = [
    {
      title: "Movement-Aim Integration",
      description: "Seamlessly integrate movement with precise aim and shooting.",
      difficulty: "Pro",
      duration: "20 sec",
      comingSoon: false,
      icon: Award,
      youtubeUrl: "https://www.youtube.com/watch?v=U26vJSmejJA",
    },
    {
      title: "Map Control Mastery",
      description: "Professional-level map control and positioning strategies.",
      difficulty: "Pro",
      duration: "25 min",
      comingSoon: true,
      icon: Target,
    },
    {
      title: "Tournament Tactics",
      description: "High-level competitive strategies used in professional play.",
      difficulty: "Pro",
      duration: "30 min",
      comingSoon: true,
      icon: Trophy,
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "border-blue-500/50 text-blue-500 bg-blue-500/10"
      case "Advanced":
        return "border-yellow-500/50 text-yellow-500 bg-yellow-500/10"
      case "Pro":
        return "border-gray-400/50 text-gray-400 bg-gray-400/10"
      default:
        return "border-blue-500/50 text-blue-500 bg-blue-500/10"
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return CheckCircle
      case "Advanced":
        return TrendingUp
      case "Pro":
        return Award
      default:
        return CheckCircle
    }
  }

  const TechniqueCard = ({ technique, index }: { technique: any; index: number }) => {
    const DifficultyIcon = getDifficultyIcon(technique.difficulty)
    const TechIcon = technique.icon
    const videoId = technique.youtubeUrl ? getYouTubeVideoId(technique.youtubeUrl) : null
    const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId) : null

    const handleVideoClick = () => {
      if (technique.youtubeUrl) {
        window.open(technique.youtubeUrl, '_blank')
      }
    }

    return (
      <Card className={`${cardClasses} group hover:scale-105 transition-all duration-300 w-full border relative overflow-hidden`}>
        <CardHeader className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className={`${getDifficultyColor(technique.difficulty)} font-light px-3 py-1 text-xs`}>
              <DifficultyIcon className="w-3 h-3 mr-1" />
              {technique.difficulty}
            </Badge>
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-1 text-xs font-light ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                <Clock className="w-3 h-3" />
                {technique.duration}
              </div>
              {technique.comingSoon ? (
                <Lock className="w-4 h-4 text-gray-400" />
              ) : (
                <Unlock className="w-4 h-4 text-blue-500" />
              )}
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg ${technique.comingSoon ? 'bg-gray-500/10' : 'bg-blue-500/10'} flex items-center justify-center`}>
              <TechIcon className={`w-6 h-6 ${technique.comingSoon ? 'text-gray-400' : 'text-blue-500'}`} />
            </div>
            <div className="flex-1">
              <CardTitle className={`text-lg mb-2 font-light ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {technique.title}
              </CardTitle>
              <CardDescription className={`text-sm font-light leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {technique.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative p-6 pt-0">
          <div className={`aspect-video rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'} relative flex items-center justify-center w-full border ${isDarkMode ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
            {technique.comingSoon ? (
              <div className="text-center space-y-3">
                <Clock className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-gray-400 font-light">Coming Soon</p>
                  <p className={`text-xs font-light ${isDarkMode ? "text-gray-500" : "text-gray-500"} mt-1`}>
                    In production
                  </p>
                </div>
              </div>
            ) : thumbnailUrl ? (
              <div 
                className="relative w-full h-full cursor-pointer group/video"
                onClick={handleVideoClick}
              >
                <img 
                  src={thumbnailUrl} 
                  alt={technique.title}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/10 transition-all duration-300 rounded-lg" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center group-hover/video:scale-110 transition-all duration-300 shadow-lg">
                    <Play className="w-6 h-6 text-gray-900 ml-0.5" fill="currentColor" />
                  </div>
                </div>
                
                <div className="absolute bottom-2 right-2">
                  <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-light">
                    {technique.duration}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <PlayCircle className="w-12 h-12 text-blue-500 mx-auto" />
                <div>
                  <p className="text-blue-500 font-light">Ready</p>
                  <p className={`text-xs font-light ${isDarkMode ? "text-gray-500" : "text-gray-500"} mt-1`}>
                    Video available
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              disabled={technique.comingSoon}
              onClick={technique.comingSoon ? undefined : handleVideoClick}
              className={`${technique.comingSoon ? 'text-gray-400' : 'text-blue-500 hover:bg-blue-500/10'} font-light px-4`}
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              {technique.comingSoon ? "Coming Soon" : "Watch"}
            </Button>
            
            <div className={`flex items-center gap-2 text-xs font-light ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
              <Users className="w-3 h-3" />
              <span>{technique.comingSoon ? "Pending" : "Available"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`flex flex-col min-h-screen w-full ${themeClasses} relative transition-all duration-500`}>
      {/* Minimal Background */}
      <div className="fixed inset-0 pointer-events-none w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-transparent to-yellow-500/3" />
        <div className="absolute top-1/4 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
        <div className="absolute bottom-1/3 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent" />
      </div>

      {/* Minimal Header */}
      <header className={`w-full px-6 h-16 flex items-center border-b ${headerClasses} backdrop-blur-sm sticky top-0 z-50 transition-all duration-300`}>
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <span className="text-xl font-light tracking-wide">Orbit</span>
        </Link>
        
        <nav className="ml-auto flex gap-8 items-center">
          {[
            { href: "/#about", label: "About" },
            { href: "/#team", label: "Team" },
            { href: "/techniques", label: "Guides", active: true },
            { href: "/#settings", label: "Settings" },
            { href: "/#community", label: "Community" },
            { href: "/#join", label: "Join" }
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-light transition-colors duration-300 ${
                item.active 
                  ? "text-blue-500" 
                  : isDarkMode ? "text-gray-300 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme} 
            className="p-2 hover:bg-gray-100/10 rounded-lg transition-all duration-300"
          >
            {isDarkMode ? 
              <Sun className="w-4 h-4 text-yellow-500" /> : 
              <Moon className="w-4 h-4 text-gray-600" />
            }
          </Button>
        </nav>
      </header>

      <main className="flex-1 relative z-10 w-full">
        {/* Minimal Hero Section */}
        <section className="relative w-full py-24 md:py-32">
          <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
            <div className="flex flex-col items-center space-y-12 text-center w-full">
              <div className="space-y-8 w-full">
                <Link
                  href="/"
                  className={`inline-flex items-center gap-2 text-sm font-light hover:text-blue-500 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
                
                <Badge
                  variant="outline"
                  className={`border-gray-300/50 ${isDarkMode ? "text-gray-400 bg-gray-900/30" : "text-gray-600 bg-gray-100/50"} backdrop-blur-sm px-4 py-2 text-sm font-light`}
                >
                  Master the Techniques
                </Badge>
                
                <h1 className="text-5xl md:text-7xl font-extralight tracking-tight leading-none">
                  <span className="bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">
                    Neon
                  </span>
                  <br />
                  <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                    Mastery
                  </span>
                </h1>
                
                <p className={`mx-auto max-w-2xl text-lg font-light leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Master Neon's abilities and movement with our comprehensive guides.
                  <br />
                  <span className="text-blue-500">From beginner basics to professional techniques.</span>
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-8">
                {[
                  { label: "Techniques", value: "9", icon: Target },
                  { label: "Available", value: "5", icon: Unlock },
                  { label: "Levels", value: "3", icon: TrendingUp },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-10 h-10 ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'} rounded-lg flex items-center justify-center mx-auto mb-2 border ${isDarkMode ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
                      <stat.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="text-xl font-light text-blue-500">{stat.value}</div>
                    <div className={`text-xs font-light ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Techniques Content */}
        <section id="techniques-content" className="w-full py-16">
          <div className="container mx-auto px-6 w-full max-w-6xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className={`grid w-full grid-cols-3 mb-12 h-12 ${isDarkMode ? "bg-gray-900/30" : "bg-gray-100/50"} rounded-lg p-1 border ${isDarkMode ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
                <TabsTrigger value="beginner" className="flex items-center gap-2 text-sm font-light rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Beginner</span>
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center gap-2 text-sm font-light rounded-md data-[state=active]:bg-yellow-500 data-[state=active]:text-white transition-all duration-300">
                  <Zap className="w-4 h-4" />
                  <span className="hidden sm:inline">Advanced</span>
                </TabsTrigger>
                <TabsTrigger value="pro" className="flex items-center gap-2 text-sm font-light rounded-md data-[state=active]:bg-gray-600 data-[state=active]:text-white transition-all duration-300">
                  <Award className="w-4 h-4" />
                  <span className="hidden sm:inline">Professional</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="beginner" className="space-y-8 w-full">
                <div className="text-center space-y-4 mb-12 w-full">
                  <h2 className="text-3xl font-extralight tracking-tight">
                    Beginner <span className="text-blue-500">Fundamentals</span>
                  </h2>
                  <p className={`mx-auto max-w-2xl text-base font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Learn core mechanics and basic gameplay fundamentals.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
                  {beginnerTechniques.map((technique, index) => (
                    <TechniqueCard key={index} technique={technique} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-8 w-full">
                <div className="text-center space-y-4 mb-12 w-full">
                  <h2 className="text-3xl font-extralight tracking-tight">
                    Advanced <span className="text-yellow-500">Techniques</span>
                  </h2>
                  <p className={`mx-auto max-w-2xl text-base font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Refine your gameplay with advanced positioning strategies.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
                  {advancedTechniques.map((technique, index) => (
                    <TechniqueCard key={index} technique={technique} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pro" className="space-y-8 w-full">
                <div className="text-center space-y-4 mb-12 w-full">
                  <h2 className="text-3xl font-extralight tracking-tight">
                    Professional <span className="text-gray-400">Mastery</span>
                  </h2>
                  <p className={`mx-auto max-w-2xl text-base font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Master the highest level of gameplay used by professionals.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
                  {proTechniques.map((technique, index) => (
                    <TechniqueCard key={index} technique={technique} index={index} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Minimal Practice Tips */}
        <section className={`w-full py-16 ${isDarkMode ? "bg-gray-950/50" : "bg-gray-50/50"} transition-colors duration-500`}>
          <div className="container mx-auto px-6 w-full max-w-6xl">
            <div className="text-center space-y-6 mb-12 w-full">
              <h2 className="text-3xl font-extralight tracking-tight">
                Practice <span className="text-blue-500">Tips</span>
              </h2>
              <p className={`mx-auto max-w-2xl text-base font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Essential guidelines to accelerate your learning.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
              {[
                {
                  icon: Gamepad2,
                  title: "Practice Range",
                  desc: "Warm up movement and aim daily",
                },
                {
                  icon: Play,
                  title: "Study Replays",
                  desc: "Analyze positioning and mistakes",
                },
                {
                  icon: Users,
                  title: "Team Practice",
                  desc: "Practice with friends in customs",
                },
                {
                  icon: Target,
                  title: "Set Goals",
                  desc: "Focus on one technique at a time",
                },
              ].map((tip, index) => (
                <Card
                  key={index}
                  className={`${cardClasses} text-center hover:scale-105 transition-all duration-300 w-full border`}
                >
                  <CardHeader className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'} flex items-center justify-center mx-auto mb-4 border ${isDarkMode ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
                      <tip.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <CardTitle className={`text-lg font-light ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className={`text-sm font-light leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {tip.desc}
                    </p>
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