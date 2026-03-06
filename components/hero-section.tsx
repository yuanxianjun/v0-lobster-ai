"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onNavigate: (section: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          2026年3月最新更新：已覆盖15款AI智能体
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
          <span className="bg-gradient-to-r from-red-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
            LobsterAI 全维度对比平台
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto text-pretty">
          聚焦网易有道龙虾AI，横向对比20+国内外智能体产品，用数据驱动你的选型决策
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <StatCard number="15+" label="覆盖产品" description="持续更新中" />
          <StatCard number="8大" label="对比维度" description="本地/远程/办公/AI/部署/本土/易用/安全" />
          <StatCard number="实时" label="动态追踪" description="每月更新版本日志与市场动态" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => onNavigate("comparison")}
            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105"
          >
            开始对比
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate("timeline")}
            className="border-violet-500 text-violet-400 hover:bg-violet-500/10 px-8 py-6 text-lg rounded-xl transition-all duration-300"
          >
            查看最新动态
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-slate-500" />
        </div>
      </div>
    </section>
  )
}

function StatCard({ number, label, description }: { number: string; label: string; description: string }) {
  return (
    <div className="group p-6 rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-violet-500/10">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-lg font-semibold text-slate-200 mb-1">{label}</div>
      <div className="text-sm text-slate-500">{description}</div>
    </div>
  )
}
