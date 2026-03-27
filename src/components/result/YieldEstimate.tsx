import { Card } from '@/components/ui/Card'
import type { AssessResult } from '@/types'

export function YieldEstimate({ yieldEstimate }: { yieldEstimate: AssessResult['yieldEstimate'] }) {
  return (
    <Card className="animate-fade-in-up stagger-3">
      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        💰 表面利回り参考値
      </h3>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-bold tabular-nums text-secondary-600">
          {yieldEstimate.grossYield.toFixed(2)}
        </span>
        <span className="text-xl font-bold text-secondary-600 mb-1">%</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        想定年間家賃: <span className="font-medium tabular-nums">{yieldEstimate.annualRent.toLocaleString()}万円</span>
      </p>
      <div className="bg-warning-50 border border-warning-500/20 rounded-lg px-3 py-2">
        <p className="text-xs text-warning-700">⚠️ {yieldEstimate.disclaimer}</p>
      </div>
    </Card>
  )
}
