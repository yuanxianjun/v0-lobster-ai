"use client"

import { useState, useEffect } from "react"
import { Search, Sun, Moon, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NavbarProps {
  activeSection: string
  onNavigate: (section: string) => void
}

const navItems = [
  { id: "comparison", label: "产品对比" },
  { id: "timeline", label: "动态追踪" },
  { id: "rankings", label: "能力排名" },
  { id: "guides", label: "使用指南" },
  { id: "wizard", label: "选型工具" },
]

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-slate-900/30 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦞</span>
          <span className="text-xl font-bold text-red-500">LobsterAI</span>
          <span className="text-sm text-slate-400 hidden sm:inline">选型平台</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative ${
                activeSection === item.id
                  ? "text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-violet-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className={`relative transition-all duration-300 ${searchFocused ? "w-64" : "w-48"} hidden md:block`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="搜索产品或功能..."
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10">
            <Sun className="w-5 h-5" />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-400 hover:text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? "bg-violet-500/20 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <Input
                placeholder="搜索产品或功能..."
                className="bg-slate-800/50 border-slate-700 text-slate-200"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
