"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Twitter, MessageCircle, ArrowUp, Check } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      setSubscribed(true)
      setEmail("")
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🦞</span>
              <span className="text-xl font-bold text-red-500">LobsterAI</span>
            </div>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              LobsterAI全维度对比平台，致力于用数据驱动AI智能体选型决策
            </p>
            <p className="text-xs text-slate-600 mb-4">
              数据更新于：2026-03-06
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-4">产品</h3>
            <ul className="space-y-3">
              {["LobsterAI详情", "飞书Agent", "钉钉Agent", "全部产品对比"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-violet-400 text-sm transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-4">资源</h3>
            <ul className="space-y-3">
              {["使用指南", "API文档", "更新日志", "提交反馈"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-violet-400 text-sm transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-4">订阅更新</h3>
            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check className="w-5 h-5" />
                  <span>感谢订阅！</span>
                </div>
                <p className="text-sm text-slate-400 mt-2">
                  我们会每月发送精选动态到您的邮箱
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800 border-slate-700"
                  />
                  <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
                    订阅
                  </Button>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  每月一封精选动态，随时取消
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 text-center md:text-left">
            © 2026 LobsterAI对比平台. 数据仅供参考，请以官方信息为准。
          </p>
          <div className="flex gap-6">
            {["隐私政策", "使用条款", "免责声明"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-slate-600 hover:text-violet-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-500/25 hover:bg-violet-700 hover:scale-110 transition-all z-50"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  )
}
