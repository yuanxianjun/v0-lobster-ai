"use client"

import { useState } from "react"
import { products } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Building2,
  FolderSync,
  BarChart3,
  PenTool,
  User,
  Code2,
  ArrowRight,
  ArrowLeft,
  Check,
  Download,
  Link2,
  RefreshCw,
  Sparkles
} from "lucide-react"

const scenarios = [
  { id: "enterprise", label: "企业流程自动化", icon: <Building2 className="w-6 h-6" />, desc: "复杂审批、跨系统数据同步" },
  { id: "files", label: "远程文件管理", icon: <FolderSync className="w-6 h-6" />, desc: "微信/钉钉文件自动整理、云端备份" },
  { id: "data", label: "数据分析处理", icon: <BarChart3 className="w-6 h-6" />, desc: "批量文档分析、报表生成、可视化" },
  { id: "content", label: "内容创作辅助", icon: <PenTool className="w-6 h-6" />, desc: "文案生成、PPT制作、多语言翻译" },
  { id: "personal", label: "个人办公提效", icon: <User className="w-6 h-6" />, desc: "日程管理、邮件自动回复、信息搜集" },
  { id: "developer", label: "开发者工具", icon: <Code2 className="w-6 h-6" />, desc: "API测试、代码生成、技术文档管理" },
]

const deploymentOptions = [
  { value: "local", label: "必须本地部署" },
  { value: "cloud", label: "接受云端" },
  { value: "any", label: "无所谓" },
]

const budgetOptions = [
  { value: "free", label: "免费" },
  { value: "low", label: "¥500/月以下" },
  { value: "mid", label: "¥500-2000/月" },
  { value: "enterprise", label: "企业定制" },
]

const featureOptions = [
  "微信集成", "钉钉集成", "飞书集成", "WPS适配", "Office适配", 
  "零代码", "多模态", "语音控制", "API接口"
]

const specialOptions = [
  "信创适配", "等保三级", "国产化芯片", "私有化部署"
]

