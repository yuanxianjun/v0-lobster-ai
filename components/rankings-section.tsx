"use client"

import { useState, useMemo } from "react"
import { products, scoreLabels, type Product } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  HardDrive, 
  Wifi, 
  FileText, 
  Brain, 
  Shield, 
  Star,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react"

type DimensionKey = keyof Product['scores']

const dimensions: { key: DimensionKey; label: string; icon: React.ReactNode }[] = [
  { key: "localFile", label: "本地文件操作能力", icon: <HardDrive className="w-4 h-4" /> },
  { key: "remoteControl", label: "远程控制兼容性", icon: <Wifi className="w-4 h-4" /> },
  { key: "officeSoftware", label: "办公软件适配度", icon: <FileText className="w-4 h-4" /> },
  { key: "aiReasoning", label: "AI推理能力", icon: <Brain className="w-4 h-4" /> },
  { key: "security", label: "安全隐私等级", icon: <Shield className="w-4 h-4" /> },
]

export function RankingsSection() {
  const [selectedDimension, setSelectedDimension] = useState<DimensionKey>("localFile")
  const [viewTab, setViewTab] = useState("chart")

  const rankedProducts = useMemo(() => {
    return [...products]
      .map((p) => ({
        ...p,
        score: p.scores[selectedDimension],
        totalScore: Object.values(p.scores).reduce((a, b) => a + b, 0) / 8,
      }))
      .sort((a, b) => b.score - a.score)
  }, [selectedDimension])

  const topProducts = rankedProducts.slice(0, 5)

  const isLobster = (id: string) => id.startsWith("lobster")

  return (
    <section id="rankings" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            可视化能力排名
          </span>
        </h2>
        <p className="text-slate-400 text-center mb-12">
          多维度可视化对比，直观了解各产品优劣势
        </p>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Dimension Selector */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">选择排名维度</h3>
            {dimensions.map((dim) => (
              <button
                key={dim.key}
                onClick={() => setSelectedDimension(dim.key)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                  selectedDimension === dim.key
                    ? "bg-violet-500/20 border-l-4 border-violet-500 text-white"
                    : "bg-slate-800/50 border-l-4 border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                {dim.icon}
                <span className="text-sm font-medium">{dim.label}</span>
              </button>
            ))}
            
            <div className="mt-6 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <h4 className="text-sm font-semibold text-slate-300 mb-2">评分依据</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {selectedDimension === "localFile" && "本地文件读写能力、文件格式支持、批量处理效率、跨平台兼容性"}
                {selectedDimension === "remoteControl" && "远程桌面连接、移动端控制、API调用能力、第三方集成"}
                {selectedDimension === "officeSoftware" && "Office兼容性、WPS适配、飞书/钉钉集成、文档格式转换"}
                {selectedDimension === "aiReasoning" && "模型推理能力、上下文理解、复杂任务处理、多轮对话"}
                {selectedDimension === "security" && "数据加密、访问控制、合规认证、隐私保护"}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div>
            <Tabs value={viewTab} onValueChange={setViewTab}>
              <TabsList className="bg-slate-800/50 mb-6">
                <TabsTrigger value="chart">图表视图</TabsTrigger>
                <TabsTrigger value="ranking">排行榜视图</TabsTrigger>
              </TabsList>

              <TabsContent value="chart" className="mt-0">
                {/* Radar-like visualization */}
                <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                  <h4 className="text-lg font-semibold text-slate-200 mb-6">
                    {scoreLabels[selectedDimension]} - Top 5 产品对比
                  </h4>
                  
                  {/* Bar Chart */}
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={product.id} className="group">
                        <div className="flex items-center gap-4 mb-2">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                            index === 0 ? "bg-amber-500/20 text-amber-400" :
                            index === 1 ? "bg-slate-400/20 text-slate-300" :
                            index === 2 ? "bg-orange-600/20 text-orange-400" :
                            "bg-slate-700 text-slate-400"
                          }`}>
                            {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                          </span>
                          <span className={`font-medium ${isLobster(product.id) ? "text-red-400" : "text-slate-200"}`}>
                            {product.name.split("（")[0]}
                          </span>
                          <span className="ml-auto text-sm font-mono text-slate-400">
                            {product.score}/5
                          </span>
                        </div>
                        <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isLobster(product.id) 
                                ? "bg-gradient-to-r from-red-500 to-red-400" 
                                : "bg-gradient-to-r from-violet-500 to-blue-500"
                            }`}
                            style={{ width: `${(product.score / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="mt-8 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-gradient-to-r from-red-500 to-red-400" />
                      <span className="text-slate-400">LobsterAI 系列</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-gradient-to-r from-violet-500 to-blue-500" />
                      <span className="text-slate-400">其他产品</span>
                    </div>
                  </div>
                </div>

                {/* Radar Chart Placeholder */}
                <div className="mt-6 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                  <h4 className="text-lg font-semibold text-slate-200 mb-6">综合能力雷达图</h4>
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Radar Background */}
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Background circles */}
                      {[1, 2, 3, 4, 5].map((level) => (
                        <polygon
                          key={level}
                          points={getPolygonPoints(8, 100, 100, level * 16)}
                          fill="none"
                          stroke="rgb(71, 85, 105)"
                          strokeWidth="0.5"
                          opacity={0.5}
                        />
                      ))}
                      {/* Axes */}
                      {Object.keys(scoreLabels).map((_, i) => {
                        const angle = (i * 360) / 8 - 90
                        const rad = (angle * Math.PI) / 180
                        return (
                          <line
                            key={i}
                            x1="100"
                            y1="100"
                            x2={100 + 80 * Math.cos(rad)}
                            y2={100 + 80 * Math.sin(rad)}
                            stroke="rgb(71, 85, 105)"
                            strokeWidth="0.5"
                            opacity={0.5}
                          />
                        )
                      })}
                      {/* Data polygons */}
                      {topProducts.slice(0, 3).map((product, idx) => (
                        <polygon
                          key={product.id}
                          points={getDataPoints(product.scores, 100, 100, 16)}
                          fill={isLobster(product.id) ? "rgba(239, 68, 68, 0.2)" : `rgba(124, 58, 237, ${0.2 - idx * 0.05})`}
                          stroke={isLobster(product.id) ? "#ef4444" : `hsl(${260 + idx * 30}, 70%, 60%)`}
                          strokeWidth={isLobster(product.id) ? "2" : "1.5"}
                        />
                      ))}
                      {/* Labels */}
                      {Object.values(scoreLabels).map((label, i) => {
                        const angle = (i * 360) / 8 - 90
                        const rad = (angle * Math.PI) / 180
                        const x = 100 + 95 * Math.cos(rad)
                        const y = 100 + 95 * Math.sin(rad)
                        return (
                          <text
                            key={i}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-slate-400 text-[8px]"
                          >
                            {label}
                          </text>
                        )
                      })}
                    </svg>
                  </div>
                  {/* Radar Legend */}
                  <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
                    {topProducts.slice(0, 3).map((product, idx) => (
                      <div key={product.id} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded"
                          style={{ 
                            backgroundColor: isLobster(product.id) ? "#ef4444" : `hsl(${260 + idx * 30}, 70%, 60%)` 
                          }}
                        />
                        <span className={isLobster(product.id) ? "text-red-400" : "text-slate-400"}>
                          {product.name.split("（")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ranking" className="mt-0">
                <div className="space-y-3">
                  {rankedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`p-4 rounded-xl transition-all duration-200 hover:bg-slate-800/80 ${
                        isLobster(product.id) ? "bg-red-500/10 border border-red-500/30" : "bg-slate-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${
                          index === 0 ? "bg-amber-500/20 text-amber-400" :
                          index === 1 ? "bg-slate-400/20 text-slate-300" :
                          index === 2 ? "bg-orange-600/20 text-orange-400" :
                          "bg-slate-700 text-slate-400"
                        }`}>
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                        </span>
                        
                        <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                          {isLobster(product.id) ? "🦞" : product.name.charAt(0)}
                        </div>
                        
                        <div className="flex-1">
                          <div className={`font-semibold ${isLobster(product.id) ? "text-red-400" : "text-slate-200"}`}>
                            {product.name}
                          </div>
                          <div className="text-sm text-slate-500">{product.developer}</div>
                        </div>
                        
                        <div className="flex-1 max-w-[200px]">
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isLobster(product.id) ? "bg-red-500" : "bg-violet-500"
                              }`}
                              style={{ width: `${(product.score / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-mono font-bold text-slate-200">
                            {product.score.toFixed(1)}
                          </div>
                          <div className="text-xs text-slate-500">/ 5.0</div>
                        </div>
                        
                        <div className="w-16 flex items-center justify-center">
                          {Math.random() > 0.5 ? (
                            <span className="flex items-center text-emerald-400 text-sm">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              +{Math.floor(Math.random() * 3 + 1)}
                            </span>
                          ) : Math.random() > 0.3 ? (
                            <span className="flex items-center text-slate-500 text-sm">
                              <Minus className="w-4 h-4 mr-1" />
                              0
                            </span>
                          ) : (
                            <span className="flex items-center text-red-400 text-sm">
                              <TrendingDown className="w-4 h-4 mr-1" />
                              -{Math.floor(Math.random() * 2 + 1)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}

function getPolygonPoints(sides: number, cx: number, cy: number, radius: number): string {
  const points: string[] = []
  for (let i = 0; i < sides; i++) {
    const angle = (i * 360) / sides - 90
    const rad = (angle * Math.PI) / 180
    points.push(`${cx + radius * Math.cos(rad)},${cy + radius * Math.sin(rad)}`)
  }
  return points.join(" ")
}

function getDataPoints(scores: Product['scores'], cx: number, cy: number, scale: number): string {
  const values = Object.values(scores)
  const points: string[] = []
  for (let i = 0; i < values.length; i++) {
    const angle = (i * 360) / values.length - 90
    const rad = (angle * Math.PI) / 180
    const radius = values[i] * scale
    points.push(`${cx + radius * Math.cos(rad)},${cy + radius * Math.sin(rad)}`)
  }
  return points.join(" ")
}
