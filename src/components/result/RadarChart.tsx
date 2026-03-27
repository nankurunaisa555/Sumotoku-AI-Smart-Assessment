'use client'

import { RadarChart as ReRadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/Card'
import { RADAR_LABELS } from '@/constants'
import type { RadarScores } from '@/types'

export function RadarChart({ scores }: { scores: RadarScores }) {
  const data = RADAR_LABELS.map(({ key, label }) => ({
    subject: label,
    value: scores[key as keyof RadarScores],
    fullMark: 5,
  }))

  return (
    <Card className="animate-fade-in-up stagger-2">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        📊 6項目評価
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <ReRadarChart data={data}>
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#4A5568', fontSize: 12 }}
          />
          <Radar
            dataKey="value"
            stroke="#3182CE"
            fill="#3182CE"
            fillOpacity={0.2}
            dot={{ fill: '#2B6CB0', r: 4 }}
          />
        </ReRadarChart>
      </ResponsiveContainer>

      {/* スコア一覧 */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {RADAR_LABELS.map(({ key, label }) => {
          const score = scores[key as keyof RadarScores]
          return (
            <div key={key} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-gray-600">{label}</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i <= score ? 'bg-secondary-500' : 'bg-gray-200'}`}
                  />
                ))}
                <span className="ml-1 font-bold text-secondary-700 tabular-nums">{score}</span>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
