'use client'

import { Stepper } from '@/components/ui/Stepper'
import { ChipSelect } from '@/components/ui/ChipSelect'
import { BuildingAgeInput } from './BuildingAgeInput'
import {
  PROPERTY_TYPES, LAYOUTS, ROAD_ACCESS_OPTIONS,
  SEISMIC_OPTIONS, RENOVATION_OPTIONS, ORIENTATIONS,
} from '@/constants'
import type { PropertyInfo } from '@/types'

interface PropertyFormProps {
  value: PropertyInfo
  onChange: (p: PropertyInfo) => void
}

const selectClass =
  'w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500'

const labelClass = 'block text-sm font-medium text-gray-700 mb-1'
const groupClass = 'space-y-1'

export function PropertyForm({ value, onChange }: PropertyFormProps) {
  const set = <K extends keyof PropertyInfo>(key: K, val: PropertyInfo[K]) =>
    onChange({ ...value, [key]: val })

  const isMansion = value.type === 'mansion'
  const isLand = value.type === 'land'

  return (
    <div className="space-y-6">
      {/* 物件種別 */}
      <div className={groupClass}>
        <label htmlFor="property-type" className={labelClass}>
          物件種別 <span className="text-primary-500">*</span>
        </label>
        <div className="flex gap-3">
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => set('type', t.value)}
              className={`flex-1 py-3 rounded-lg border-2 text-sm font-bold transition-all duration-150 ${
                value.type === t.value
                  ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 面積 */}
      <div className="grid grid-cols-2 gap-4">
        {!isLand && (
          <div className={groupClass}>
            <label htmlFor="exclusive-area" className={labelClass}>
              専有面積 <span className="text-primary-500">*</span>
            </label>
            <Stepper id="exclusive-area" value={value.exclusiveArea} onChange={(v) => set('exclusiveArea', v)} min={10} max={500} unit="㎡" label="専有面積" />
          </div>
        )}
        {!isMansion && (
          <div className={groupClass}>
            <label htmlFor="land-area" className={labelClass}>
              土地面積 <span className="text-primary-500">*</span>
            </label>
            <Stepper id="land-area" value={value.landArea} onChange={(v) => set('landArea', v)} min={10} max={1000} unit="㎡" label="土地面積" />
          </div>
        )}
      </div>

      {/* 間取り */}
      {!isLand && (
        <div className={groupClass}>
          <label htmlFor="layout" className={labelClass}>
            間取り <span className="text-primary-500">*</span>
          </label>
          <select id="layout" value={value.layout} onChange={(e) => set('layout', e.target.value as PropertyInfo['layout'])} className={selectClass}>
            <option value="">選択してください</option>
            {LAYOUTS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>
      )}

      {/* 築年数 */}
      {!isLand && (
        <div className={groupClass}>
          <span className={labelClass}>築年数 <span className="text-primary-500">*</span></span>
          <BuildingAgeInput value={value.buildingAge} onChange={(v) => set('buildingAge', v)} />
        </div>
      )}

      {/* 階数（マンション） */}
      {isMansion && (
        <div className="grid grid-cols-2 gap-4">
          <div className={groupClass}>
            <label htmlFor="floor" className={labelClass}>階数</label>
            <Stepper id="floor" value={value.floor} onChange={(v) => set('floor', v)} min={1} max={60} unit="階" label="階数" />
          </div>
          <div className={groupClass}>
            <label htmlFor="total-floors" className={labelClass}>総階数</label>
            <Stepper id="total-floors" value={value.totalFloors} onChange={(v) => set('totalFloors', v)} min={1} max={60} unit="階建" label="総階数" />
          </div>
        </div>
      )}

      {/* 向き */}
      <div className={groupClass}>
        <span className={labelClass}>向き（最大3つ選択）</span>
        <ChipSelect options={ORIENTATIONS} selected={value.orientation} onChange={(v) => set('orientation', v)} max={3} />
      </div>

      {/* 最寄り駅 */}
      <div className="grid grid-cols-2 gap-4">
        <div className={groupClass}>
          <label htmlFor="station-name" className={labelClass}>最寄り駅</label>
          <input
            id="station-name"
            type="text"
            placeholder="例：浦和駅"
            value={value.stationName}
            onChange={(e) => set('stationName', e.target.value)}
            className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500"
          />
        </div>
        <div className={groupClass}>
          <label htmlFor="station-distance" className={labelClass}>駅徒歩</label>
          <Stepper id="station-distance" value={value.stationDistance} onChange={(v) => set('stationDistance', v)} min={1} max={60} unit="分" label="駅距離" />
        </div>
      </div>

      {/* 接道 */}
      <div className={groupClass}>
        <label htmlFor="road-access" className={labelClass}>接道状況</label>
        <select id="road-access" value={value.roadAccess} onChange={(e) => set('roadAccess', e.target.value as PropertyInfo['roadAccess'])} className={selectClass}>
          <option value="">選択してください</option>
          {ROAD_ACCESS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* 耐震 */}
      <div className={groupClass}>
        <label htmlFor="seismic" className={labelClass}>耐震・構造</label>
        <select id="seismic" value={value.seismicStandard} onChange={(e) => set('seismicStandard', e.target.value as PropertyInfo['seismicStandard'])} className={selectClass}>
          <option value="">選択してください</option>
          {SEISMIC_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* リフォーム */}
      {!isLand && (
        <div className={groupClass}>
          <label htmlFor="renovation" className={labelClass}>リフォーム状況</label>
          <select id="renovation" value={value.renovation} onChange={(e) => set('renovation', e.target.value as PropertyInfo['renovation'])} className={selectClass}>
            <option value="">選択してください</option>
            {RENOVATION_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      )}
    </div>
  )
}
