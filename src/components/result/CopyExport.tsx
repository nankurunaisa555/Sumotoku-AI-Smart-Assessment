'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { AssessResult } from '@/types'

export function CopyExport({ result }: { result: AssessResult }) {
  const [copied, setCopied] = useState(false)

  const buildText = () => {
    const { priceRange, commentary, yieldEstimate } = result
    const fmt = (n: number) => n.toLocaleString('ja-JP')
    return `【AI不動産概算シミュレーター結果】

■ 概算価格（参考値）
${fmt(priceRange.mid)}万円
（レンジ: ${fmt(priceRange.low)}〜${fmt(priceRange.high)}万円）

■ AI解説
${commentary}

■ 表面利回り参考値
${yieldEstimate.grossYield.toFixed(2)}%（${yieldEstimate.disclaimer}）

---
※本結果は参考シミュレーションです。実際の取引価格・収益性とは異なる場合があります。
出典: 国土交通省 不動産情報ライブラリ
提供: LivingHacks AI不動産概算シミュレーター`
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'AI不動産概算シミュレーター結果',
        text: buildText(),
      })
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" onClick={handleCopy}>
        {copied ? '✅ コピーしました' : '📋 結果をコピー'}
      </Button>
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <Button variant="ghost" onClick={handleShare}>
          📤 共有
        </Button>
      )}
    </div>
  )
}
