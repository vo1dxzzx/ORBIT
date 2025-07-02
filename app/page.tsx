"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Zap, Users, Play, BookOpen, Target, ArrowRight, DiscIcon as Discord, Youtube, Sun, Moon } from "lucide-react"
import Link from "next/link"

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [dpi, setDpi] = useState([800])
  const [inGameSens, setInGameSens] = useState([0.4])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    discordUsername: "",
    youtubeChannel: "",
  })

  useEffect(() => {
    // Generate random particles for animation
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Update the handleDiscordSubmit function:
  const handleDiscordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.discordUsername.trim() || !formData.youtubeChannel.trim()) {
      setSubmitMessage("Please fill in all fields")
      return
    }

    // Basic YouTube URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(channel\/|c\/|user\/|@)|youtu\.be\/)/
    if (!youtubeRegex.test(formData.youtubeChannel)) {
      setSubmitMessage("Please enter a valid YouTube channel URL")
      return
    }

    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const webhookUrl =
        "https://discord.com/api/webhooks/1389628197527617606/qmXqgwphXvGFfrnNgMhNOhMk9qEC86XE6DO6HorhNLVUHz7ocFt8bEEDQafesUOHKmLa"

      const payload = {
        embeds: [
          {
            title: "🚀 New Orbit Member!",
            description: `**${formData.name}** wants to join the Orbit community!`,
            color: 0x00ffff,
            fields: [
              {
                name: "Name",
                value: formData.name,
                inline: true,
              },
              {
                name: "Discord Username",
                value: formData.discordUsername,
                inline: true,
              },
              {
                name: "YouTube Channel",
                value: formData.youtubeChannel,
                inline: false,
              },
              {
                name: "Timestamp",
                value: new Date().toLocaleString(),
                inline: false,
              },
            ],
            footer: {
              text: "Orbit Neon Community",
            },
          },
        ],
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSubmitMessage("✅ Successfully sent! We'll reach out soon.")
        setFormData({ name: "", discordUsername: "", youtubeChannel: "" })
      } else {
        setSubmitMessage("❌ Failed to send. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("❌ Error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const themeClasses = isDarkMode ? "bg-slate-950 text-white" : "bg-gray-50 text-gray-900"

  const cardClasses = isDarkMode
    ? "bg-slate-800/50 border-slate-700 hover:border-cyan-500/50"
    : "bg-white/80 border-gray-200 hover:border-cyan-400/50"

  const headerClasses = isDarkMode ? "border-cyan-500/20 bg-slate-900/50" : "border-cyan-400/30 bg-white/80"

  return (
    <div
      className={`flex flex-col min-h-screen w-full ${themeClasses} relative overflow-hidden transition-colors duration-500`}
    >
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none w-full h-full">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: "3s",
            }}
          />
        ))}
        {/* Floating electric lines */}
        <div
          className="absolute top-1/4 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent transform rotate-12 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-3/4 right-1/4 w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transform -rotate-45 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-3/4 w-20 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent transform rotate-45 animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Header */}
      <header
        className={`w-full px-4 lg:px-6 h-16 flex items-center border-b ${headerClasses} backdrop-blur-sm sticky top-0 z-50 transition-colors duration-500`}
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
            href="#about"
            className={`text-sm font-medium hover:text-cyan-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-700"}`}
          >
            About
          </Link>
          <Link
            href="#team"
            className={`text-sm font-medium hover:text-cyan-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-700"}`}
          >
            Team
          </Link>
          <Link
            href="/techniques"
            className={`text-sm font-medium hover:text-cyan-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-700"}`}
          >
            Guides
          </Link>
          <Link
            href="#settings"
            className={`text-sm font-medium hover:text-cyan-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-700"}`}
          >
            Settings
          </Link>
          <Link
            href="#community"
            className={`text-sm font-medium hover:text-cyan-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-700"}`}
          >
            Community
          </Link>
          <Link
            href="#join"
            className={`text-sm font-medium hover:text-cyan-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-700"}`}
          >
            Join Us
          </Link>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2 hover:bg-cyan-400/10">
            {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </Button>
        </nav>
      </header>

      <main className="flex-1 relative z-10 w-full">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          <div
            className={`absolute inset-0 w-full h-full ${isDarkMode ? "bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10" : "bg-gradient-to-br from-cyan-400/20 via-blue-400/10 to-purple-400/15"}`}
          />
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />

          <div className="container mx-auto px-4 md:px-6 relative z-10 w-full max-w-7xl">
            <div className="flex flex-col items-center space-y-8 text-center w-full">
              <div className="space-y-4 w-full">
                <Badge
                  variant="outline"
                  className="border-cyan-400/50 text-cyan-300 bg-gradient-to-r from-cyan-400/10 to-yellow-400/5"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Elite Neon Movement Specialists
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-yellow-300 bg-clip-text text-transparent">
                    Master Neon
                  </span>
                </h1>
                <p
                  className={`mx-auto max-w-[700px] text-lg md:text-xl ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}
                >
                  Join <span className="text-cyan-400 font-semibold">Orbit</span>, the ultimate Valorant community
                  dedicated to perfecting Neon movement, advanced bhopping techniques, and lightning-fast gameplay.
                  Elevate your game to professional levels.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold border-0 hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.6),0_0_40px_rgba(255,255,0,0.2)] transition-all duration-300"
                >
                  <a
                    href="https://www.youtube.com/@ORBIT_Neon/?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Tutorials
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 bg-transparent hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300"
                >
                  <a href="https://discord.gg/jPvQddavDM" target="_blank" rel="noopener noreferrer">
                    <Users className="w-4 h-4 mr-2" />
                    Join Community
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className={`w-full py-16 md:py-24 ${isDarkMode ? "bg-slate-900/30" : "bg-gray-100/50"} transition-colors duration-500`}
        >
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center w-full">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Neon?</h2>
                  <p className={`text-lg leading-relaxed ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                    Neon isn't just an agent – she's a movement revolution. Our community has spent thousands of hours
                    perfecting the art of Neon movement, from basic slides to advanced bhop chains that leave enemies
                    stunned.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-cyan-400">Lightning-Fast Movement</h3>
                      <p className={`text-sm ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                        Master slide cancels, wall running, and momentum preservation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-yellow-400">Advanced Bhopping</h3>
                      <p className={`text-sm ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                        Learn frame-perfect techniques for maximum speed retention
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-cyan-400">Competitive Edge</h3>
                      <p className={`text-sm ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                        Outmaneuver opponents with unpredictable movement patterns
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative w-full">
                {/* 3D Movement Visualizer Placeholder */}
                <div
                  className={`aspect-video rounded-lg border flex items-center justify-center relative overflow-hidden w-full ${isDarkMode ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30" : "bg-gradient-to-br from-cyan-400/30 to-blue-400/30 border-cyan-400/40"}`}
                >
                  <div className="text-center space-y-2 z-10">
                    <Zap className="w-16 h-16 text-cyan-400 mx-auto animate-pulse" />
                    <p className={isDarkMode ? "text-slate-300" : "text-gray-700"}>3D Movement Showcase</p>
                    <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                      Interactive Demo Coming Soon
                    </p>
                  </div>
                  {/* 3D-like animated elements */}
                  <div className="absolute inset-0">
                    <div
                      className="absolute top-4 left-4 w-8 h-8 border-2 border-cyan-400/50 rounded transform rotate-45 animate-spin"
                      style={{ animationDuration: "8s" }}
                    />
                    <div
                      className="absolute bottom-4 right-4 w-6 h-6 border-2 border-yellow-400/50 rounded-full animate-bounce"
                      style={{ animationDelay: "1s" }}
                    />
                    <div className="absolute top-1/2 left-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-12 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Settings Optimizer Section */}
        <section id="settings" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="text-center space-y-4 mb-12 w-full">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Settings Optimizer</h2>
              <p className={`mx-auto max-w-[600px] text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                Optimize your Valorant settings for maximum Neon movement performance.
              </p>
            </div>

            <div className="w-full max-w-2xl mx-auto">
              <Card
                className={`${cardClasses} hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 w-full`}
              >
                <CardHeader>
                  <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>Mouse Sensitivity</CardTitle>
                  <CardDescription className={isDarkMode ? "text-slate-300" : "text-gray-600"}>
                    Fine-tune your sensitivity for precise movement control
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      DPI: {Math.round(dpi[0] / 100) * 100}
                    </label>
                    <Slider
                      value={[Math.round(dpi[0] / 100) * 100]}
                      onValueChange={(value) => setDpi([Math.round(value[0] / 100) * 100])}
                      max={3200}
                      min={400}
                      step={100}
                      className="w-full"
                    />
                    <p className="text-xs text-cyan-400">Recommended: 800 DPI</p>
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      In-Game Sensitivity: {inGameSens[0].toFixed(2)}
                    </label>
                    <Slider
                      value={inGameSens}
                      onValueChange={setInGameSens}
                      max={2}
                      min={0.1}
                      step={0.01}
                      className="w-full"
                    />
                    <p className="text-xs text-cyan-400">Recommended: 0.35-0.45</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>eDPI</p>
                      <p className="text-yellow-400 font-mono">{Math.round(dpi[0] * inGameSens[0])}</p>
                    </div>
                    <div>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>360° Distance</p>
                      <p className="text-yellow-400 font-mono">
                        {((2.54 * 360) / (dpi[0] * inGameSens[0] * 0.0066)).toFixed(1)}cm
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          id="team"
          className={`w-full py-16 md:py-24 ${isDarkMode ? "" : "bg-gray-100/50"} transition-colors duration-500`}
        >
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="text-center space-y-4 mb-12 w-full">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet the Team</h2>
              <p className={`mx-auto max-w-[600px] text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                The elite players behind Orbit's revolutionary Neon techniques and strategies.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
              {[
                {
                  name: "decemb3r",
                  initials: "DE",
                  socialLink: "https://guns.lol/decemb3r",
                  avatarUrl: "https://i.imgur.com/qqnZILe.jpeg",
                },
                {
                  name: "EXST",
                  initials: "EX",
                  socialLink: "https://guns.lol/exst4",
                  avatarUrl: "https://i.imgur.com/Y4kDIhy.jpeg",
                },
                {
                  name: "Hanarashi",
                  initials: "HA",
                  socialLink: "https://konect.gg/hanarashi",
                  avatarUrl: "https://i.imgur.com/1PpM20V.jpeg",
                },
                {
                  name: "Harley",
                  initials: "!H",
                  socialLink: "https://guns.lol/harley.",
                  avatarUrl: "https://i.imgur.com/5CPvY2G.jpeg",
                },
                {
                  name: "Kcr",
                  initials: "KC",
                  socialLink: "https://www.youtube.com/@val_kcr/?sub_confirmation=1",
                  avatarUrl: "https://i.imgur.com/1NIcrOC.jpeg",
                },
                {
                  name: "kuniqz",
                  initials: "KU",
                  socialLink: "https://guns.lol/kuniqz",
                  avatarUrl: "https://i.imgur.com/slXL4kK.jpeg",
                },
                {
                  name: "meowi",
                  initials: "ME",
                  socialLink: "https://www.youtube.com/@meowi_z/?sub_confirmation=1",
                  avatarUrl: "https://i.imgur.com/xd0Wrcx.jpeg",
                },
                {
                  name: "moppi",
                  initials: "MO",
                  socialLink: "https://www.youtube.com/@moppi0810/?sub_confirmation=1",
                  avatarUrl: "https://i.imgur.com/0VZDXLX.jpeg",
                },
                {
                  name: "slxpps",
                  initials: "SL",
                  socialLink: "https://guns.lol/slxpps",
                  avatarUrl: "https://i.imgur.com/wnJwdxb.jpeg",
                },
                {
                  name: "sunakia",
                  initials: "SU",
                  socialLink: "https://guns.lol/sunakia",
                  avatarUrl: "https://i.imgur.com/YKZF9cl.jpeg",
                },
                {
                  name: "vx1d",
                  initials: "VX",
                  socialLink: "https://guns.lol/vx1dfps",
                  avatarUrl: "https://i.imgur.com/aNQRf1B.jpeg",
                },
              ].map((member, index) => (
                <Card
                  key={index}
                  className={`${cardClasses} hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 w-full`}
                >
                  <CardHeader className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4 ring-2 ring-cyan-400/50">
                      <AvatarImage src={member.avatarUrl || "/placeholder.svg?height=80&width=80"} />
                      <AvatarFallback className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 text-xl font-bold">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>{member.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 bg-transparent hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300"
                    >
                      <a href={member.socialLink} target="_blank" rel="noopener noreferrer">
                        Socials
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Guides Section */}
        <section
          id="guides"
          className={`w-full py-16 md:py-24 ${isDarkMode ? "bg-slate-900/30" : "bg-white/50"} transition-colors duration-500`}
        >
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="text-center space-y-4 mb-12 w-full">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Master the Techniques</h2>
              <p className={`mx-auto max-w-[600px] text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                From beginner basics to pro-level movement, we've got guides for every skill level.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
              {[
                {
                  icon: BookOpen,
                  title: "Beginner Movement",
                  desc: "Learn the fundamentals of Neon's abilities and basic movement techniques.",
                  button: "Start Learning",
                  tab: "beginner",
                },
                {
                  icon: Zap,
                  title: "Advanced Bhopping",
                  desc: "Master complex bhop chains and momentum preservation techniques.",
                  button: "Advanced Guide",
                  tab: "advanced",
                },
                {
                  icon: Target,
                  title: "Pro Strategies",
                  desc: "High-level tactics used by professional Neon players in competitive matches.",
                  button: "Pro Tips",
                  tab: "pro",
                },
              ].map((guide, index) => (
                <Card
                  key={index}
                  className={`${cardClasses} hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 w-full`}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/20 to-yellow-400/20 flex items-center justify-center mb-2">
                      <guide.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>{guide.title}</CardTitle>
                    <CardDescription className={isDarkMode ? "text-slate-300" : "text-gray-600"}>
                      {guide.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 bg-transparent hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300"
                    >
                      <Link href={`/techniques?tab=${guide.tab}`}>
                        {guide.button}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="text-center space-y-4 mb-12 w-full">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join the Community</h2>
              <p className={`mx-auto max-w-[600px] text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                Connect with fellow Neon enthusiasts, share clips, and learn from the best.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl mx-auto">
              {[
                {
                  icon: Discord,
                  title: "Discord Server",
                  desc: "Join our active Discord community sharing tips, clips, and organizing scrims.",
                  button: "Join Discord",
                  link: "https://discord.gg/jPvQddavDM",
                },
                {
                  icon: Youtube,
                  title: "YouTube Channel",
                  desc: "Watch detailed tutorials, movement breakdowns, and highlight reels from our top players.",
                  button: "Subscribe",
                  link: "https://www.youtube.com/@ORBIT_Neon/?sub_confirmation=1",
                },
              ].map((platform, index) => (
                <div key={index} className="text-center space-y-4 w-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
                    <platform.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {platform.title}
                  </h3>
                  <p className={isDarkMode ? "text-slate-300" : "text-gray-600"}>{platform.desc}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 bg-transparent hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300"
                  >
                    <a href={platform.link} target="_blank" rel="noopener noreferrer">
                      {platform.button}
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Section */}
        <section
          id="join"
          className={`w-full py-16 md:py-24 ${isDarkMode ? "bg-slate-900/30" : "bg-gray-100/50"} transition-colors duration-500`}
        >
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="max-w-2xl mx-auto text-center space-y-8 w-full">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-yellow-300 bg-clip-text text-transparent">
                    Orbit
                  </span>
                </h2>
                <p className={`text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                  Master the fastest agent in Valorant.
                </p>
              </div>
              <div className="space-y-4 w-full">
                <form onSubmit={handleDiscordSubmit} className="space-y-4 max-w-md mx-auto w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <Input
                      type="text"
                      placeholder="What should we call you?"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className={`border-slate-600 placeholder:text-slate-400 focus:border-cyan-400 w-full ${isDarkMode ? "bg-slate-800 text-white" : "bg-white text-gray-900"}`}
                      disabled={isSubmitting}
                    />
                    <Input
                      type="text"
                      placeholder="Discord username"
                      value={formData.discordUsername}
                      onChange={(e) => setFormData((prev) => ({ ...prev, discordUsername: e.target.value }))}
                      className={`border-slate-600 placeholder:text-slate-400 focus:border-cyan-400 w-full ${isDarkMode ? "bg-slate-800 text-white" : "bg-white text-gray-900"}`}
                      disabled={isSubmitting}
                    />
                    <Input
                      type="url"
                      placeholder="YouTube channel URL (required)"
                      value={formData.youtubeChannel}
                      onChange={(e) => setFormData((prev) => ({ ...prev, youtubeChannel: e.target.value }))}
                      className={`border-slate-600 placeholder:text-slate-400 focus:border-cyan-400 w-full ${isDarkMode ? "bg-slate-800 text-white" : "bg-white text-gray-900"}`}
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold border-0 hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.6),0_0_40px_rgba(255,255,0,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Get Started"}
                  </Button>
                </form>
                {submitMessage && (
                  <p
                    className={`text-sm text-center ${submitMessage.includes("✅") ? "text-green-400" : "text-red-400"}`}
                  >
                    {submitMessage}
                  </p>
                )}
                <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                  Pure Neon mastery awaits. YouTube channel required for content creators.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`w-full border-t ${isDarkMode ? "border-slate-800 bg-slate-900/50" : "border-gray-200 bg-white/80"} transition-colors duration-500`}
      >
        <div className="container mx-auto px-4 md:px-6 py-8 w-full max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4 w-full">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src="/orbit-logo.png"
                  alt="Orbit Logo"
                  className="h-6 w-6 filter drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]"
                />
                <span className="font-bold bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent">
                  Orbit
                </span>
              </div>
              <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                The ultimate destination for Neon movement mastery in Valorant.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Guides</h4>
              <div className="space-y-2 text-sm">
                <Link
                  href="#"
                  className={`block hover:text-cyan-400 transition-colors ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                >
                  Beginner Movement
                </Link>
                <Link
                  href="#"
                  className={`block hover:text-cyan-400 transition-colors ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                >
                  Advanced Bhopping
                </Link>
                <Link
                  href="#"
                  className={`block hover:text-cyan-400 transition-colors ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                >
                  Pro Strategies
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Community</h4>
              <div className="space-y-2 text-sm">
                <Link
                  href="#"
                  className={`block hover:text-cyan-400 transition-colors ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                >
                  Discord Server
                </Link>
                <Link
                  href="#"
                  className={`block hover:text-cyan-400 transition-colors ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                >
                  YouTube Channel
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Support</h4>
              <div className="space-y-2 text-sm">
                <Link
                  href="#"
                  className={`block hover:text-cyan-400 transition-colors ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                >
                  Contact Us
                </Link>
                <Link
                  href="#"
                  className={`block hover:text-cyan-400 transition-colors ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                >
                  FAQ
                </Link>
                <Link
                  href="#"
                  className={`block hover:text-cyan-400 transition-colors ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          <div
            className={`border-t mt-8 pt-8 text-center w-full ${isDarkMode ? "border-slate-800" : "border-gray-200"}`}
          >
            <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              © {new Date().getFullYear()} Orbit. All rights reserved. Not affiliated with Riot Games.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
