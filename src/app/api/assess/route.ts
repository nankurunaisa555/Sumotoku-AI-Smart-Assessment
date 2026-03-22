import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { mode, propertyType, step1, step2 } = body;

    const modeLabel = mode === 'sell' ? '売却' : '購入';
    const typeLabel =
      propertyType === 'mansion' ? 'マンション' :
      propertyType === 'house' ? '一戸建て' : '土地';

    const step1Text = Object.entries(step1)
      .filter(([, v]) => v && v !== '')
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');

    const step2Text = Object.entries(step2)
      .filter(([k, v]) => v && v !== '' && k !== 'viewPhoto')
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');

    const hasPhoto = step2.viewPhoto && step2.viewPhoto.startsWith('data:');

    const systemPrompt = `あなたは日本の不動産査定のプロフェッショナルAIです。
提供された物件情報に基づき、現実的で根拠のある査定結果を日本語で返してください。

必ず以下のJSON形式のみで回答してください（Markdownコードブロック不要、JSONのみ）:
{
  "patterns": [
    {
      "label": "A：現況渡し",
      "tag": "現況のまま売却",
      "priceMin": 数値（万円）,
      "priceMax": 数値（万円）,
      "priceMedian": 数値（万円）,
      "costEstimate": 0,
      "netGainDiff": "基準",
      "isBestValue": false
    },
    {
      "label": "B：部分リフォーム",
      "tag": "水回り等の部分改修後に売却",
      "priceMin": 数値,
      "priceMax": 数値,
      "priceMedian": 数値,
      "costEstimate": 数値（万円）,
      "netGainDiff": "+○○万円 or -○○万円",
      "isBestValue": true or false
    },
    {
      "label": "C：フルリノベーション",
      "tag": "全面改修後に売却",
      "priceMin": 数値,
      "priceMax": 数値,
      "priceMedian": 数値,
      "costEstimate": 数値（万円）,
      "netGainDiff": "+○○万円 or -○○万円",
      "isBestValue": true or false
    }
  ],
  "factors": [
    { "name": "要因名", "stars": 1-5の整数, "description": "簡潔な説明" }
  ],
  "aiComment": "詳細なAI解説文（200-400文字程度）。物件の強み・弱み、市場動向、おすすめパターンの理由を含む。"
}

factors（影響要因）は5〜8個程度。立地・築年数・面積・日当たり・設備・市場動向などから該当するものを選択。
${propertyType === 'land' ? 'patternsは土地のため、A：現況渡し のみ1パターンで返し、costEstimateは0としてください。factorsとaiCommentは通常通り返してください。' : '3パターンすべてisBestValueがfalseにならないように、最もコスパの良い1つにisBestValue: trueを設定してください。'}
${mode === 'buy' ? '購入者向けの査定として、適正購入価格帯と注意点を中心にコメントしてください。' : ''}`;

    const userContent: Array<{ type: string; text?: string; source?: { type: string; media_type: string; data: string } }> = [];

    if (hasPhoto) {
      const base64Data = step2.viewPhoto.split(',')[1];
      const mimeMatch = step2.viewPhoto.match(/data:([^;]+);/);
      const mediaType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

      userContent.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: base64Data,
        },
      });
    }

    userContent.push({
      type: 'text',
      text: `【${modeLabel}査定依頼】
物件種別: ${typeLabel}

■ 基本情報
${step1Text}

■ 詳細情報
${step2Text}

${step2.viewDescription ? `■ 眺望・周辺環境の説明\n${step2.viewDescription}` : ''}
${hasPhoto ? '\n■ 眺望写真が添付されています。写真の内容も査定に反映してください。' : ''}`,
    });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userContent,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API error:', errorData);
      return NextResponse.json(
        { error: 'AI査定の処理中にエラーが発生しました' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const textContent = data.content?.find((c: { type: string }) => c.type === 'text');

    if (!textContent?.text) {
      return NextResponse.json({ error: 'AI応答が空です' }, { status: 500 });
    }

    let jsonText = textContent.text.trim();
    // Remove markdown code fences if present
    jsonText = jsonText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');

    const result = JSON.parse(jsonText);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Assessment error:', error);
    return NextResponse.json(
      { error: '査定処理中にエラーが発生しました。再度お試しください。' },
      { status: 500 }
    );
  }
}
