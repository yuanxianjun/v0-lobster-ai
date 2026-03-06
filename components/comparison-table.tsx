"use client"

import { useState, useMemo } from "react"
import { products, scoreLabels, type Product } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Star, HardDrive, Cloud, RefreshCcw, X, ChevronUp, ChevronDown } from "lucide-react"

type SortKey = keyof Product['scores'] | 'name' | null
type SortDir = 'asc' | 'desc'

export function ComparisonTable() {
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [deploymentFilter, setDeploymentFilter] = useState<string>("all")
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [detailProduct, setDetailProduct] = useState<Product | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const filteredProducts = useMemo(() => {
    let result = products

    if (typeFilter !== "all") {
      result = result.filter((p) => p.type === typeFilter)
    }

    if (deploymentFilter !== "all") {
      result = result.filter((p) => p.deploymentTypes.includes(deploymentFilter))
    }

    if (sortKey) {
      result = [...result].sort((a, b) => {
        let aVal: number | string
        let bVal: number | string
        
        if (sortKey === 'name') {
          aVal = a.name
          bVal = b.name
        } else {
          aVal = a.scores[sortKey]
          bVal = b.scores[sortKey]
        }
        
        if (sortDir === 'asc') {
          return aVal > bVal ? 1 : -1
        }
        return aVal < bVal ? 1 : -1
      })
    }

    return result
  }, [typeFilter, deploymentFilter, sortKey, sortDir])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDir === 'desc') {
        setSortDir('asc')
      } else {
        setSortKey(null)
      }
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const toggleProduct = (id: string) => {
    const newSet = new Set(selectedProducts)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else if (newSet.size < 4) {
      newSet.add(id)
    }
    setSelectedProducts(newSet)
  }

  const resetFilters = () => {
    setTypeFilter("all")
    setDeploymentFilter("all")
    setSortKey(null)
  }

  const isLobster = (id: string) => id.startsWith("lobster")

  return (
    <section id="comparison" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            产品全维度对比
          </span>
        </h2>
        <p className="text-slate-400 text-center mb-8">
          横向对比15款AI智能体产品，找到最适合你的解决方案
        </p>

        {/* Filter Bar */}
        <div className="sticky top-16 z-30 py-4 bg-slate-900/80 backdrop-blur-xl rounded-xl mb-6">
          <div className="flex flex-wrap items-center gap-3 px-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32 bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="全部产品" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部产品</SelectItem>
                <SelectItem value="国产">国产</SelectItem>
                <SelectItem value="海外">海外</SelectItem>
              </SelectContent>
            </Select>

            <Select value={deploymentFilter} onValueChange={setDeploymentFilter}>
              <SelectTrigger className="w-32 bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="部署方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部方式</SelectItem>
                <SelectItem value="本地">本地部署</SelectItem>
                <SelectItem value="云端">云端</SelectItem>
                <SelectItem value="混合">混合部署</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-slate-400 hover:text-white">
              <RefreshCcw className="w-4 h-4 mr-2" />
              重置筛选
            </Button>

            <span className="ml-auto text-sm text-slate-500">
              已筛选出 <span className="text-violet-400 font-semibold">{filteredProducts.length}</span> 款产品
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-slate-800/80">
                <th className="p-4 text-left w-12">
                  <Checkbox
                    checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedProducts(new Set(filteredProducts.slice(0, 4).map(p => p.id)))
                      } else {
                        setSelectedProducts(new Set())
                      }
                    }}
                  />
                </th>
                <TableHeader label="产品名称" sortKey="name" currentSort={sortKey} sortDir={sortDir} onSort={toggleSort} />
                <th className="p-4 text-left text-sm font-semibold text-slate-300">开发商</th>
                <TableHeader label="本地文件" sortKey="localFile" currentSort={sortKey} sortDir={sortDir} onSort={toggleSort} />
                <TableHeader label="远程控制" sortKey="remoteControl" currentSort={sortKey} sortDir={sortDir} onSort={toggleSort} />
                <TableHeader label="办公软件" sortKey="officeSoftware" currentSort={sortKey} sortDir={sortDir} onSort={toggleSort} />
                <th className="p-4 text-left text-sm font-semibold text-slate-300">AI模型</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-300">部署方式</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-300">价格</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-300">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`border-t border-slate-800 transition-all duration-200 hover:bg-slate-800/50 cursor-pointer ${
                    isLobster(product.id) ? "bg-red-500/5 border-l-4 border-l-red-500" : ""
                  } ${selectedProducts.has(product.id) ? "bg-violet-500/10" : ""}`}
                  onClick={() => setDetailProduct(product)}
                >
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedProducts.has(product.id)}
                      onCheckedChange={() => toggleProduct(product.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-lg">
                        {isLobster(product.id) ? "🦞" : product.name.charAt(0)}
                      </div>
                      <div>
                        <div className={`font-semibold ${isLobster(product.id) ? "text-red-400" : "text-slate-200"}`}>
                          {product.name}
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {product.type}
                        </Badge>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-400">{product.developer}</td>
                  <td className="p-4"><StarRating score={product.scores.localFile} /></td>
                  <td className="p-4"><StarRating score={product.scores.remoteControl} /></td>
                  <td className="p-4"><StarRating score={product.scores.officeSoftware} /></td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 2).map((f) => (
                        <Badge key={f} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                          {f}
                        </Badge>
                      ))}
                      {product.features.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-400">
                          +{product.features.length - 2}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      {product.deploymentTypes.includes("本地") && <HardDrive className="w-4 h-4" />}
                      {product.deploymentTypes.includes("云端") && <Cloud className="w-4 h-4" />}
                      {product.deploymentTypes.includes("混合") && <RefreshCcw className="w-4 h-4" />}
                      <span className="ml-1">{product.deploymentTypes[0]}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm ${
                      product.price.includes("免费") ? "text-emerald-400" : 
                      product.price.includes("$") ? "text-blue-400" : "text-amber-400"
                    }`}>
                      {product.price.split("/")[0]}
                    </span>
                  </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setDetailProduct(product)}>
                        详情
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedProducts.has(product.id) ? "default" : "outline"}
                        onClick={() => toggleProduct(product.id)}
                        disabled={!selectedProducts.has(product.id) && selectedProducts.size >= 4}
                      >
                        {selectedProducts.has(product.id) ? "已选" : "对比"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Comparison Bar */}
        {selectedProducts.size >= 2 && (
          <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 p-4 z-40">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                {Array.from(selectedProducts).map((id) => {
                  const product = products.find((p) => p.id === id)
                  if (!product) return null
                  return (
                    <Badge
                      key={id}
                      className={`${isLobster(id) ? "bg-red-500/20 text-red-400" : "bg-violet-500/20 text-violet-400"} px-3 py-1`}
                    >
                      {product.name.split("（")[0]}
                      <X
                        className="w-3 h-3 ml-2 cursor-pointer hover:text-white"
                        onClick={() => toggleProduct(id)}
                      />
                    </Badge>
                  )
                })}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400">
                  已选择 <span className="text-violet-400 font-semibold">{selectedProducts.size}</span> 款产品
                </span>
                <Button className="bg-gradient-to-r from-violet-600 to-blue-600">
                  生成对比报告
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Detail Sheet */}
        <Sheet open={!!detailProduct} onOpenChange={() => setDetailProduct(null)}>
          <SheetContent className="w-full sm:max-w-xl bg-slate-900 border-slate-800 overflow-y-auto">
            {detailProduct && (
              <>
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-3 text-slate-100">
                    <span className="text-3xl">{isLobster(detailProduct.id) ? "🦞" : detailProduct.name.charAt(0)}</span>
                    <span className={isLobster(detailProduct.id) ? "text-red-400" : ""}>{detailProduct.name}</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <p className="text-slate-400 text-sm mb-2">核心优势</p>
                    <p className="text-slate-200">{detailProduct.highlight}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm mb-3">能力评分</p>
                    <div className="space-y-3">
                      {Object.entries(detailProduct.scores).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-3">
                          <span className="text-sm text-slate-400 w-20">{scoreLabels[key as keyof typeof scoreLabels]}</span>
                          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all"
                              style={{ width: `${(value / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-mono text-slate-300 w-8">{value}/5</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm mb-2">功能特性</p>
                    <div className="flex flex-wrap gap-2">
                      {detailProduct.features.map((f) => (
                        <Badge key={f} className="bg-violet-500/20 text-violet-400">{f}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-800/50">
                      <p className="text-slate-400 text-sm mb-1">开发商</p>
                      <p className="text-slate-200">{detailProduct.developer}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/50">
                      <p className="text-slate-400 text-sm mb-1">价格</p>
                      <p className="text-slate-200">{detailProduct.price}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/50">
                      <p className="text-slate-400 text-sm mb-1">部署方式</p>
                      <p className="text-slate-200">{detailProduct.deploymentTypes.join("、")}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/50">
                      <p className="text-slate-400 text-sm mb-1">最后更新</p>
                      <p className="text-slate-200">{detailProduct.lastUpdate}</p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-violet-600 to-blue-600"
                    onClick={() => {
                      toggleProduct(detailProduct.id)
                      setDetailProduct(null)
                    }}
                    disabled={!selectedProducts.has(detailProduct.id) && selectedProducts.size >= 4}
                  >
                    {selectedProducts.has(detailProduct.id) ? "从对比中移除" : "加入对比"}
                  </Button>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </section>
  )
}

function TableHeader({ 
  label, 
  sortKey, 
  currentSort, 
  sortDir, 
  onSort 
}: { 
  label: string
  sortKey: SortKey
  currentSort: SortKey
  sortDir: SortDir
  onSort: (key: SortKey) => void 
}) {
  const isActive = currentSort === sortKey
  
  return (
    <th 
      className="p-4 text-left text-sm font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-1">
        {label}
        <span className="text-slate-500">
          {isActive ? (
            sortDir === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4 opacity-30" />
          )}
        </span>
      </div>
    </th>
  )
}

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= score
              ? score >= 4 ? "fill-emerald-400 text-emerald-400" : 
                score >= 3 ? "fill-amber-400 text-amber-400" : "fill-red-400 text-red-400"
              : "text-slate-700"
          }`}
        />
      ))}
    </div>
  )
}
