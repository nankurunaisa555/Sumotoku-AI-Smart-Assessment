'use client'

import { useEffect, useState } from 'react'

const MESSAGES = [
  '🏠 物件情報を分析中...',
  '📊 近隣の成約事例を検索中...',
  '🤖 AIが価格を算出中...',
  '📈 評価スコアを計算中...',
  '✨ 結果をまとめています...',
]

export function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex((i) => Math.min(i + 1, MESSAGES.length - 1))
    }, 2500)
    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 95))
    }, 300)
    return () => {
      clearInterval(msgTimer)
      clearInterval(progTimer)
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 py-16 px-4" role="status" aria-live="polite">
      {/* スピナー */}
      <div className="relative">
        <div className="w-20 h-20 border-4 border-secondary-100 border-t-secondary-500 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-3xl">🏡</div>
      </div>

      {/* メッセージ */}
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700 mb-1">{MESSAGES[msgIndex]}</p>
        <p className="text-sm text-gray-500">通常10〜15秒ほどかかります</p>
      </div>

      {/* プログレスバー */}
      <div className="w-full max-w-xs">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 text-right mt-1">{progress}%</p>
      </div>

      <span className="sr-only">AIが査定中です。しばらくお待ちください。</span>
    </div>
  )
}
