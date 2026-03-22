import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'スモトクAIかんたん査定',
  description: 'AIが不動産の査定価格を瞬時に算出。マンション・一戸建て・土地の売却・購入をサポートします。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
