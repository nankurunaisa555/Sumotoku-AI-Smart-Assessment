import type { Layout, PropertyType, RoadAccess, SeismicStandard, RenovationType, JapaneseEra } from '@/types'

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'mansion', label: 'マンション' },
  { value: 'house', label: '戸建て' },
  { value: 'land', label: '土地' },
]

export const LAYOUTS: { value: Layout; label: string }[] = [
  { value: '1R', label: '1R' },
  { value: '1K', label: '1K' },
  { value: '1DK', label: '1DK' },
  { value: '1LDK', label: '1LDK' },
  { value: '2K', label: '2K' },
  { value: '2DK', label: '2DK' },
  { value: '2LDK', label: '2LDK' },
  { value: '3K', label: '3K' },
  { value: '3DK', label: '3DK' },
  { value: '3LDK', label: '3LDK' },
  { value: '4LDK', label: '4LDK' },
  { value: '5LDK以上', label: '5LDK以上' },
]

export const ROAD_ACCESS_OPTIONS: { value: RoadAccess; label: string }[] = [
  { value: 'single', label: '一方道路' },
  { value: 'corner', label: '角地' },
  { value: 'two_sides', label: '二方角' },
  { value: 'three_sides', label: '三方角' },
  { value: 'flag', label: '旗竿地' },
]

export const SEISMIC_OPTIONS: { value: SeismicStandard; label: string }[] = [
  { value: 'unknown', label: '該当なし・不明' },
  { value: 'new', label: '新耐震基準' },
  { value: 'old', label: '旧耐震基準' },
  { value: 'seismic_isolation', label: '免震構造' },
  { value: 'vibration_control', label: '制震構造' },
]

export const RENOVATION_OPTIONS: { value: RenovationType; label: string }[] = [
  { value: 'none', label: 'なし' },
  { value: 'partial', label: '部分リフォーム済' },
  { value: 'full', label: 'フルリフォーム済' },
  { value: 'renovation', label: 'リノベーション済' },
]

export const ORIENTATIONS = ['北', '北東', '東', '南東', '南', '南西', '西', '北西']

export const JAPANESE_ERAS: { value: JapaneseEra; label: string; startYear: number }[] = [
  { value: 'reiwa', label: '令和', startYear: 2019 },
  { value: 'heisei', label: '平成', startYear: 1989 },
  { value: 'showa', label: '昭和', startYear: 1926 },
  { value: 'taisho', label: '大正', startYear: 1912 },
]

export const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
  '岐阜県', '静岡県', '愛知県', '三重県',
  '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]

export const RADAR_LABELS: { key: string; label: string }[] = [
  { key: 'priceFairness', label: '価格の妥当性' },
  { key: 'sellability', label: '売却しやすさ' },
  { key: 'sunlightView', label: '日当たり・眺望' },
  { key: 'maintenance', label: '維持しやすさ' },
  { key: 'incentives', label: '優遇利用可能性' },
  { key: 'overall', label: '総合おすすめ度' },
]
