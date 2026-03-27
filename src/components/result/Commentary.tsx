import { Card } from '@/components/ui/Card'

export function Commentary({ text }: { text: string }) {
  return (
    <Card className="animate-fade-in-up stagger-1">
      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        🤖 AI総合解説
      </h3>
      <div className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{text}</div>
    </Card>
  )
}
