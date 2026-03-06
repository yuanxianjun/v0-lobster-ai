import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'LobsterAI 全维度对比平台 | AI智能体选型决策支持',
  description: '聚焦网易有道龙虾AI，横向对比15+国内外智能体产品，用数据驱动你的AI选型决策。覆盖本地文件、远程控制、办公软件、AI模型等8大维度。',
  keywords: ['LobsterAI', '龙虾AI', 'AI智能体', '产品对比', '网易有道', 'AI选型'],
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0f172a] text-slate-100`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
