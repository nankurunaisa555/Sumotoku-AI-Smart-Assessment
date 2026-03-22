'use client';

import React from 'react';
import { AssessmentResult, PropertyType } from '@/types';

interface ResultProps {
  result: AssessmentResult;
  propertyType: PropertyType;
}

function Stars({ count }: { count: number }) {
  return (
    <span className="factor-stars">
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  );
}

function formatPrice(n: number): string {
  if (n >= 10000) {
    return `${(n / 10000).toFixed(n % 10000 === 0 ? 0 : 1)}億`;
  }
  return `${n.toLocaleString()}`;
}

export default function Step3Result({ result, propertyType }: ResultProps) {
  const { patterns, factors, aiComment } = result;
  const isLand = propertyType === 'land';

  return (
    <div className="fade-in">
      {/* Patterns */}
      <div className="result-section">
        <div className="result-title">
          {isLand ? '📊 査定結果' : '📊 3パターン比較'}
        </div>
        {patterns.map((p, i) => (
          <div key={i} className={`pattern-card ${p.isBestValue ? 'best' : ''}`}>
            <div className="pattern-header">
              <span className="pattern-label">{p.label}</span>
              {p.isBestValue && <span className="badge-best">コスパ最良</span>}
            </div>
            <div className="pattern-tag">{p.tag}</div>

            <div className="price-range">
              <div>
                <span className="price-median">{formatPrice(p.priceMedian)}</span>
                <span className="price-unit">万円</span>
              </div>
              <div className="price-minmax">
                {formatPrice(p.priceMin)}万円 〜 {formatPrice(p.priceMax)}万円
              </div>
            </div>

            {!isLand && (
              <div className="pattern-details">
                <div>
                  <dt>リフォーム費用目安</dt>
                  <dd>{p.costEstimate > 0 ? `${p.costEstimate.toLocaleString()}万円` : '—'}</dd>
                </div>
                <div>
                  <dt>手取り増減</dt>
                  <dd>{p.netGainDiff}</dd>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Influence Factors */}
      <div className="result-section">
        <div className="result-title">⭐ 影響要因</div>
        {factors.map((f, i) => (
          <div key={i} className="factor-item">
            <span className="factor-name">{f.name}</span>
            <Stars count={f.stars} />
            <span className="factor-desc">{f.description}</span>
          </div>
        ))}
      </div>

      {/* AI Comment */}
      <div className="result-section">
        <div className="result-title">🤖 AI解説</div>
        <div className="ai-comment">
          <div className="ai-comment-header">スモトクAIの分析</div>
          {aiComment}
        </div>
      </div>

      {/* CTAs */}
      <div className="result-section">
        <a
          href="https://lin.ee/sxqwX2tL"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-line"
        >
          💬 LINEで無料相談する
        </a>
        <a
          href="https://fudousan-tools.info"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-link"
        >
          🏠 スモエクで詳しく調べる
        </a>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer">
        ※ 本査定結果はAIによる参考価格であり、実際の取引価格を保証するものではありません。
        正確な査定には、不動産会社による現地調査が必要です。
        本サービスの利用により生じた損害について、当社は一切の責任を負いません。
        査定結果は市場動向や個別条件により変動する可能性があります。
      </div>
    </div>
  );
}
