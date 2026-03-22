# スモトクAIかんたん査定

AI不動産査定Webアプリ。Next.js + TypeScript + Claude API で構築。

## セットアップ

```bash
# 依存関係インストール
npm install

# 環境変数設定
cp .env.local.example .env.local
# .env.local を編集して ANTHROPIC_API_KEY を設定

# 開発サーバー起動
npm run dev
```

## Vercelデプロイ

1. GitHubにリポジトリをpush
2. [Vercel](https://vercel.com) でプロジェクトをインポート
3. Environment Variables に `ANTHROPIC_API_KEY` を追加
4. Deploy

## iframeでの埋め込み

```html
<!-- 基本 -->
<iframe
  src="https://your-app.vercel.app"
  width="100%"
  height="800"
  style="border:none; max-width:480px; margin:0 auto; display:block;"
></iframe>

<!-- URLパラメータでプリセット -->
<iframe
  src="https://your-app.vercel.app?mode=buy&area=さいたま市浦和区&station=浦和駅&type=mansion&walk=10"
  width="100%"
  height="800"
  style="border:none; max-width:480px; margin:0 auto; display:block;"
></iframe>
```

## URLパラメータ一覧

| パラメータ | 説明 | 例 |
|---|---|---|
| `mode` | sell / buy | `sell` |
| `type` | mansion / house / land | `mansion` |
| `area` | 住所 | `さいたま市浦和区` |
| `station` | 最寄駅 | `浦和駅` |
| `walk` | 徒歩分数 | `10` |
| `exclusiveArea` | 専有面積（マンション） | `70` |
| `floor` | 所在階（マンション） | `5` |
| `buildingAge` | 築年数 | `10` |
| `layout` | 間取り | `3LDK` |
| `totalUnits` | 総戸数（マンション） | `100` |
| `buildingArea` | 建物面積（一戸建て） | `100` |
| `landArea` | 土地面積 | `120` |
| `stories` | 階建て（一戸建て） | `2` |
| `zoning` | 用途地域（土地） | `第一種住居地域` |
| `buildingCoverage` | 建ぺい率（土地） | `60` |
| `floorAreaRatio` | 容積率（土地） | `200` |

## 技術スタック

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: CSS (custom, no framework)
- **API**: Claude API (Sonnet 4) via server-side route
- **Deploy**: Vercel
- **Security**: API key server-side only, iframe制限
