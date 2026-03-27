'use client'

import { useState } from 'react'
import { useAssessment } from '@/hooks/useAssessment'
import { useIframeResize } from '@/hooks/useIframeResize'
import { StepIndicator } from '@/components/layout/StepIndicator'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { AddressInput } from '@/components/form/AddressInput'
import { PropertyForm } from '@/components/form/PropertyForm'
import { UrlInput } from '@/components/form/UrlInput'
import { PriceRange } from '@/components/result/PriceRange'
import { Commentary } from '@/components/result/Commentary'
import { RadarChart } from '@/components/result/RadarChart'
import { ReferenceTable } from '@/components/result/ReferenceTable'
import { YieldEstimate } from '@/components/result/YieldEstimate'
import { PlusCaution } from '@/components/result/PlusCaution'
import { NetProceeds } from '@/components/result/NetProceeds'
import { LineCtaButton } from '@/components/result/LineCtaButton'
import { CopyExport } from '@/components/result/CopyExport'
import { Disclaimer } from '@/components/ui/Disclaimer'
import { Button } from '@/components/ui/Button'
import type { Address, PropertyInfo, AdditionalInfo, AppStep } from '@/types'

const STEPS = ['基本情報', '詳細入力', '査定結果']

const DEFAULT_ADDRESS: Address = {
  postalCode: '',
  prefecture: '',
  city: '',
  town: '',
  detail: '',
  building: '',
}

const DEFAULT_PROPERTY: PropertyInfo = {
  type: 'mansion',
  exclusiveArea: 70,
  landArea: 100,
  layout: '',
  buildingAge: 10,
  floor: 3,
  totalFloors: 10,
  orientation: [],
  roadAccess: '',
  stationDistance: 10,
  stationName: '',
  seismicStandard: '',
  renovation: '',
}

const DEFAULT_ADDITIONAL: AdditionalInfo = {
  url: '',
  transactionExamples: '',
}

type InputMode = 'manual' | 'url'

