import { useState, useCallback } from 'react'
import type { AssessRequest, AssessResult } from '@/types'

export function useAssessment() {
  const [result, setResult] = useState<AssessResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const assess = useCallback(async (req: AssessRequest) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || '査定に失敗しました')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
    setLoading(false)
  }, [])

  return { result, loading, error, assess, reset }
}