export function ProductWizard() {
  const [step, setStep] = useState(1)
  const [scenario, setScenario] = useState<string>("")
  const [deployment, setDeployment] = useState<string>("any")
  const [budget, setBudget] = useState<string>("any")
  const [features, setFeatures] = useState<Set<string>>(new Set())
  const [specials, setSpecials] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<typeof products | null>(null)

  const toggleFeature = (feature: string) => {
    const newSet = new Set(features)
    if (newSet.has(feature)) {
      newSet.delete(feature)
    } else {
      newSet.add(feature)
    }
    setFeatures(newSet)
  }

  const toggleSpecial = (special: string) => {
    const newSet = new Set(specials)
    if (newSet.has(special)) {
      newSet.delete(special)
    } else {
      newSet.add(special)
    }
    setSpecials(newSet)
  }

  const calculateMatch = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      // Simple scoring algorithm
      const scored = products.map((product) => {
        let score = 0
        
        // Deployment preference
        if (deployment === "local" && product.deploymentTypes.includes("本地")) score += 20
        if (deployment === "cloud" && product.deploymentTypes.includes("云端")) score += 15
        if (deployment === "any") score += 10
        
        // Budget
        if (budget === "free" && product.price.includes("免费")) score += 25
        if (budget === "enterprise" && product.price.includes("企业")) score += 20
        
        // Features
        product.features.forEach((f) => {
          if (features.has(f) || features.size === 0) score += 5
        })
        
        // Special requirements
        if (specials.has("信创适配") && product.features.includes("信创适配")) score += 15
        if (specials.has("私有化部署") && product.deploymentTypes.includes("本地")) score += 15
        
        // Base scores
        score += Object.values(product.scores).reduce((a, b) => a + b, 0) * 2
        
        return { ...product, matchScore: score }
      })
      
      const sorted = scored.sort((a, b) => b.matchScore - a.matchScore)
      setResults(sorted.slice(0, 5))
      setIsLoading(false)
      setStep(3)
    }, 2000)
  }

  const reset = () => {
    setStep(1)
    setScenario("")
    setDeployment("any")
    setBudget("any")
    setFeatures(new Set())
    setSpecials(new Set())
    setResults(null)
  }

  const isLobster = (id: string) => id.startsWith("lobster")

  return (
    <section id="wizard" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            智能选型工具
          </span>
        </h2>
        <p className="text-slate-400 text-center mb-12">
          回答几个简单问题，为你推荐最适合的AI智能体
        </p>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step > s
                    ? "bg-emerald-500 text-white"
                    : step === s
                    ? "bg-violet-500 text-white"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              <span className={`ml-2 text-sm ${step >= s ? "text-slate-200" : "text-slate-500"}`}>
                {s === 1 ? "场景选择" : s === 2 ? "约束条件" : "生成报告"}
              </span>
              {i < 2 && (
                <div className={`w-16 h-0.5 mx-4 ${step > s ? "bg-emerald-500" : "bg-slate-700"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-8 rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50">
          {/* Step 1: Scenario */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-200 mb-6">您的主要使用场景是？</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {scenarios.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setScenario(s.id)}
                    className={`p-5 rounded-xl text-left transition-all ${
                      scenario === s.id
                        ? "bg-violet-500/20 border-2 border-violet-500"
                        : "bg-slate-800/50 border-2 border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    <div className={`mb-3 ${scenario === s.id ? "text-violet-400" : "text-slate-400"}`}>
                      {s.icon}
                    </div>
                    <div className="font-semibold text-slate-200 mb-1">{s.label}</div>
                    <div className="text-sm text-slate-500">{s.desc}</div>
                    {scenario === s.id && (
                      <Badge className="mt-3 bg-violet-500">已选择</Badge>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!scenario}
                  className="bg-gradient-to-r from-violet-600 to-blue-600"
                >
                  下一步 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Constraints */}
          {step === 2 && (
            <div className="space-y-8">
              {/* Deployment */}
              <div>
                <h4 className="text-lg font-semibold text-slate-200 mb-4">部署偏好</h4>
                <RadioGroup value={deployment} onValueChange={setDeployment} className="flex flex-wrap gap-4">
                  {deploymentOptions.map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`deploy-${opt.value}`} />
                      <Label htmlFor={`deploy-${opt.value}`} className="text-slate-300 cursor-pointer">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Budget */}
              <div>
                <h4 className="text-lg font-semibold text-slate-200 mb-4">预算范围</h4>
                <RadioGroup value={budget} onValueChange={setBudget} className="flex flex-wrap gap-4">
                  {budgetOptions.map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`budget-${opt.value}`} />
                      <Label htmlFor={`budget-${opt.value}`} className="text-slate-300 cursor-pointer">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-lg font-semibold text-slate-200 mb-4">必备功能（可多选）</h4>
                <div className="flex flex-wrap gap-2">
                  {featureOptions.map((f) => (
                    <button
                      key={f}
                      onClick={() => toggleFeature(f)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        features.has(f)
                          ? "bg-violet-500 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <h4 className="text-lg font-semibold text-slate-200 mb-4">特殊要求（可多选）</h4>
                <div className="flex flex-wrap gap-2">
                  {specialOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSpecial(s)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        specials.has(s)
                          ? "bg-amber-500 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> 上一步
                </Button>
                <Button
                  onClick={calculateMatch}
                  className="bg-gradient-to-r from-violet-600 to-blue-600"
                >
                  生成推荐 <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-500/20 mb-4">
                <RefreshCw className="w-8 h-8 text-violet-400 animate-spin" />
              </div>
              <p className="text-lg text-slate-200 mb-2">正在分析15款产品...</p>
              <p className="text-sm text-slate-500">根据您的需求匹配最佳方案</p>
              <Progress value={66} className="mt-6 max-w-xs mx-auto" />
            </div>
          )}

          {/* Step 3: Results */}
          {step === 3 && results && !isLoading && (
            <div>
              <h3 className="text-xl font-semibold text-slate-200 mb-6 text-center">
                为您推荐以下产品
              </h3>

              {/* Top 3 Cards */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {results.slice(0, 3).map((product, index) => (
                  <div
                    key={product.id}
                    className={`p-5 rounded-xl transition-all hover:-translate-y-1 ${
                      isLobster(product.id)
                        ? "bg-red-500/10 border-2 border-red-500/50"
                        : "bg-slate-800/50 border-2 border-slate-700"
                    }`}
                  >
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        {Math.min(98 - index * 5, 98)}%
                      </div>
                      <div className="text-xs text-slate-500">匹配度</div>
                    </div>
                    <div className="text-center mb-3">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-700 text-2xl mb-2">
                        {isLobster(product.id) ? "🦞" : product.name.charAt(0)}
                      </div>
                      <div className={`font-semibold ${isLobster(product.id) ? "text-red-400" : "text-slate-200"}`}>
                        {product.name.split("（")[0]}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {product.features.slice(0, 3).map((f) => (
                        <Badge key={f} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                          {f}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      查看详情
                    </Button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-gradient-to-r from-violet-600 to-blue-600">
                  <Download className="w-4 h-4 mr-2" /> 导出PDF报告
                </Button>
                <Button variant="outline">
                  <Link2 className="w-4 h-4 mr-2" /> 保存对比链接
                </Button>
                <Button variant="ghost" onClick={reset}>
                  <RefreshCw className="w-4 h-4 mr-2" /> 重新选择
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