export default function Home() {
  useIframeResize()

  const [appStep, setAppStep] = useState<AppStep>('input')
  const [formStep, setFormStep] = useState(1) // 1 or 2
  const [inputMode, setInputMode] = useState<InputMode>('manual')
  const [address, setAddress] = useState<Address>(DEFAULT_ADDRESS)
  const [property, setProperty] = useState<PropertyInfo>(DEFAULT_PROPERTY)
  const [additional, setAdditional] = useState<AdditionalInfo>(DEFAULT_ADDITIONAL)
  const [validationError, setValidationError] = useState<string | null>(null)

  const { result, loading, error, assess, reset } = useAssessment()

  // URL解析結果を各フィールドにマージ
  const handleUrlExtracted = (partial: Partial<PropertyInfo> & { prefecture?: string; city?: string }) => {
    const { prefecture, city, ...propPartial } = partial
    if (prefecture) setAddress((a) => ({ ...a, prefecture }))
    if (city) setAddress((a) => ({ ...a, city }))
    setProperty((p) => ({
      ...p,
      ...(propPartial.exclusiveArea !== null && propPartial.exclusiveArea !== undefined ? { exclusiveArea: propPartial.exclusiveArea } : {}),
      ...(propPartial.landArea !== null && propPartial.landArea !== undefined ? { landArea: propPartial.landArea } : {}),
      ...(propPartial.layout ? { layout: propPartial.layout } : {}),
      ...(propPartial.buildingAge !== null && propPartial.buildingAge !== undefined ? { buildingAge: propPartial.buildingAge } : {}),
      ...(propPartial.floor !== null && propPartial.floor !== undefined ? { floor: propPartial.floor } : {}),
      ...(propPartial.totalFloors !== null && propPartial.totalFloors !== undefined ? { totalFloors: propPartial.totalFloors } : {}),
      ...(propPartial.stationName ? { stationName: propPartial.stationName } : {}),
      ...(propPartial.stationDistance !== null && propPartial.stationDistance !== undefined ? { stationDistance: propPartial.stationDistance } : {}),
    }))
    // URLで情報取得したら手動入力モードに切り替えて確認させる
    setInputMode('manual')
  }

  // ステップ1のバリデーション
  const validateStep1 = (): boolean => {
    if (!address.prefecture) {
      setValidationError('都道府県を選択してください')
      return false
    }
    if (!address.city) {
      setValidationError('市区町村を入力してください')
      return false
    }
    if (!property.type) {
      setValidationError('物件種別を選択してください')
      return false
    }
    setValidationError(null)
    return true
  }

  const handleNext = () => {
    if (validateStep1()) setFormStep(2)
  }

  const handleBack = () => {
    if (formStep === 2) setFormStep(1)
    else {
      setAppStep('input')
      reset()
    }
  }

  const handleAssess = async () => {
    if (!address.prefecture || !property.type) {
      setValidationError('必須項目を入力してください')
      return
    }
    setAppStep('loading')
    await assess({ address, property, additionalInfo: additional })
    setAppStep('result')
  }

  const handleReset = () => {
    reset()
    setAppStep('input')
    setFormStep(1)
    setAddress(DEFAULT_ADDRESS)
    setProperty(DEFAULT_PROPERTY)
    setAdditional(DEFAULT_ADDITIONAL)
    setValidationError(null)
  }

  // ローディング画面
  if (appStep === 'loading' || loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <Header />
          <div className="bg-white rounded-2xl shadow-md">
            <LoadingScreen />
          </div>
        </div>
      </main>
    )
  }

  // 結果画面
  if (appStep === 'result' && result) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <Header />
          <StepIndicator currentStep={3} steps={STEPS} />

          <div className="space-y-6">
            {/* LINE CTAを最上部に */}
            <LineCtaButton />

            {/* 価格レンジ */}
            <PriceRange priceRange={result.priceRange} />

            {/* AI解説 */}
            <Commentary text={result.commentary} />

            {/* レーダーチャート */}
            <RadarChart scores={result.radarScores} />

            {/* プラス・注意 */}
            <PlusCaution plusPoints={result.plusPoints} cautionPoints={result.cautionPoints} />

            {/* 利回り + 手取額 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <YieldEstimate yieldEstimate={result.yieldEstimate} />
              <NetProceeds netProceeds={result.netProceeds} />
            </div>

            {/* 参考事例 */}
            <ReferenceTable references={result.references} />

            {/* コピー・共有 */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-base font-bold text-gray-800 mb-3">結果を保存・共有</h3>
              <CopyExport result={result} />
            </div>

            {/* 免責 */}
            <Disclaimer />

            {/* 再査定ボタン */}
            <div className="text-center pt-4 pb-8">
              <Button variant="ghost" onClick={handleReset}>
                🔄 別の物件を査定する
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // エラー表示（result画面でAPIエラー）
  if (appStep === 'result' && error) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <Header />
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <p className="text-4xl mb-4">😔</p>
            <p className="text-lg font-bold text-gray-800 mb-2">査定の取得に失敗しました</p>
            <p className="text-sm text-gray-600 mb-6">{error}</p>
            <div className="flex gap-3 justify-center">
              <Button variant="primary" onClick={handleAssess}>
                🔄 再試行
              </Button>
              <Button variant="ghost" onClick={handleReset}>
                入力に戻る
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // 入力画面
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Header />
        <StepIndicator currentStep={formStep} steps={STEPS} />

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* ステップ1: 基本情報 */}
          {formStep === 1 && (
            <div className="p-6 sm:p-8 space-y-8">
              {/* 入力モード切替 */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">入力方法を選択</p>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
                  <button
                    type="button"
                    onClick={() => setInputMode('manual')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      inputMode === 'manual'
                        ? 'bg-white shadow-sm text-gray-900 font-bold'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    ✍️ 手入力
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode('url')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      inputMode === 'url'
                        ? 'bg-white shadow-sm text-gray-900 font-bold'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    🔗 URL自動取得
                  </button>
                </div>
              </div>

              {/* URL入力モード */}
              {inputMode === 'url' && (
                <div className="bg-secondary-50 rounded-xl p-4 border border-secondary-200">
                  <UrlInput onExtracted={handleUrlExtracted} />
                </div>
              )}

              {/* 住所入力 */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  📍 所在地
                </h2>
                <AddressInput value={address} onChange={setAddress} />
              </div>

              {/* 物件基本情報 */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  🏠 物件基本情報
                </h2>
                <PropertyForm value={property} onChange={setProperty} />
              </div>

              {/* バリデーションエラー */}
              {validationError && (
                <div className="bg-error-50 border border-error-500/30 rounded-lg px-4 py-3">
                  <p className="text-sm text-error-500 flex items-center gap-2">
                    <span>⚠️</span> {validationError}
                  </p>
                </div>
              )}

              {/* ナビゲーション */}
              <div className="flex justify-end pt-2">
                <Button variant="primary" size="lg" onClick={handleNext}>
                  次へ（詳細情報）→
                </Button>
              </div>
            </div>
          )}

          {/* ステップ2: 詳細情報 */}
          {formStep === 2 && (
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">詳細・任意情報</h2>
                <p className="text-sm text-gray-500">
                  入力するほど精度が上がりますが、すべて任意です。
                </p>
              </div>

              {/* 近隣成約事例 */}
              <div className="space-y-2">
                <label htmlFor="transaction-examples" className="block text-sm font-medium text-gray-700">
                  近隣の成約事例・参考情報
                  <span className="ml-1 text-xs text-gray-400 font-normal">（任意）</span>
                </label>
                <textarea
                  id="transaction-examples"
                  rows={4}
                  placeholder="例：近くの○○マンション3LDK・68㎡が先月3,200万円で成約したと聞いています。築15年で8階です。"
                  value={additional.transactionExamples}
                  onChange={(e) => setAdditional({ ...additional, transactionExamples: e.target.value })}
                  className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 resize-none leading-relaxed"
                />
                <p className="text-xs text-gray-500">
                  ご存知の近隣成約情報があれば入力してください。査定精度が向上します。
                </p>
              </div>

              {/* 免責事項 */}
              <Disclaimer />

              {/* バリデーションエラー */}
              {validationError && (
                <div className="bg-error-50 border border-error-500/30 rounded-lg px-4 py-3">
                  <p className="text-sm text-error-500 flex items-center gap-2">
                    <span>⚠️</span> {validationError}
                  </p>
                </div>
              )}

              {/* ナビゲーション */}
              <div className="flex justify-between items-center pt-2">
                <Button variant="ghost" size="md" onClick={handleBack}>
                  ← 戻る
                </Button>
                <Button
                  variant="primary"
                  size="xl"
                  onClick={handleAssess}
                  loading={loading}
                >
                  🤖 AI査定を実行する
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* フッター */}
        <footer className="mt-8 text-center text-xs text-gray-400 pb-8">
          <p>LivingHacks AI不動産概算シミュレーター</p>
          <p className="mt-1">本ツールの結果は参考情報です。投資・取引の判断は専門家にご相談ください。</p>
        </footer>
      </div>
    </main>
  )
}

function Header() {
  return (
    <div className="mb-8 text-center">
      <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
        🏡 完全無料・登録不要
      </div>
      <h1 className="text-3xl font-bold text-gray-900 leading-snug tracking-tight mb-2">
        AI不動産<span className="text-primary-500">概算</span>シミュレーター
      </h1>
      <p className="text-sm text-gray-500">
        物件情報を入力するだけで、AIが概算価格と詳細分析を即座に提供します
      </p>
    </div>
  )
}
