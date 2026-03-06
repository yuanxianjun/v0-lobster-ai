"use client"

import { useState } from "react"
import { guidesData, commandTemplates } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  Search, 
  Play, 
  FileText, 
  Copy, 
  Check, 
  Heart,
  Clock,
  Eye
} from "lucide-react"

export function GuidesSection() {
  const [selectedProduct, setSelectedProduct] = useState("lobster-ai")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const currentGuides = guidesData.find((g) => g.id === selectedProduct)

  const filteredTemplates = commandTemplates.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      console.error("Failed to copy")
    }
  }

  const toggleFavorite = (id: string) => {
    const newSet = new Set(favorites)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setFavorites(newSet)
  }

  return (
    <section id="guides" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            使用指南
          </span>
        </h2>
        <p className="text-slate-400 text-center mb-12">
          快速上手各款AI智能体产品，提升工作效率
        </p>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="搜索教程..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700"
              />
            </div>

            {/* Hot Tags */}
            <div className="flex flex-wrap gap-2">
              {["LobsterAI入门", "微信集成", "钉钉配置"].map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-violet-500/20 hover:border-violet-500 transition-all"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Product List */}
            <Accordion type="single" collapsible defaultValue="lobster-ai" className="space-y-2">
              {guidesData.map((product) => (
                <AccordionItem
                  key={product.id}
                  value={product.id}
                  className={`rounded-xl border transition-all ${
                    selectedProduct === product.id
                      ? product.id === "lobster-ai"
                        ? "bg-red-500/10 border-red-500/30"
                        : "bg-violet-500/10 border-violet-500/30"
                      : "bg-slate-800/50 border-slate-700/50"
                  }`}
                >
                  <AccordionTrigger
                    onClick={() => setSelectedProduct(product.id)}
                    className={`px-4 py-3 hover:no-underline ${
                      product.id === "lobster-ai" ? "text-red-400" : "text-slate-200"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {product.id === "lobster-ai" && "🦞"}
                      {product.name}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3">
                    <div className="space-y-1">
                      {product.guides.map((guide) => (
                        <button
                          key={guide.id}
                          className="w-full text-left text-sm text-slate-400 hover:text-white py-1.5 px-2 rounded hover:bg-slate-700/50 transition-all"
                        >
                          {guide.type === "video" ? (
                            <Play className="w-3 h-3 inline mr-2" />
                          ) : (
                            <FileText className="w-3 h-3 inline mr-2" />
                          )}
                          {guide.title}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Main Content */}
          <div>
            <Tabs defaultValue="videos">
              <TabsList className="bg-slate-800/50 mb-6">
                <TabsTrigger value="videos">视频教程</TabsTrigger>
                <TabsTrigger value="templates">指令模板库</TabsTrigger>
                <TabsTrigger value="faq">常见问题</TabsTrigger>
              </TabsList>

              <TabsContent value="videos" className="mt-0">
                <div className="grid md:grid-cols-2 gap-4">
                  {currentGuides?.guides
                    .filter((g) => g.type === "video")
                    .map((guide) => (
                      <div
                        key={guide.id}
                        className="group rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700/50 hover:border-violet-500/50 transition-all"
                      >
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-slate-700">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-violet-500/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play className="w-6 h-6 text-white fill-white ml-1" />
                            </div>
                          </div>
                          {guide.duration && (
                            <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-xs text-white flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {guide.duration}
                            </span>
                          )}
                        </div>
                        {/* Info */}
                        <div className="p-4">
                          <h4 className="font-semibold text-slate-200 mb-2 group-hover:text-violet-400 transition-colors">
                            {guide.title}
                          </h4>
                          {guide.views && (
                            <span className="text-sm text-slate-500 flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {guide.views.toLocaleString()} 次观看
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="templates" className="mt-0">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {["全部", "文件整理", "数据处理", "办公自动化"].map((cat) => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="cursor-pointer hover:bg-violet-500/20 hover:border-violet-500"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>

                {/* Template Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-violet-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-200">{template.title}</h4>
                          <Badge variant="secondary" className="mt-1 bg-slate-700 text-slate-400">
                            {template.category}
                          </Badge>
                        </div>
                        <button
                          onClick={() => toggleFavorite(template.id)}
                          className={`p-2 rounded-lg transition-all ${
                            favorites.has(template.id)
                              ? "text-red-400 bg-red-500/20"
                              : "text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${favorites.has(template.id) ? "fill-current" : ""}`} />
                        </button>
                      </div>

                      {/* Command Block */}
                      <div className="relative mb-3">
                        <pre className="p-4 rounded-lg bg-slate-900 text-sm text-slate-300 font-mono overflow-x-auto">
                          {template.command}
                        </pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 text-slate-400 hover:text-white"
                          onClick={() => handleCopy(template.id, template.command)}
                        >
                          {copiedId === template.id ? (
                            <><Check className="w-4 h-4 mr-1" /> 已复制</>
                          ) : (
                            <><Copy className="w-4 h-4 mr-1" /> 复制</>
                          )}
                        </Button>
                      </div>

                      <p className="text-sm text-slate-500">{template.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="faq" className="mt-0">
                <Accordion type="single" collapsible className="space-y-3">
                  {[
                    {
                      q: "LobsterAI支持哪些AI模型？",
                      a: "LobsterAI支持DeepSeek、通义千问、文心一言等多款国产大模型，企业版还支持私有化部署的自研模型。"
                    },
                    {
                      q: "微信文件整理是否会上传到云端？",
                      a: "不会。LobsterAI默认采用本地优先策略，所有文件处理均在本地完成，不会上传到任何云端服务器。"
                    },
                    {
                      q: "如何解决权限不足的问题？",
                      a: "请检查系统设置中是否已授予LobsterAI访问文件夹的权限。在Windows上需要以管理员身份运行，在macOS上需要在系统偏好设置中授权。"
                    },
                    {
                      q: "企业版有哪些额外功能？",
                      a: "企业版包含SSO单点登录、审计日志、信创适配、私有化部署、API调用等高级功能，支持50人以上团队使用。"
                    },
                  ].map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="rounded-xl bg-slate-800/50 border border-slate-700/50 px-4"
                    >
                      <AccordionTrigger className="text-slate-200 hover:text-violet-400 hover:no-underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="mt-8 text-center">
                  <p className="text-slate-500 mb-4">没找到答案？</p>
                  <Button variant="outline" className="border-violet-500 text-violet-400 hover:bg-violet-500/10">
                    提交新问题
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
