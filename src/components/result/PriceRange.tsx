import type { AssessResult } from '@/types'

interface PriceRangeProps {
  priceRange: AssessResult['priceRange']
}

export function PriceRange({ priceRange }: PriceRangeProps) {
  const fmt = (n: number) => n.toLocaleString('ja-JP')

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-l-primary-500 animate-fade-in-up">
      <p className="text-sm text-gray-500 font-medium mb-2">概算価格（参考値）</p>

      {/* 中央値 */}
      <div className="flex items-end gap-1 mb-3">
        <span className="text-5xl font-bold tabular-nums text-primary-600">{fmt(priceRange.mid)}</span>
        <span className="text-2xl font-bold text-primary-600 mb-1">万円</span>
      </div>

      {/* レンジ */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="text-gray-400">レンジ:</span>
        <span className="font-medium tabular-nums text-gray-700">{fmt(priceRange.low)}万円</span>
        <span className="text-gray-300">〜</span>
        <span className="font-medium tabular-nums text-gray-700">{fmt(priceRange.high)}万円</span>
      </div>

      {/* 売却目安 */}
      <div className="bg-primary-50 rounded-lg px-4 py-3">
        <p className="text-xs text-primary-700 font-medium">
          💡 売却目安:{' '}
          <span className="tabular-nums font-bold">
            {fmt(priceRange.sellingEstimate.low)}〜{fmt(priceRange.sellingEstimate.high)}万円
          </span>
          <span className="font-normal ml-1">（仲介手数料等考慮前）</span>
        </p>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        ※ あくまで参考価格です。実際の取引価格と異なる場合があります。
      </p>
    </div>
  )
}
