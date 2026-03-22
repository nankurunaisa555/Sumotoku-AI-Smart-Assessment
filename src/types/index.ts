export type Mode = 'sell' | 'buy';
export type PropertyType = 'mansion' | 'house' | 'land';

export interface MansionFields {
  address: string;
  exclusiveArea: string;
  floor: string;
  buildingAge: string;
  layout: string;
  totalUnits: string;
  walkMinutes: string;
}

export interface HouseFields {
  address: string;
  buildingArea: string;
  landArea: string;
  buildingAge: string;
  stories: string;
  layout: string;
  walkMinutes: string;
}

export interface LandFields {
  address: string;
  landArea: string;
  walkMinutes: string;
  zoning: string;
  buildingCoverage: string;
  floorAreaRatio: string;
}

export type Step1Data = MansionFields | HouseFields | LandFields;

export interface Step2Data {
  direction: string;
  sunlight: string;
  interiorCondition: string;
  equipmentGrade: string;
  developer: string;
  seismicStructure: string;
  energyEfficiency: string;
  landShape: string;
  frontageWidth: string;
  elevation: string;
  infrastructure: string;
  roadAccess: string;
  viewDescription: string;
  viewPhoto: string | null; // base64
}

export interface FormData {
  mode: Mode;
  propertyType: PropertyType;
  step1: Step1Data;
  step2: Step2Data;
}

export interface AssessmentPattern {
  label: string;
  tag: string;
  priceMin: number;
  priceMax: number;
  priceMedian: number;
  costEstimate: number;
  netGainDiff: string;
  isBestValue: boolean;
}

export interface InfluenceFactor {
  name: string;
  stars: number;
  description: string;
}

export interface AssessmentResult {
  patterns: AssessmentPattern[];
  factors: InfluenceFactor[];
  aiComment: string;
}

export interface URLParams {
  mode?: string;
  type?: string;
  area?: string;
  station?: string;
  walk?: string;
  exclusiveArea?: string;
  floor?: string;
  buildingAge?: string;
  layout?: string;
  totalUnits?: string;
  buildingArea?: string;
  landArea?: string;
  stories?: string;
  zoning?: string;
  buildingCoverage?: string;
  floorAreaRatio?: string;
  [key: string]: string | undefined;
}
