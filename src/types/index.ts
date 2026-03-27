// 物件種別
export type PropertyType = 'mansion' | 'house' | 'land'

// 間取り
export type Layout =
  | '1R' | '1K' | '1DK' | '1LDK'
  | '2K' | '2DK' | '2LDK'
  | '3K' | '3DK' | '3LDK'
  | '4LDK' | '5LDK以上'

// 接道状況
export type RoadAccess = 'single' | 'corner' | 'two_sides' | 'three_sides' | 'flag'

// 耐震・構造
export type SeismicStandard = 'unknown' | 'new' | 'old' | 'seismic_isolation' | 'vibration_control'

// リフォーム状況
export type RenovationType = 'none' | 'partial' | 'full' | 'renovation'

// 築年数入力モード
export type BuildingAgeMode = 'direct' | 'western' | 'japanese'

// 和暦
export type JapaneseEra = 'reiwa' | 'heisei' | 'showa' | 'taisho'

// 住所
export interface Address {
  postalCode: string
  prefecture: string
  city: string
  town: string
  detail: string
  building: string
}

// 物件情報
export interface PropertyInfo {
  type: PropertyType
  exclusiveArea: number
  landArea: number
  layout: Layout | ''
  buildingAge: number
  floor: number
  totalFloors: number
  orientation: string[]
  roadAccess: RoadAccess | ''
  stationDistance: number
  stationName: string
  seismicStandard: SeismicStandard | ''
  renovation: RenovationType | ''
}

// 追加情報
export interface AdditionalInfo {
  url: string
  transactionExamples: string
}

// フォーム全体のステート
export interface FormState {
  address: Address
  property: PropertyInfo
  additional: AdditionalInfo
}

// 査定リクエスト
export interface AssessRequest {
  address: Address
  property: PropertyInfo
  additionalInfo: AdditionalInfo
}

// 参考事例
export interface ReferenceItem {
  location: string
  date: string
  price: number
  area: number
  source: string
}

// レーダーチャートスコア
export interface RadarScores {
  priceFairness: number
  sellability: number
  sunlightView: number
  maintenance: number
  incentives: number
  overall: number
}

// 手取額内訳
export interface NetProceedsBreakdown {
  brokerageFee: number
  stampDuty: number
  otherCosts: number
}

// 査定結果
export interface AssessResult {
  priceRange: {
    low: number
    mid: number
    high: number
    sellingEstimate: { low: number; high: number }
  }
  commentary: string
  radarScores: RadarScores
  references: ReferenceItem[]
  yieldEstimate: {
    annualRent: number
    grossYield: number
    disclaimer: string
  }
  plusPoints: string[]
  cautionPoints: string[]
  netProceeds: {
    estimate: number
    breakdown: NetProceedsBreakdown
  }
}

// アプリのステップ
export type AppStep = 'input' | 'loading' | 'result'
