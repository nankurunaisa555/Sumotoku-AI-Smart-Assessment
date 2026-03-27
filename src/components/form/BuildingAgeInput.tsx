'use client'

import { useState } from 'react'
import type { BuildingAgeMode, JapaneseEra } from '@/types'
import { JAPANESE_ERAS } from '@/constants'

interface BuildingAgeInputProps {
  value: number
  onChange: (age: number) => void
}

export function BuildingAgeInput({ value, onChange }: BuildingAgeInputProps) {
  const [mode, setMode] = useState<BuildingAgeMode>('direct')
  const [westernYear, setWesternYear] = useState('')
  const [era, setEra] = useState<JapaneseEra>('reiwa')
  const [eraYear, setEraYear] = useState('')

  const currentYear = new Date().getFullYear()

  const handleWesternYear = (y: string) => {
    setWesternYear(y)
    const n = parseInt(y, 10)
    if (!isNaN(n) && n >= 1900 && n <= currentYear) {
      onChange(Math.max(0, currentYear - n))
    }
  }

  const handleEraYear = (y: string) => {
    setEraYear(y)
    const eraData = JAPANESE_ERAS.find((e) => e.value === era)
    if (!eraData) return
    const n = parseInt(y, 10)
    if (!isNaN(n) && n >= 1) {
      const western = eraData.startYear + n - 1
      onChange(Math.max(0, currentYear - western))
    }
  }

  const tabClass = (m: BuildingAgeMode) =>
    `px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 ${
      mode === m
        ? 'bg-secondary-500 text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`

  const inputClass =
    'py-3 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 tabular-nums'

  return (
    <div className="space-y-3">
      {/* モード切替 */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button type="button" className={tabClass('direct')} onClick={() => setMode('direct')}>
          築年数直接入力
        </button>
        <button type="button" className={tabClass('western')} onClick={() => setMode('western')}>
          西暦
        </button>
        <button type="button" className={tabClass('japanese')} onClick={() => setMode('japanese')}>
          和暦
        </button>
      </div>

      {/* 直接入力 */}
      {mode === 'direct' && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={100}
            value={value}
            onChange={(e) => onChange(Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0)))}
            className={`${inputClass} w-24`}
          />
          <span className="text-sm text-gray-600">年</span>
        </div>
      )}

      {/* 西暦入力 */}
      {mode === 'western' && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1900}
            max={currentYear}
            placeholder="例：2010"
            value={westernYear}
            onChange={(e) => handleWesternYear(e.target.value)}
            className={`${inputClass} w-28`}
          />
          <span className="text-sm text-gray-600">年築（築{value}年）</span>
        </div>
      )}

      {/* 和暦入力 */}
      {mode === 'japanese' && (
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={era}
            onChange={(e) => setEra(e.target.value as JapaneseEra)}
            className={`${inputClass} appearance-none`}
          >
            {JAPANESE_ERAS.map((e) => (
              <option key={e.value} value={e.value}>{e.label}</option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            max={99}
            placeholder="年"
            value={eraYear}
            onChange={(e) => handleEraYear(e.target.value)}
            className={`${inputClass} w-20`}
          />
          <span className="text-sm text-gray-600">年築（築{value}年）</span>
        </div>
      )}
    </div>
  )
}
