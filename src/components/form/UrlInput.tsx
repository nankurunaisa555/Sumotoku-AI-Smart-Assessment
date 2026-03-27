'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { PropertyInfo } from '@/types'

interface UrlInputProps {
  onExtracted: (partial: Partial<PropertyInfo> & { prefecture?: string; city?: string }) => void
}

export function UrlInput({ onExtracted }: UrlInputProps) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleFetch = async () => {
    if (!url.startsWith('http')) {
      setError('https:// から始まるURLを入力してください')
      return
    }
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const res = await fetch('/api/parse-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      onExtracted(data.property)
      setSuccess(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'URLの解析に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        SUUMO・HOME&apos;S・アットホームなどの物件ページURLを入力すると、情報を自動取得します。
      </p>
      <div className="flex gap-2">
        <input
          type="url"
          placeholder="https://suumo.jp/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 py-3 px-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500"
        />
        <Button variant="secondary" onClick={handleFetch} loading={loading} disabled={!url}>
          取得
        </Button>
      </div>
      {error && <p className="text-sm text-error-500">⚠️ {error}</p>}
      {success && <p className="text-sm text-success-500">✅ 物件情報を取得しました。内容をご確認ください。</p>}
    </div>
  )
}
