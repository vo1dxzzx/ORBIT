"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Zap, Users, Play, BookOpen, Target, ArrowRight, DiscIcon as Discord, Youtube, Sun, Moon, Star, TrendingUp, Award, Sparkles } from "lucide-react"
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
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
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
    ? "bg-slate-800/60 border-slate-700/50 hover:border-cyan-400/60 backdrop-blur-sm"
    : "bg-white/90 border-gray-200/50 hover:border-cyan-400/60 backdrop-blur-sm"

  const headerClasses = isDarkMode ? "border-cyan-500/20 bg-slate-900/80" : "border-cyan-400/30 bg-white/90"

  return (
    <div
      className={`flex flex-col min-h-screen w-full ${themeClasses} relative overflow-hidden transition-all duration-700`}
    >
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none w-full h-full">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-400/15 to-orange-500/15 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: "6s", animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: "5s", animationDelay: "1s" }} />
        
        {/* Enhanced Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: "3s",
              boxShadow: "0 0 6px rgba(6, 182, 212, 0.6)"
            }}
          />
        ))}
        
        {/* Floating electric lines with glow */}
        <div
          className="absolute top-1/4 left-1/4 w-40 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent transform rotate-12 animate-pulse"
          style={{ 
            animationDelay: "1s",
            filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))"
          }}
        />
        <div
          className="absolute top-3/4 right-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent transform -rotate-45 animate-pulse"
          style={{ 
            animationDelay: "2s",
            filter: "drop-shadow(0 0 8px rgba(255, 255, 0, 0.6))"
          }}
        />
        <div
          className="absolute top-1/2 left-3/4 w-28 h-0.5 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent transform rotate-45 animate-pulse"
          style={{ 
            animationDelay: "3s",
            filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))"
          }}
        />
      </div>

      {/* Enhanced Header */}
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
            { href: "#about", label: "About" },
            { href: "#team", label: "Team" },
            { href: "/techniques", label: "Guides" },
            { href: "#settings", label: "Settings" },
            { href: "#community", label: "Community" },
            { href: "#join", label: "Join Us" }
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium hover:text-cyan-400 transition-all duration-300 relative group ${isDarkMode ? "text-white" : "text-gray-700"}`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
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
        <section className="relative w-full py-24 md:py-36 lg:py-44 overflow-hidden">
          <div
            className={`absolute inset-0 w-full h-full ${isDarkMode ? "bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/15" : "bg-gradient-to-br from-cyan-400/25 via-blue-400/15 to-purple-400/20"}`}
          />
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_70%)]" />

          <div className="container mx-auto px-4 md:px-6 relative z-10 w-full max-w-7xl">
            <div className="flex flex-col items-center space-y-10 text-center w-full">
              <div className="space-y-6 w-full">
                <Badge
                  variant="outline"
                  className="border-cyan-400/60 text-cyan-300 bg-gradient-to-r from-cyan-400/15 to-yellow-400/10 backdrop-blur-sm px-4 py-2 text-sm font-medium hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="w-3 h-3 mr-2" />
                  Elite Neon Movement Specialists
                  <Star className="w-3 h-3 ml-2" />
                </Badge>
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-yellow-300 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: "3s" }}>
                    Master Neon
                  </span>
                </h1>
                <p
                  className={`mx-auto max-w-[800px] text-xl md:text-2xl leading-relaxed ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}
                >
                  Join <span className="text-cyan-400 font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Orbit</span>, the ultimate Valorant community
                  dedicated to perfecting Neon movement, advanced bhopping techniques, and lightning-fast gameplay.
                  <br />
                  <span className="text-lg opacity-80 mt-2 block">Elevate your game to professional levels.</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold border-0 hover:scale-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.8),0_0_60px_rgba(255,255,0,0.3)] transition-all duration-500 px-8 py-3 text-lg"
                >
                  <Link href="/techniques">
                    <Play className="w-5 h-5 mr-3" />
                    Watch Tutorials
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/15 bg-transparent hover:scale-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all duration-500 backdrop-blur-sm px-8 py-3 text-lg"
                >
                  <a href="https://discord.gg/jPvQddavDM" target="_blank" rel="noopener noreferrer">
                    <Users className="w-5 h-5 mr-3" />
                    Join Community
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced About Section */}
        <section
          id="about"
          className={`w-full py-20 md:py-28 ${isDarkMode ? "bg-slate-900/40" : "bg-gray-100/60"} transition-colors duration-500 backdrop-blur-sm`}
        >
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center w-full">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Why Neon?
                  </h2>
                  <p className={`text-xl leading-relaxed ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                    Neon isn't just an agent – she's a movement revolution. Our community has spent thousands of hours
                    perfecting the art of Neon movement, from basic slides to advanced bhop chains that leave enemies
                    stunned.
                  </p>
                </div>
                <div className="grid gap-6">
                  {[
                    {
                      icon: "⚡",
                      title: "Lightning-Fast Movement",
                      desc: "Master slide cancels, wall running, and momentum preservation",
                      color: "cyan"
                    },
                    {
                      icon: "🎯",
                      title: "Advanced Bhopping",
                      desc: "Learn frame-perfect techniques for maximum speed retention",
                      color: "yellow"
                    },
                    {
                      icon: "🏆",
                      title: "Competitive Edge",
                      desc: "Outmaneuver opponents with unpredictable movement patterns",
                      color: "purple"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group hover:scale-105 transition-all duration-300">
                      <div className={`w-3 h-3 rounded-full bg-${item.color}-400 mt-3 flex-shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.6)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.8)]`} />
                      <div className="space-y-2">
                        <h3 className={`font-semibold text-${item.color}-400 text-lg flex items-center gap-2`}>
                          <span className="text-2xl">{item.icon}</span>
                          {item.title}
                        </h3>
                        <p className={`${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-full">
                {/* Enhanced 3D Movement Visualizer */}
                <div
                  className={`aspect-video rounded-2xl border-2 flex items-center justify-center relative overflow-hidden w-full ${isDarkMode ? "bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-cyan-500/40" : "bg-gradient-to-br from-cyan-400/40 to-blue-400/40 border-cyan-400/50"} backdrop-blur-sm hover:scale-105 transition-all duration-500`}
                >
                  <div className="text-center space-y-4 z-10">
                    <div className="relative">
                      <Zap className="w-20 h-20 text-cyan-400 mx-auto animate-pulse drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 animate-ping" />
                    </div>
                    <div className="space-y-2">
                      <p className={`font-semibold text-lg ${isDarkMode ? "text-slate-200" : "text-gray-800"}`}>3D Movement Showcase</p>
                      <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}>
                        Interactive Demo Coming Soon
                      </p>
                    </div>
                  </div>
                  {/* Enhanced 3D-like animated elements */}
                  <div className="absolute inset-0">
                    <div
                      className="absolute top-6 left-6 w-12 h-12 border-2 border-cyan-400/60 rounded transform rotate-45 animate-spin"
                      style={{ animationDuration: "8s" }}
                    />
                    <div
                      className="absolute bottom-6 right-6 w-8 h-8 border-2 border-yellow-400/60 rounded-full animate-bounce"
                      style={{ animationDelay: "1s" }}
                    />
                    <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-12 animate-pulse" />
                    <div className="absolute top-1/3 right-1/3 w-10 h-1 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent transform rotate-45 animate-pulse" style={{ animationDelay: "2s" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Settings Optimizer Section */}
        <section id="settings" className="w-full py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="text-center space-y-6 mb-16 w-full">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Settings Optimizer
              </h2>
              <p className={`mx-auto max-w-[700px] text-xl ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                Optimize your Valorant settings for maximum Neon movement performance with our advanced calculator.
              </p>
            </div>

            <div className="w-full max-w-3xl mx-auto">
              <Card
                className={`${cardClasses} hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-500 w-full border-2`}
              >
                <CardHeader className="text-center pb-8">
                  <CardTitle className={`text-2xl ${isDarkMode ? "text-white" : "text-gray-900"} flex items-center justify-center gap-3`}>
                    <Target className="w-6 h-6 text-cyan-400" />
                    Mouse Sensitivity
                  </CardTitle>
                  <CardDescription className={`text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                    Fine-tune your sensitivity for precise movement control
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <label className={`text-base font-medium ${isDarkMode ? "text-white" : "text-gray-900"} flex items-center gap-2`}>
                        <span>DPI</span>
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                      </label>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-cyan-400">{Math.round(dpi[0] / 100) * 100}</span>
                      </div>
                    </div>
                    <div className="px-2">
                      <Slider
                        value={[Math.round(dpi[0] / 100) * 100]}
                        onValueChange={(value) => setDpi([Math.round(value[0] / 100) * 100])}
                        max={3200}
                        min={400}
                        step={100}
                        className="w-full"
                      />
                    </div>
                    <p className="text-sm text-cyan-400 font-medium text-center">Recommended: 800 DPI</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <label className={`text-base font-medium ${isDarkMode ? "text-white" : "text-gray-900"} flex items-center gap-2`}>
                        <span>In-Game Sensitivity</span>
                        <Award className="w-4 h-4 text-yellow-400" />
                      </label>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-yellow-400">{inGameSens[0].toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="px-2">
                      <Slider
                        value={inGameSens}
                        onValueChange={setInGameSens}
                        max={2}
                        min={0.1}
                        step={0.01}
                        className="w-full"
                      />
                    </div>
                    <p className="text-sm text-cyan-400 font-medium text-center">Recommended: 0.35-0.45</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-center">
                      <p className={`font-medium text-lg ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>eDPI</p>
                      <p className="text-yellow-400 font-mono text-3xl font-bold">{Math.round(dpi[0] * inGameSens[0])}</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-center">
                      <p className={`font-medium text-lg ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>360° Distance</p>
                      <p className="text-yellow-400 font-mono text-3xl font-bold">
                        {((2.54 * 360) / (dpi[0] * inGameSens[0] * 0.0066)).toFixed(1)}cm
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Enhanced Team Section */}
        <section
          id="team"
          className={`w-full py-20 md:py-28 ${isDarkMode ? "bg-slate-900/40" : "bg-gray-100/60"} transition-colors duration-500 backdrop-blur-sm`}
        >
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="text-center space-y-6 mb-16 w-full">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Meet the Team
              </h2>
              <p className={`mx-auto max-w-[700px] text-xl ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                The elite players behind Orbit's revolutionary Neon techniques and strategies.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
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
                  className={`${cardClasses} hover:scale-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-500 w-full group border-2`}
                >
                  <CardHeader className="text-center pb-6">
                    <div className="relative mx-auto mb-6">
                      <Avatar className="w-24 h-24 ring-4 ring-cyan-400/50 group-hover:ring-cyan-400/80 transition-all duration-300">
                        <AvatarImage src={member.avatarUrl || "/placeholder.svg?height=96&width=96"} />
                        <AvatarFallback className="bg-gradient-to-br from-cyan-500/30 to-blue-500/30 text-cyan-400 text-2xl font-bold border-2 border-cyan-400/50">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>{member.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/15 bg-transparent hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300 px-6"
                    >
                      <a href={member.socialLink} target="_blank" rel="noopener noreferrer">
                        <Users className="w-4 h-4 mr-2" />
                        Socials
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Guides Section */}
        <section
          id="guides"
          className={`w-full py-20 md:py-28 ${isDarkMode ? "" : "bg-white/60"} transition-colors duration-500`}
        >
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="text-center space-y-6 mb-16 w-full">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Master the Techniques
              </h2>
              <p className={`mx-auto max-w-[700px] text-xl ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                From beginner basics to pro-level movement, we've got guides for every skill level.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
              {[
                {
                  icon: BookOpen,
                  title: "Beginner Movement",
                  desc: "Learn the fundamentals of Neon's abilities and basic movement techniques.",
                  button: "Start Learning",
                  tab: "beginner",
                  gradient: "from-green-400 to-cyan-400",
                  emoji: "🌱"
                },
                {
                  icon: Zap,
                  title: "Advanced Bhopping",
                  desc: "Master complex bhop chains and momentum preservation techniques.",
                  button: "Advanced Guide",
                  tab: "advanced",
                  gradient: "from-yellow-400 to-orange-400",
                  emoji: "⚡"
                },
                {
                  icon: Target,
                  title: "Pro Strategies",
                  desc: "High-level tactics used by professional Neon players in competitive matches.",
                  button: "Pro Tips",
                  tab: "pro",
                  gradient: "from-red-400 to-purple-400",
                  emoji: "🏆"
                },
              ].map((guide, index) => (
                <Card
                  key={index}
                  className={`${cardClasses} hover:scale-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-500 w-full group border-2`}
                >
                  <CardHeader className="pb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${guide.gradient} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300`}>
                      <span className="text-3xl">{guide.emoji}</span>
                    </div>
                    <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>{guide.title}</CardTitle>
                    <CardDescription className={`text-base ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                      {guide.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/15 bg-transparent hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300 w-full"
                    >
                      <Link href={`/techniques?tab=${guide.tab}`}>
                        {guide.button}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Community Section */}
        <section id="community" className={`w-full py-20 md:py-28 ${isDarkMode ? "bg-slate-900/40" : "bg-gray-100/60"} transition-colors duration-500 backdrop-blur-sm`}>
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="text-center space-y-6 mb-16 w-full">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Join the Community
              </h2>
              <p className={`mx-auto max-w-[700px] text-xl ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                Connect with fellow Neon enthusiasts, share clips, and learn from the best.
              </p>
            </div>
            <div className="grid gap-12 md:grid-cols-2 w-full max-w-5xl mx-auto">
              {[
                {
                  icon: Discord,
                  title: "Discord Server",
                  desc: "Join our active Discord community sharing tips, clips, and organizing scrims.",
                  button: "Join Discord",
                  link: "https://discord.gg/jPvQddavDM",
                  gradient: "from-indigo-400 to-purple-400",
                  emoji: "💬"
                },
                {
                  icon: Youtube,
                  title: "YouTube Channel",
                  desc: "Watch detailed tutorials, movement breakdowns, and highlight reels from our top players.",
                  button: "Subscribe",
                  link: "https://www.youtube.com/@ORBIT_Neon/?sub_confirmation=1",
                  gradient: "from-red-400 to-pink-400",
                  emoji: "📺"
                },
              ].map((platform, index) => (
                <div key={index} className="text-center space-y-6 w-full group">
                  <div className={`w-20 h-20 bg-gradient-to-br ${platform.gradient} bg-opacity-20 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 border-2 border-cyan-400/30`}>
                    <span className="text-4xl">{platform.emoji}</span>
                  </div>
                  <h3 className={`text-2xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {platform.title}
                  </h3>
                  <p className={`text-lg ${isDarkMode ? "text-slate-300" : "text-gray-600"} max-w-md mx-auto`}>{platform.desc}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/15 bg-transparent hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300 px-8 py-3 text-lg"
                  >
                    <a href={platform.link} target="_blank" rel="noopener noreferrer">
                      <platform.icon className="w-5 h-5 mr-3" />
                      {platform.button}
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Join Section */}
        <section
          id="join"
          className={`w-full py-20 md:py-28 ${isDarkMode ? "" : "bg-white/60"} transition-colors duration-500`}
        >
          <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl">
            <div className="max-w-3xl mx-auto text-center space-y-10 w-full">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Join{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-yellow-300 bg-clip-text text-transparent">
                    Orbit
                  </span>
                </h2>
                <p className={`text-xl ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                  Master the fastest agent in Valorant and join the elite.
                </p>
              </div>
              <div className="space-y-6 w-full">
                <form onSubmit={handleDiscordSubmit} className="space-y-6 max-w-lg mx-auto w-full">
                  <div className="flex flex-col gap-4 w-full">
                    <Input
                      type="text"
                      placeholder="What should we call you?"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className={`border-slate-600 placeholder:text-slate-400 focus:border-cyan-400 w-full h-12 text-lg ${isDarkMode ? "bg-slate-800/50 text-white" : "bg-white/80 text-gray-900"} backdrop-blur-sm`}
                      disabled={isSubmitting}
                    />
                    <Input
                      type="text"
                      placeholder="Discord username"
                      value={formData.discordUsername}
                      onChange={(e) => setFormData((prev) => ({ ...prev, discordUsername: e.target.value }))}
                      className={`border-slate-600 placeholder:text-slate-400 focus:border-cyan-400 w-full h-12 text-lg ${isDarkMode ? "bg-slate-800/50 text-white" : "bg-white/80 text-gray-900"} backdrop-blur-sm`}
                      disabled={isSubmitting}
                    />
                    <Input
                      type="url"
                      placeholder="YouTube channel URL (required)"
                      value={formData.youtubeChannel}
                      onChange={(e) => setFormData((prev) => ({ ...prev, youtubeChannel: e.target.value }))}
                      className={`border-slate-600 placeholder:text-slate-400 focus:border-cyan-400 w-full h-12 text-lg ${isDarkMode ? "bg-slate-800/50 text-white" : "bg-white/80 text-gray-900"} backdrop-blur-sm`}
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold border-0 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.8),0_0_60px_rgba(255,255,0,0.3)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed h-14 text-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5" />
                        Get Started
                      </div>
                    )}
                  </Button>
                </form>
                {submitMessage && (
                  <p
                    className={`text-base text-center font-medium ${submitMessage.includes("✅") ? "text-green-400" : "text-red-400"}`}
                  >
                    {submitMessage}
                  </p>
                )}
                <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                  Pure Neon mastery awaits. YouTube channel required for content creators.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer
        className={`w-full border-t ${isDarkMode ? "border-slate-800 bg-slate-900/60" : "border-gray-200 bg-white/90"} transition-colors duration-500 backdrop-blur-sm`}
      >
        <div className="container mx-auto px-4 md:px-6 py-12 w-full max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4 w-full">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src="/orbit-logo.png"
                  alt="Orbit Logo"
                  className="h-8 w-8 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                />
                <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent">
                  Orbit
                </span>
              </div>
              <p className={`text-base ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                The ultimate destination for Neon movement mastery in Valorant.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>Guides</h4>
              <div className="space-y-3 text-base">
                <Link
                  href="/techniques?tab=beginner"
                  className={`block hover:text-cyan-400 transition-colors ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                >
                  Beginner Movement
                </Link>
                <Link
                  href="/techniques?tab=advanced"
                  className={`block hover:text-cyan-400 transition-colors ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                >
                  Advanced Bhopping
                </Link>
                <Link
                  href="/techniques?tab=pro"
                  className={`block hover:text-cyan-400 transition-colors ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                >
                  Pro Strategies
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>Community</h4>
              <div className="space-y-3 text-base">
                <a
                  href="https://discord.gg/jPvQddavDM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block hover:text-cyan-400 transition-colors ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                >
                  Discord Server
                </a>
                <a
                  href="https://www.youtube.com/@ORBIT_Neon/?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block hover:text-cyan-400 transition-colors ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                >
                  YouTube Channel
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>Support</h4>
              <div className="space-y-3 text-base">
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
            className={`border-t mt-12 pt-8 text-center w-full ${isDarkMode ? "border-slate-800" : "border-gray-200"}`}
          >
            <p className={`text-base ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              © {new Date().getFullYear()} Orbit. All rights reserved. Not affiliated with Riot Games.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}