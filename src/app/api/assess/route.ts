import { NextRequest, NextResponse } from 'next/server'
import { runAssessment } from '@/lib/claude'
import type { AssessRequest } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: AssessRequest = await request.json()

    // 必須項目のバリデーション
    if (!body.property?.type || !body.address?.prefecture) {
      return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 })
    }

    const result = await runAssessment(body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Assessment error:', error)
    return NextResponse.json(
      { error: '査定の処理中にエラーが発生しました。しばらくしてから再試行してください。' },
      { status: 500 }
    )
  }
}
