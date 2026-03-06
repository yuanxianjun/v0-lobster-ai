"use client"

import { useState } from "react"
import { timelineData, type TimelineItem } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Share2, Flame, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

type FilterType = "all" | "LobsterAI专属" | "功能更新" | "市场动态" | "生态合作"

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "LobsterAI专属", label: "LobsterAI专属" },
  { value: "功能更新", label: "功能更新" },
  { value: "市场动态", label: "市场动态" },
  { value: "生态合作", label: "生态合作" },
]

export function TimelineSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [likes, setLikes] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {}
    timelineData.forEach((item) => {
      initial[item.id] = item.likes
    })
    return initial
  })

  const filteredData = activeFilter === "all" 
    ? timelineData 
    : timelineData.filter((item) => item.type === activeFilter)

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedItems)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setExpandedItems(newSet)
  }

  const handleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
  }

  return (
    <section id="timeline" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            最新发展动态
          </span>
        </h2>
        <p className="text-slate-400 text-center mb-8">
          追踪LobsterAI及竞品版本更新、市场动作
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.value
                    ? "bg-violet-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <span className="text-sm text-slate-500">
            最后更新：2026-03-06 14:32
          </span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-blue-500 to-violet-500" />

          {/* Timeline Items */}
          <div className="space-y-8">
            {filteredData.map((item, index) => (
              <TimelineCard
                key={item.id}
                item={item}
                index={index}
                isExpanded={expandedItems.has(item.id)}
                onToggleExpand={() => toggleExpand(item.id)}
                likes={likes[item.id] || 0}
                onLike={() => handleLike(item.id)}
              />
            ))}
          </div>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            暂无相关动态
          </div>
        )}
      </div>
    </section>
  )
}

function TimelineCard({
  item,
  index,
  isExpanded,
  onToggleExpand,
  likes,
  onLike,
}: {
  item: TimelineItem
  index: number
  isExpanded: boolean
  onToggleExpand: () => void
  likes: number
  onLike: () => void
}) {
  const isEven = index % 2 === 0

  return (
    <div className={`relative flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Timeline Dot */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-violet-500 border-4 border-slate-900 z-10" />

      {/* Card */}
      <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? "md:pr-8" : "md:pl-8"}`}>
        <div className={`p-5 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:border-violet-500/50 ${
          item.product === "LobsterAI" 
            ? "bg-red-500/10 border-red-500/30" 
            : "bg-slate-800/50 border-slate-700/50"
        }`}>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="text-xs text-slate-500">{item.date}</span>
            <div className="flex items-center gap-2">
              {item.importance === "high" && (
                <Flame className="w-4 h-4 text-amber-500" />
              )}
              <Badge
                style={{ backgroundColor: `${item.productColor}20`, color: item.productColor }}
                className="text-xs"
              >
                {item.product}
              </Badge>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-slate-200 mb-2 hover:text-violet-400 cursor-pointer transition-colors">
            {item.title}
          </h3>

          {/* Summary */}
          <p className="text-sm text-slate-400 mb-3">{item.summary}</p>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mb-4 p-4 rounded-xl bg-slate-900/50 text-sm text-slate-300 leading-relaxed">
              {item.content}
              <Button variant="link" size="sm" className="mt-2 p-0 h-auto text-violet-400">
                查看来源 <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          )}

          {/* Expand Toggle */}
          <button
            onClick={onToggleExpand}
            className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1 mb-3"
          >
            {isExpanded ? (
              <>收起 <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>展开详情 <ChevronDown className="w-4 h-4" /></>
            )}
          </button>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-3 border-t border-slate-700/50">
            <button
              onClick={onLike}
              className="flex items-center gap-1 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{likes}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-slate-400 hover:text-red-400 transition-colors">
              <ThumbsDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 text-sm text-slate-400 hover:text-blue-400 transition-colors ml-auto">
              <Share2 className="w-4 h-4" />
              分享
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
