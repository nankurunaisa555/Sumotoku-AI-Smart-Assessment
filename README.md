# LivingHacks AI不動産概算シミュレーター

livinghacks.jp ブログ記事内への iframe 埋め込みを前提とした、AI不動産概算シミュレーターです。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイル**: Tailwind CSS v3
- **AI**: Claude API (claude-sonnet-4-5)
- **チャート**: Recharts
- **住所補完**: zipcloud API（無料）
- **デプロイ**: Vercel

---

## セットアップ手順

### 1. リポジトリをクローン or ZIP展開

```bash
git clone <your-repo>
cd livinghacks-simulator
```

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local.example` を `.env.local` にコピーして APIキーを設定します。

```bash
cp .env.local.example .env.local
```

`.env.local` を編集:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxx
```

APIキーは [Anthropic Console](https://console.anthropic.com/settings/keys) で取得できます。

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

---

## Vercel へのデプロイ

### 方法A: GitHub経由（推奨）

1. GitHubにリポジトリを作成してpush
2. [Vercel](https://vercel.com) でリポジトリをインポート
3. **Environment Variables** に `ANTHROPIC_API_KEY` を登録
4. Deploy ボタンを押す

### 方法B: Vercel CLI

```bash
npm install -g vercel
vercel
# 対話形式でデプロイ設定
# Environment Variables に ANTHROPIC_API_KEY を設定
```

> ⚠️ `.env.local` の内容は自動でVercelに反映されません。Vercelダッシュボードで手動登録が必要です。

---

## iframe 埋め込み方法（SWELL / WordPress）

SWELLのカスタムHTMLブロックに以下を貼り付けます：

```html
<iframe
  src="https://your-app.vercel.app"
  width="100%"
  height="800"
  frameborder="0"
  scrolling="no"
  id="livinghacks-simulator"
></iframe>

<script>
// iframe の高さを動的に調整
window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'resize') {
    document.getElementById('livinghacks-simulator').height = e.data.height + 'px';
  }
});
</script>
```

---

## ファイル構成

```
src/
├── app/
│   ├── layout.tsx              # ルートレイアウト
│   ├── globals.css             # Tailwind + カスタムCSS
│   ├── page.tsx                # メインページ（入力→結果フロー）
│   └── api/
│       ├── assess/route.ts     # 査定API
│       └── parse-url/route.ts  # URL解析API
├── components/
│   ├── ui/                     # 汎用UIコンポーネント
│   ├── form/                   # フォーム関連
│   ├── result/                 # 結果表示
│   └── layout/                 # レイアウト
├── hooks/                      # カスタムフック
├── lib/                        # Claude API連携
├── types/                      # TypeScript型定義
└── constants/                  # 定数定義
```

---

## カスタマイズ

### LINE公式アカウントのURLを変更

`src/components/result/LineCtaButton.tsx` の以下の行を編集:

```typescript
window.open('https://lin.ee/your-line-account', '_blank', 'noopener,noreferrer')
```

### ブランドカラーを変更

`tailwind.config.ts` の `primary` カラーを変更します。

---

## 免責事項

本ツールの査定結果はあくまで参考シミュレーションです。  
実際の売却価格・取引条件・収益性とは異なる場合があります。  
売却・購入・投資の判断は専門の不動産会社にご相談ください。
