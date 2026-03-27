import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LivingHacks AI不動産概算シミュレーター',
  description: '物件情報を入力するだけで、AIが概算価格・評価スコア・詳細分析を即座に提供。完全無料・登録不要の参考シミュレーションツールです。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
