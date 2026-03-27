import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url || !url.startsWith('http')) {
      return NextResponse.json({ error: '有効なURLを入力してください' }, { status: 400 })
    }

    // HTMLを取得
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LivingHacksBot/1.0)' },
      signal: AbortSignal.timeout(10000),
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'URLからデータを取得できませんでした' }, { status: 400 })
    }

    const html = await res.text()
    // HTMLを短縮（トークン節約）
    const truncated = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').slice(0, 8000)

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `以下のHTMLから不動産物件情報を抽出し、JSONのみで返答してください。

HTML:
${truncated}

出力JSON形式（不明な項目はnull）:
{
  "exclusiveArea": <専有面積数値|null>,
  "landArea": <土地面積数値|null>,
  "layout": "<間取り文字列|null>",
  "buildingAge": <築年数数値|null>,
  "floor": <階数数値|null>,
  "totalFloors": <総階数数値|null>,
  "stationName": "<最寄り駅名|null>",
  "stationDistance": <徒歩分数値|null>,
  "prefecture": "<都道府県|null>",
  "city": "<市区町村|null>",
  "price": <価格万円|null>
}`,
      }],
    })

    const text = message.content.filter(b => b.type === 'text').map(b => (b as { type: 'text'; text: string }).text).join('')
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const property = JSON.parse(cleaned)

    return NextResponse.json({ property, confidence: 0.8 })
  } catch (error) {
    console.error('Parse URL error:', error)
    return NextResponse.json({ error: 'URLの解析に失敗しました' }, { status: 500 })
  }
}
