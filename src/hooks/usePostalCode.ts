import { useState, useCallback } from 'react'

interface PostalCodeResult {
  prefecture: string
  city: string
  town: string
}

export function usePostalCode() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAddress = useCallback(async (postalCode: string): Promise<PostalCodeResult | null> => {
    const digits = postalCode.replace(/[^0-9]/g, '')
    if (digits.length !== 7) return null

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${digits}`)
      const data = await res.json()

      if (data.status === 200 && data.results && data.results.length > 0) {
        const r = data.results[0]
        return {
          prefecture: r.address1,
          city: r.address2,
          town: r.address3,
        }
      } else {
        setError('住所が見つかりませんでした')
        return null
      }
    } catch {
      setError('住所の取得に失敗しました')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { fetchAddress, loading, error }
}
