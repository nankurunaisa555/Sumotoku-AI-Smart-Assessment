import { Card } from '@/components/ui/Card'

interface PlusCautionProps {
  plusPoints: string[]
  cautionPoints: string[]
}

export function PlusCaution({ plusPoints, cautionPoints }: PlusCautionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up stagger-4">
      {/* プラス */}
      <Card>
        <h3 className="text-base font-bold text-success-500 mb-3 flex items-center gap-1">
          ✅ プラスポイント
        </h3>
        <ul className="space-y-2">
          {plusPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-success-500 mt-0.5 shrink-0">●</span>
              {p}
            </li>
          ))}
        </ul>
      </Card>

      {/* 注意 */}
      <Card>
        <h3 className="text-base font-bold text-warning-500 mb-3 flex items-center gap-1">
          ⚠️ 注意ポイント
        </h3>
        <ul className="space-y-2">
          {cautionPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-warning-500 mt-0.5 shrink-0">●</span>
              {p}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
