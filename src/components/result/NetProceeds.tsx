import { Card } from '@/components/ui/Card'
import type { AssessResult } from '@/types'

export function NetProceeds({ netProceeds }: { netProceeds: AssessResult['netProceeds'] }) {
  const fmt = (n: number) => n.toLocaleString('ja-JP')
  const { estimate, breakdown } = netProceeds
  const total = breakdown.brokerageFee + breakdown.stampDuty + breakdown.otherCosts

  return (
    <Card className="animate-fade-in-up stagger-4">
      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        🏦 参考手取額目安
      </h3>
      <div className="flex items-end gap-1 mb-4">
        <span className="text-4xl font-bold tabular-nums text-gray-800">{fmt(estimate)}</span>
        <span className="text-xl font-bold text-gray-800 mb-1">万円</span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between py-1 border-b border-gray-100">
          <span className="text-gray-600">仲介手数料（概算）</span>
          <span className="tabular-nums text-gray-800 font-medium">− {fmt(breakdown.brokerageFee)}万円</span>
        </div>
        <div className="flex justify-between py-1 border-b border-gray-100">
          <span className="text-gray-600">印紙税（概算）</span>
          <span className="tabular-nums text-gray-800 font-medium">− {fmt(breakdown.stampDuty)}万円</span>
        </div>
        <div className="flex justify-between py-1 border-b border-gray-100">
          <span className="text-gray-600">その他諸費用（概算）</span>
          <span className="tabular-nums text-gray-800 font-medium">− {fmt(breakdown.otherCosts)}万円</span>
        </div>
        <div className="flex justify-between py-1 text-gray-500">
          <span>諸費用合計</span>
          <span className="tabular-nums">≒ {fmt(total)}万円</span>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        ※ 税金・諸費用は概算です。詳細は専門家にご相談ください。
      </p>
    </Card>
  )
}
