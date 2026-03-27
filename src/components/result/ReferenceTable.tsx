import { Card } from '@/components/ui/Card'
import type { ReferenceItem } from '@/types'

export function ReferenceTable({ references }: { references: ReferenceItem[] }) {
  if (!references || references.length === 0) return null
  return (
    <Card className="animate-fade-in-up stagger-3">
      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        📋 参考成約事例
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 text-gray-500 font-medium">所在地</th>
              <th className="text-left py-2 px-2 text-gray-500 font-medium">取引時期</th>
              <th className="text-right py-2 px-2 text-gray-500 font-medium">価格</th>
              <th className="text-right py-2 px-2 text-gray-500 font-medium">面積</th>
              <th className="text-left py-2 px-2 text-gray-500 font-medium">出典</th>
            </tr>
          </thead>
          <tbody>
            {references.map((ref, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-2 text-gray-700">{ref.location}</td>
                <td className="py-2 px-2 text-gray-600">{ref.date}</td>
                <td className="py-2 px-2 text-right font-medium tabular-nums text-gray-800">
                  {ref.price.toLocaleString('ja-JP')}万円
                </td>
                <td className="py-2 px-2 text-right tabular-nums text-gray-600">{ref.area}㎡</td>
                <td className="py-2 px-2 text-xs text-gray-400">{ref.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        出典: 国土交通省 不動産情報ライブラリ（参考値）
      </p>
    </Card>
  )
}
