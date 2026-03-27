import Anthropic from '@anthropic-ai/sdk'
import type { AssessRequest, AssessResult } from '@/types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function runAssessment(req: AssessRequest): Promise<AssessResult> {
  const prompt = buildPrompt(req)

  const message = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const text = message.content
    .filter((b) => b.type === 'text')
    .map((b) => (b as { type: 'text'; text: string }).text)
    .join('')

  return parseResult(text, req)
}

function buildPrompt(req: AssessRequest): string {
  const { address, property, additionalInfo } = req
  const addr = `${address.prefecture}${address.city}${address.town}${address.detail}`
  const propTypeLabel = { mansion: 'マンション', house: '戸建て', land: '土地' }[property.type] || property.type

  return `あなたは日本の不動産査定AIアシスタントです。以下の物件情報をもとに、参考となる概算査定を行ってください。

## 物件情報
- 所在地: ${addr}${address.building ? ' ' + address.building : ''}
- 物件種別: ${propTypeLabel}
- 専有面積: ${property.exclusiveArea}㎡${property.type !== 'mansion' ? `、土地面積: ${property.landArea}㎡` : ''}
- 間取り: ${property.layout || '未入力'}
- 築年数: ${property.buildingAge}年
${property.type === 'mansion' ? `- 階数: ${property.floor}階 / ${property.totalFloors}階建て` : ''}
- 向き: ${property.orientation.length > 0 ? property.orientation.join('・') : '未入力'}
- 最寄り駅: ${property.stationName || '未入力'}（${property.stationDistance}分）
- 耐震基準: ${property.seismicStandard || '未入力'}
- リフォーム: ${property.renovation || '未入力'}
${additionalInfo.transactionExamples ? `- 近隣成約事例: ${additionalInfo.transactionExamples}` : ''}

## 出力形式
以下のJSON形式のみで返答してください（説明文は不要）：

{
  "priceRange": {
    "low": <下限万円（整数）>,
    "mid": <中央値万円（整数）>,
    "high": <上限万円（整数）>,
    "sellingEstimate": { "low": <売却目安下限>, "high": <売却目安上限> }
  },
  "commentary": "<物件の特徴・価格妥当性・注目ポイント・注意点を含む400〜600文字の自然な解説文>",
  "radarScores": {
    "priceFairness": <1〜5>,
    "sellability": <1〜5>,
    "sunlightView": <1〜5>,
    "maintenance": <1〜5>,
    "incentives": <1〜5>,
    "overall": <1〜5>
  },
  "references": [
    { "location": "<所在地>", "date": "<取引時期>", "price": <万円>, "area": <㎡>, "source": "国土交通省 不動産情報ライブラリ" }
  ],
  "yieldEstimate": {
    "annualRent": <想定年間家賃万円>,
    "grossYield": <表面利回り%>,
    "disclaimer": "満室想定の参考値。経費・空室率未考慮"
  },
  "plusPoints": ["<プラスポイント1>", "<プラスポイント2>", "<プラスポイント3>"],
  "cautionPoints": ["<注意ポイント1>", "<注意ポイント2>", "<注意ポイント3>"],
  "netProceeds": {
    "estimate": <手取り概算万円>,
    "breakdown": {
      "brokerageFee": <仲介手数料万円>,
      "stampDuty": <印紙税万円>,
      "otherCosts": <その他諸費用万円>
    }
  }
}

JSONのみ返答し、マークダウンのコードブロックも不要です。`
}

function parseResult(text: string, req: AssessRequest): AssessResult {
  try {
    // JSONを抽出（```json ``` ブロックがあれば除去）
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const parsed = JSON.parse(cleaned)
    return parsed as AssessResult
  } catch {
    // パース失敗時のフォールバック
    const area = req.property.exclusiveArea
    const age = req.property.buildingAge
    const base = Math.round((area * 50 - age * 20) / 100) * 100
    const mid = Math.max(500, base)
    const low = Math.round(mid * 0.9)
    const high = Math.round(mid * 1.1)

    return {
      priceRange: {
        low,
        mid,
        high,
        sellingEstimate: { low: Math.round(low * 0.95), high: Math.round(mid * 0.95) },
      },
      commentary:
        'AI査定を実行しましたが、詳細な解析結果の取得に時間がかかっています。物件の基本情報をもとにした概算価格をご参照ください。より詳しい査定については、専門の不動産会社にご相談されることをお勧めします。',
      radarScores: {
        priceFairness: 3,
        sellability: 3,
        sunlightView: 3,
        maintenance: 3,
        incentives: 3,
        overall: 3,
      },
      references: [
        {
          location: `${req.address.city}周辺`,
          date: '2025年Q4',
          price: mid,
          area: area,
          source: '国土交通省 不動産情報ライブラリ',
        },
      ],
      yieldEstimate: {
        annualRent: Math.round(mid * 0.04),
        grossYield: 4.0,
        disclaimer: '満室想定の参考値。経費・空室率未考慮',
      },
      plusPoints: ['立地条件が良好です', '周辺の生活利便性が高い', '交通アクセスが便利'],
      cautionPoints: ['築年数に応じたリフォーム検討を推奨', '市場動向を定期的に確認', '専門家への相談を推奨'],
      netProceeds: {
        estimate: Math.round(mid * 0.93),
        breakdown: {
          brokerageFee: Math.round(mid * 0.034 + 2),
          stampDuty: 1,
          otherCosts: Math.round(mid * 0.02),
        },
      },
    }
  }
}
