'use client'

import { usePostalCode } from '@/hooks/usePostalCode'
import { PREFECTURES } from '@/constants'
import type { Address } from '@/types'

interface AddressInputProps {
  value: Address
  onChange: (address: Address) => void
}

export function AddressInput({ value, onChange }: AddressInputProps) {
  const { fetchAddress, loading } = usePostalCode()

  const set = (key: keyof Address, val: string) => onChange({ ...value, [key]: val })

  const handlePostalChange = async (raw: string) => {
    set('postalCode', raw)
    const digits = raw.replace(/[^0-9]/g, '')
    if (digits.length === 7) {
      const result = await fetchAddress(digits)
      if (result) {
        onChange({ ...value, postalCode: raw, ...result })
      }
    }
  }

  const inputClass =
    'w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500'

  return (
    <div className="space-y-4">
      {/* 郵便番号 */}
      <div className="space-y-1">
        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
          郵便番号
          <span className="ml-1 text-xs text-gray-400 font-normal">（7桁で自動補完）</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id="postal-code"
            type="text"
            placeholder="例：330-0063"
            maxLength={8}
            value={value.postalCode}
            onChange={(e) => handlePostalChange(e.target.value)}
            className={`${inputClass} max-w-[180px]`}
          />
          {loading && (
            <span className="text-xs text-secondary-600 animate-pulse">検索中...</span>
          )}
        </div>
      </div>

      {/* 都道府県 */}
      <div className="space-y-1">
        <label htmlFor="prefecture" className="block text-sm font-medium text-gray-700">
          都道府県 <span className="text-primary-500">*</span>
        </label>
        <select
          id="prefecture"
          value={value.prefecture}
          onChange={(e) => set('prefecture', e.target.value)}
          className={`${inputClass} max-w-[200px] appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_12px_center]`}
        >
          <option value="">選択してください</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* 市区町村 */}
      <div className="space-y-1">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          市区町村 <span className="text-primary-500">*</span>
        </label>
        <input
          id="city"
          type="text"
          placeholder="例：さいたま市浦和区"
          value={value.city}
          onChange={(e) => set('city', e.target.value)}
          className={inputClass}
        />
      </div>

      {/* 町名・番地 */}
      <div className="space-y-1">
        <label htmlFor="town" className="block text-sm font-medium text-gray-700">
          町名・番地
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            id="town"
            type="text"
            placeholder="例：高砂"
            value={value.town}
            onChange={(e) => set('town', e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="例：1-1-1"
            value={value.detail}
            onChange={(e) => set('detail', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* マンション名 */}
      <div className="space-y-1">
        <label htmlFor="building" className="block text-sm font-medium text-gray-700">
          マンション名・部屋番号
          <span className="ml-1 text-xs text-gray-400 font-normal">（任意）</span>
        </label>
        <input
          id="building"
          type="text"
          placeholder="例：○○マンション 301号室"
          value={value.building}
          onChange={(e) => set('building', e.target.value)}
          className={inputClass}
        />
      </div>
    </div>
  )
}
