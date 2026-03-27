import { Button } from '@/components/ui/Button'

export function LineCtaButton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
      <p className="text-base font-bold text-gray-800 mb-2">
        🏠 もっと詳しく知りたい方へ
      </p>
      <p className="text-sm text-gray-600 mb-4">
        プロの不動産アドバイザーにLINEで無料相談できます。
      </p>
      <Button
        variant="line"
        size="xl"
        fullWidth
        onClick={() => {
          // LINE公式アカウントのURLを設定
          window.open('https://lin.ee/your-line-account', '_blank', 'noopener,noreferrer')
        }}
      >
        📱 LINEで無料相談する
      </Button>
      <p className="text-xs text-gray-400 mt-2">登録不要・完全無料</p>
    </div>
  )
}
