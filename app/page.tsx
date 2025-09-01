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
  const [dpi, setDpi] = useState([800])
  const [inGameSens, setInGameSens] = useState([0.4])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    discordUsername: "",
    youtubeChannel: "",
  })

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleDiscordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.discordUsername.trim() || !formData.youtubeChannel.trim()) {
      setSubmitMessage("Please fill in all fields")
      return
    }

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(channel\/|c\/|user\/|@)|youtu\.be\/)/
    if (!youtubeRegex.test(formData.youtubeChannel)) {
      setSubmitMessage("Please enter a valid YouTube channel URL")
      return
    }

    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL

      if (!webhookUrl) {
        setSubmitMessage("Configuration error. Please try again later.")
        return
      }

      const payload = {
        embeds: [
          {
            title: "New Orbit Member",
            description: `**${formData.name}** wants to join the Orbit community!`,
            color: 0x3b82f6,
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
        setSubmitMessage("Successfully sent! We'll reach out soon.")
        setFormData({ name: "", discordUsername: "", youtubeChannel: "" })
      } else {
        setSubmitMessage("Failed to send. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("Error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const themeClasses = isDarkMode 
    ? "bg-black text-white" 
    : "bg-white text-gray-900"

  const cardClasses = isDarkMode
    ? "bg-gray-900/50 border-gray-800/50 hover:border-gray-700/80"
    : "bg-white/80 border-gray-200/50 hover:border-gray-300/80"

  const headerClasses = isDarkMode 
    ? "border-gray-800/50 bg-black/80" 
    : "border-gray-200/50 bg-white/90"

  return (
    <div className={`flex flex-col min-h-screen w-full ${themeClasses} relative transition-all duration-500`}>
      {/* Minimal Background Elements */}
      <div className="fixed inset-0 pointer-events-none w-full h-full">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-yellow-500/5" />
        
        {/* Minimal geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute bottom-1/3 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
      </div>

      {/* Minimal Header */}
      <header className={`w-full px-6 h-16 flex items-center border-b ${headerClasses} backdrop-blur-sm sticky top-0 z-50 transition-all duration-300`}>
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <span className="text-xl font-light tracking-wide">
            Orbit
          </span>
        </Link>
        
        <nav className="ml-auto flex gap-8 items-center">
          {[
            { href: "#about", label: "About" },
            { href: "#team", label: "Team" },
            { href: "/techniques", label: "Guides" },
            { href: "#settings", label: "Settings" },
            { href: "#community", label: "Community" },
            { href: "#join", label: "Join" }
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-light hover:text-blue-500 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
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
        <section className="relative w-full py-32 md:py-40">
          <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
            <div className="flex flex-col items-center space-y-12 text-center w-full">
              <div className="space-y-8 w-full">
                <Badge
                  variant="outline"
                  className={`border-gray-300/50 ${isDarkMode ? "text-gray-400 bg-gray-900/30" : "text-gray-600 bg-gray-100/50"} backdrop-blur-sm px-4 py-2 text-sm font-light`}
                >
                  Elite Movement Specialists
                </Badge>
                
                <h1 className="text-6xl md:text-8xl font-extralight tracking-tight leading-none">
                  <span className={isDarkMode ? "text-white" : "text-gray-900"}>Master</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent font-light">
                    Neon
                  </span>
                </h1>
                
                <p className={`mx-auto max-w-2xl text-lg font-light leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  The ultimate Valorant community dedicated to perfecting Neon movement and advanced techniques.
                  <br />
                  <span className="text-blue-500">Elevate your game to professional levels.</span>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-light border-0 hover:scale-105 transition-all duration-300 px-8 py-3"
                >
                  <Link href="/techniques">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Tutorials
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className={`border-gray-300/50 hover:bg-gray-100/10 hover:scale-105 transition-all duration-300 px-8 py-3 font-light ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
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

        {/* Minimal About Section */}
        <section id="about" className={`w-full py-24 ${isDarkMode ? "bg-gray-950/50" : "bg-gray-50/50"} transition-colors duration-500`}>
          <div className="container mx-auto px-6 w-full max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-2 items-center w-full">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-extralight tracking-tight">
                  Why <span className="text-blue-500">Neon</span>?
                </h2>
                <p className={`text-lg font-light leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Neon represents pure movement mastery. Our community has perfected the art of lightning-fast gameplay 
                  through thousands of hours of dedicated practice and innovation.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Lightning Movement",
                      desc: "Master slides and momentum preservation",
                      accent: "blue"
                    },
                    {
                      title: "Advanced Techniques", 
                      desc: "Frame-perfect execution for maximum speed",
                      accent: "yellow"
                    },
                    {
                      title: "Competitive Edge",
                      desc: "Outmaneuver opponents with precision",
                      accent: "blue"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className={`w-1 h-12 bg-gradient-to-b ${item.accent === 'blue' ? 'from-blue-500/50 to-blue-500/20' : 'from-yellow-500/50 to-yellow-500/20'} mt-1`} />
                      <div className="space-y-1">
                        <h3 className={`font-light text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {item.title}
                        </h3>
                        <p className={`font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative w-full">
                <div className={`aspect-video rounded-xl border flex items-center justify-center relative overflow-hidden w-full ${isDarkMode ? "bg-gray-900/30 border-gray-800/50" : "bg-gray-100/50 border-gray-200/50"}`}>
                  <div className="text-center space-y-4">
                    <Zap className="w-16 h-16 text-blue-500 mx-auto" />
                    <div className="space-y-2">
                      <p className={`font-light ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Movement Showcase</p>
                      <p className={`text-sm font-light ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                        Interactive Demo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Settings Section */}
        <section id="settings" className="w-full py-24">
          <div className="container mx-auto px-6 w-full max-w-4xl">
            <div className="text-center space-y-6 mb-16 w-full">
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight">
                Settings <span className="text-blue-500">Optimizer</span>
              </h2>
              <p className={`mx-auto max-w-2xl text-lg font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Optimize your Valorant settings for maximum performance.
              </p>
            </div>

            <Card className={`${cardClasses} hover:border-blue-500/30 transition-all duration-300 w-full border`}>
              <CardHeader className="text-center pb-8">
                <CardTitle className={`text-2xl font-light ${isDarkMode ? "text-white" : "text-gray-900"} flex items-center justify-center gap-3`}>
                  <Target className="w-5 h-5 text-blue-500" />
                  Mouse Sensitivity
                </CardTitle>
                <CardDescription className={`text-base font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Fine-tune your sensitivity for precise control
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className={`text-sm font-light uppercase tracking-wider ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      DPI
                    </label>
                    <span className="text-2xl font-light text-blue-500">{Math.round(dpi[0] / 100) * 100}</span>
                  </div>
                  <Slider
                    value={[Math.round(dpi[0] / 100) * 100]}
                    onValueChange={(value) => setDpi([Math.round(value[0] / 100) * 100])}
                    max={3200}
                    min={400}
                    step={100}
                    className="w-full"
                  />
                  <p className="text-xs font-light text-blue-500/70 text-center">Recommended: 800</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className={`text-sm font-light uppercase tracking-wider ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      In-Game Sensitivity
                    </label>
                    <span className="text-2xl font-light text-yellow-500">{inGameSens[0].toFixed(2)}</span>
                  </div>
                  <Slider
                    value={inGameSens}
                    onValueChange={setInGameSens}
                    max={2}
                    min={0.1}
                    step={0.01}
                    className="w-full"
                  />
                  <p className="text-xs font-light text-yellow-500/70 text-center">Recommended: 0.35-0.45</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className={`p-6 rounded-lg border text-center ${isDarkMode ? "bg-gray-900/30 border-gray-800/50" : "bg-gray-50/50 border-gray-200/50"}`}>
                    <p className={`font-light text-sm uppercase tracking-wider mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>eDPI</p>
                    <p className="text-blue-500 font-light text-2xl">{Math.round(dpi[0] * inGameSens[0])}</p>
                  </div>
                  <div className={`p-6 rounded-lg border text-center ${isDarkMode ? "bg-gray-900/30 border-gray-800/50" : "bg-gray-50/50 border-gray-200/50"}`}>
                    <p className={`font-light text-sm uppercase tracking-wider mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>360° Distance</p>
                    <p className="text-yellow-500 font-light text-2xl">
                      {((2.54 * 360) / (dpi[0] * inGameSens[0] * 0.0066)).toFixed(1)}cm
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Minimal Team Section */}
        <section id="team" className={`w-full py-24 ${isDarkMode ? "bg-gray-950/50" : "bg-gray-50/50"} transition-colors duration-500`}>
          <div className="container mx-auto px-6 w-full max-w-6xl">
            <div className="text-center space-y-6 mb-16 w-full">
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight">
                The <span className="text-blue-500">Team</span>
              </h2>
              <p className={`mx-auto max-w-2xl text-lg font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Elite players behind Orbit's revolutionary techniques.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full">
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
                {
                  name: "pahn",
                  initials: "PA",
                  socialLink: "https://www.youtube.com/@qahns/?sub_confirmation=1",
                  avatarUrl: "https://i.imgur.com/5SvLGn9.jpeg",
                },
              ].map((member, index) => (
                <Card
                  key={index}
                  className={`${cardClasses} hover:scale-105 hover:border-blue-500/30 transition-all duration-300 w-full group border`}
                >
                  <CardHeader className="text-center p-6">
                    <Avatar className="w-16 h-16 mx-auto mb-4 ring-1 ring-gray-200/20">
                      <AvatarImage src={member.avatarUrl || "/placeholder.svg?height=64&width=64"} />
                      <AvatarFallback className={`${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"} font-light`}>
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className={`text-base font-light ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {member.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center p-6 pt-0">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-blue-500 hover:bg-blue-500/10 font-light px-4"
                    >
                      <a href={member.socialLink} target="_blank" rel="noopener noreferrer">
                        View Profile
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Minimal Guides Section */}
        <section id="guides" className="w-full py-24">
          <div className="container mx-auto px-6 w-full max-w-6xl">
            <div className="text-center space-y-6 mb-16 w-full">
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight">
                Master the <span className="text-blue-500">Techniques</span>
              </h2>
              <p className={`mx-auto max-w-2xl text-lg font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                From beginner basics to professional movement.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3 w-full">
              {[
                {
                  icon: BookOpen,
                  title: "Beginner",
                  desc: "Learn fundamental movement techniques",
                  tab: "beginner",
                  accent: "blue"
                },
                {
                  icon: Zap,
                  title: "Advanced",
                  desc: "Master complex movement chains",
                  tab: "advanced", 
                  accent: "yellow"
                },
                {
                  icon: Target,
                  title: "Professional",
                  desc: "High-level competitive strategies",
                  tab: "pro",
                  accent: "blue"
                },
              ].map((guide, index) => (
                <Card
                  key={index}
                  className={`${cardClasses} hover:scale-105 hover:border-${guide.accent}-500/30 transition-all duration-300 w-full group border text-center`}
                >
                  <CardHeader className="p-8">
                    <div className={`w-12 h-12 rounded-lg bg-${guide.accent}-500/10 flex items-center justify-center mb-4 mx-auto`}>
                      <guide.icon className={`w-6 h-6 text-${guide.accent}-500`} />
                    </div>
                    <CardTitle className={`text-xl font-light ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {guide.title}
                    </CardTitle>
                    <CardDescription className={`text-base font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {guide.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <Button
                      asChild
                      variant="ghost"
                      className={`text-${guide.accent}-500 hover:bg-${guide.accent}-500/10 font-light w-full`}
                    >
                      <Link href={`/techniques?tab=${guide.tab}`}>
                        Start Learning
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Minimal Community Section */}
        <section id="community" className={`w-full py-24 ${isDarkMode ? "bg-gray-950/50" : "bg-gray-50/50"} transition-colors duration-500`}>
          <div className="container mx-auto px-6 w-full max-w-4xl">
            <div className="text-center space-y-6 mb-16 w-full">
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight">
                Join the <span className="text-blue-500">Community</span>
              </h2>
              <p className={`mx-auto max-w-2xl text-lg font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Connect with fellow Neon enthusiasts.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 w-full max-w-3xl mx-auto">
              {[
                {
                  icon: Discord,
                  title: "Discord",
                  desc: "Join our community for tips and discussions",
                  link: "https://discord.gg/jPvQddavDM",
                  accent: "blue"
                },
                {
                  icon: Youtube,
                  title: "YouTube",
                  desc: "Watch tutorials and highlight reels",
                  link: "https://www.youtube.com/@ORBIT_Neon/?sub_confirmation=1",
                  accent: "yellow"
                },
              ].map((platform, index) => (
                <div key={index} className="text-center space-y-6 w-full group">
                  <div className={`w-16 h-16 bg-${platform.accent}-500/10 rounded-lg flex items-center justify-center mx-auto group-hover:scale-105 transition-all duration-300`}>
                    <platform.icon className={`w-8 h-8 text-${platform.accent}-500`} />
                  </div>
                  <h3 className={`text-xl font-light ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {platform.title}
                  </h3>
                  <p className={`text-base font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"} max-w-sm mx-auto`}>
                    {platform.desc}
                  </p>
                  <Button
                    asChild
                    variant="ghost"
                    className={`text-${platform.accent}-500 hover:bg-${platform.accent}-500/10 font-light px-6`}
                  >
                    <a href={platform.link} target="_blank" rel="noopener noreferrer">
                      <platform.icon className="w-4 h-4 mr-2" />
                      Join
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Minimal Join Section */}
        <section id="join" className="w-full py-24">
          <div className="container mx-auto px-6 w-full max-w-2xl">
            <div className="text-center space-y-10 w-full">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-extralight tracking-tight">
                  Join <span className="text-blue-500">Orbit</span>
                </h2>
                <p className={`text-lg font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Master the fastest agent in Valorant.
                </p>
              </div>
              
              <form onSubmit={handleDiscordSubmit} className="space-y-6 w-full">
                <div className="space-y-4 w-full">
                  <Input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className={`border-gray-300/50 placeholder:text-gray-400 focus:border-blue-500 w-full h-12 font-light ${isDarkMode ? "bg-gray-900/30 text-white" : "bg-white/80 text-gray-900"} backdrop-blur-sm`}
                    disabled={isSubmitting}
                  />
                  <Input
                    type="text"
                    placeholder="Discord username"
                    value={formData.discordUsername}
                    onChange={(e) => setFormData((prev) => ({ ...prev, discordUsername: e.target.value }))}
                    className={`border-gray-300/50 placeholder:text-gray-400 focus:border-blue-500 w-full h-12 font-light ${isDarkMode ? "bg-gray-900/30 text-white" : "bg-white/80 text-gray-900"} backdrop-blur-sm`}
                    disabled={isSubmitting}
                  />
                  <Input
                    type="url"
                    placeholder="YouTube channel URL"
                    value={formData.youtubeChannel}
                    onChange={(e) => setFormData((prev) => ({ ...prev, youtubeChannel: e.target.value }))}
                    className={`border-gray-300/50 placeholder:text-gray-400 focus:border-blue-500 w-full h-12 font-light ${isDarkMode ? "bg-gray-900/30 text-white" : "bg-white/80 text-gray-900"} backdrop-blur-sm`}
                    disabled={isSubmitting}
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-light border-0 hover:scale-105 transition-all duration-300 disabled:opacity-50 h-12"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </form>
              
              {submitMessage && (
                <p className={`text-sm font-light ${submitMessage.includes("Successfully") ? "text-blue-500" : "text-red-400"}`}>
                  {submitMessage}
                </p>
              )}
              
              <p className={`text-sm font-light ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                Pure Neon mastery awaits.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className={`w-full border-t ${isDarkMode ? "border-gray-800/50 bg-black/50" : "border-gray-200/50 bg-white/90"} transition-colors duration-500 backdrop-blur-sm`}>
        <div className="container mx-auto px-6 py-12 w-full max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4 w-full">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-yellow-500 rounded">
                  <span className="text-white font-bold text-xs flex items-center justify-center w-full h-full">O</span>
                </div>
                <span className="font-light text-lg">Orbit</span>
              </div>
              <p className={`text-sm font-light ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                Ultimate Neon movement mastery.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className={`font-light ${isDarkMode ? "text-white" : "text-gray-900"}`}>Guides</h4>
              <div className="space-y-2 text-sm font-light">
                <Link href="/techniques?tab=beginner" className={`block hover:text-blue-500 transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Beginner
                </Link>
                <Link href="/techniques?tab=advanced" className={`block hover:text-blue-500 transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Advanced
                </Link>
                <Link href="/techniques?tab=pro" className={`block hover:text-blue-500 transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Professional
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className={`font-light ${isDarkMode ? "text-white" : "text-gray-900"}`}>Community</h4>
              <div className="space-y-2 text-sm font-light">
                <a href="https://discord.gg/jPvQddavDM" target="_blank" rel="noopener noreferrer" className={`block hover:text-blue-500 transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Discord
                </a>
                <a href="https://www.youtube.com/@ORBIT_Neon/?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className={`block hover:text-blue-500 transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  YouTube
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className={`font-light ${isDarkMode ? "text-white" : "text-gray-900"}`}>Support</h4>
              <div className="space-y-2 text-sm font-light">
                <Link href="#" className={`block hover:text-blue-500 transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Contact
                </Link>
                <Link href="#" className={`block hover:text-blue-500 transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  FAQ
                </Link>
              </div>
            </div>
          </div>
          
          <div className={`border-t mt-8 pt-8 text-center w-full ${isDarkMode ? "border-gray-800/50" : "border-gray-200/50"}`}>
            <p className={`text-sm font-light ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
              © {new Date().getFullYear()} Orbit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}