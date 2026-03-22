export const LAYOUTS = [
  '1R', '1K', '1DK', '1LDK',
  '2K', '2DK', '2LDK',
  '3K', '3DK', '3LDK',
  '4K', '4DK', '4LDK',
  '5LDK以上',
];

export const DIRECTIONS = [
  '北', '北東', '東', '南東', '南', '南西', '西', '北西',
];

export const SUNLIGHT_OPTIONS = [
  '良好（日中ほぼ日当たりあり）',
  '普通（午前or午後のみ）',
  'やや悪い（隣接建物の影響あり）',
  '不良（ほぼ日が入らない）',
];

export const INTERIOR_CONDITIONS = [
  '新築・未入居',
  '美品（ハウスクリーニング程度でOK）',
  '普通（生活感あるが大きな傷みなし）',
  '要補修（壁紙剥がれ・水回り劣化等）',
  '大規模修繕必要',
];

export const EQUIPMENT_GRADES = [
  'ハイグレード（食洗機・床暖房・浴室乾燥等完備）',
  'スタンダード（一般的な設備）',
  'ローグレード（最低限の設備）',
  '不明',
];

export const SEISMIC_OPTIONS = [
  '免震構造',
  '制震構造',
  '耐震等級3',
  '不明',
];

export const ENERGY_OPTIONS = [
  'ZEH（ゼッチ）認定',
  '長期優良住宅',
  '低炭素住宅',
  '省エネ基準適合',
  '該当なし・不明',
];

export const LAND_SHAPES = [
  '整形地（長方形・正方形）',
  'ほぼ整形',
  '不整形（旗竿地・三角地等）',
];

export const FRONTAGE_OPTIONS = [
  '広い（6m以上）',
  '普通（4〜6m）',
  '狭い（4m未満）',
];

export const ELEVATION_OPTIONS = [
  '平坦',
  'やや高い（道路より＋1m程度）',
  '高い（道路より＋2m以上）',
  '低い（道路より低い）',
];

export const INFRASTRUCTURE_OPTIONS = [
  '上下水道・都市ガス完備',
  '上下水道のみ（プロパンガス）',
  '上水道のみ（浄化槽）',
  'インフラ未整備あり',
];

export const ROAD_ACCESS_OPTIONS = [
  '公道に2面以上接道',
  '公道に1面接道（幅員6m以上）',
  '公道に1面接道（幅員4〜6m）',
  '私道のみ',
  'セットバック必要',
];

export const ZONING_OPTIONS = [
  '第一種低層住居専用地域',
  '第二種低層住居専用地域',
  '第一種中高層住居専用地域',
  '第二種中高層住居専用地域',
  '第一種住居地域',
  '第二種住居地域',
  '準住居地域',
  '近隣商業地域',
  '商業地域',
  '準工業地域',
  '工業地域',
  '工業専用地域',
  '不明',
];
