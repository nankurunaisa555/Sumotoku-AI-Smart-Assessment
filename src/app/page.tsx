'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Mode,
  PropertyType,
  Step1Data,
  Step2Data,
  MansionFields,
  HouseFields,
  LandFields,
  AssessmentResult,
} from '@/types';
import Step1Form from '@/components/Step1Form';
import Step2Form from '@/components/Step2Form';
import Step3Result from '@/components/Step3Result';

const defaultMansion: MansionFields = {
  address: '', exclusiveArea: '', floor: '', buildingAge: '',
  layout: '', totalUnits: '', walkMinutes: '',
};

const defaultHouse: HouseFields = {
  address: '', buildingArea: '', landArea: '', buildingAge: '',
  stories: '', layout: '', walkMinutes: '',
};

const defaultLand: LandFields = {
  address: '', landArea: '', walkMinutes: '',
  zoning: '', buildingCoverage: '', floorAreaRatio: '',
};

const defaultStep2: Step2Data = {
  direction: '', sunlight: '', interiorCondition: '', equipmentGrade: '',
  developer: '', seismicStructure: '', energyEfficiency: '', landShape: '',
  frontageWidth: '', elevation: '', infrastructure: '', roadAccess: '',
  viewDescription: '', viewPhoto: null,
};

function getDefaultStep1(type: PropertyType): Step1Data {
  switch (type) {
    case 'mansion': return { ...defaultMansion };
    case 'house': return { ...defaultHouse };
    case 'land': return { ...defaultLand };
  }
}

function AssessmentApp() {
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<Mode>('sell');
  const [propertyType, setPropertyType] = useState<PropertyType>('mansion');
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data>(getDefaultStep1('mansion'));
  const [step2Data, setStep2Data] = useState<Step2Data>({ ...defaultStep2 });
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // URL params initialization
  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'buy') setMode('buy');
    else if (modeParam === 'sell') setMode('sell');

    const typeParam = searchParams.get('type');
    let pType: PropertyType = 'mansion';
    if (typeParam === 'house') pType = 'house';
    else if (typeParam === 'land') pType = 'land';
    else if (typeParam === 'mansion') pType = 'mansion';
    setPropertyType(pType);

    const newStep1 = getDefaultStep1(pType);

    // Map URL params to step1 fields
    const area = searchParams.get('area');
    const station = searchParams.get('station');
    const walk = searchParams.get('walk');

    if (area) {
      (newStep1 as MansionFields).address = area;
    }
    if (station && area) {
      (newStep1 as MansionFields).address = `${area}（${station}）`;
    }
    if (walk) {
      if ('walkMinutes' in newStep1) {
        (newStep1 as MansionFields).walkMinutes = walk;
      }
    }

    // Map type-specific params
    const exclusiveArea = searchParams.get('exclusiveArea');
    const floor = searchParams.get('floor');
    const buildingAge = searchParams.get('buildingAge');
    const layout = searchParams.get('layout');
    const totalUnits = searchParams.get('totalUnits');
    const buildingArea = searchParams.get('buildingArea');
    const landArea = searchParams.get('landArea');
    const stories = searchParams.get('stories');
    const zoning = searchParams.get('zoning');
    const buildingCoverage = searchParams.get('buildingCoverage');
    const floorAreaRatio = searchParams.get('floorAreaRatio');

    if (pType === 'mansion') {
      const m = newStep1 as MansionFields;
      if (exclusiveArea) m.exclusiveArea = exclusiveArea;
      if (floor) m.floor = floor;
      if (buildingAge) m.buildingAge = buildingAge;
      if (layout) m.layout = layout;
      if (totalUnits) m.totalUnits = totalUnits;
    } else if (pType === 'house') {
      const h = newStep1 as HouseFields;
      if (buildingArea) h.buildingArea = buildingArea;
      if (landArea) h.landArea = landArea;
      if (buildingAge) h.buildingAge = buildingAge;
      if (stories) h.stories = stories;
      if (layout) h.layout = layout;
    } else if (pType === 'land') {
      const l = newStep1 as LandFields;
      if (landArea) l.landArea = landArea;
      if (zoning) l.zoning = zoning;
      if (buildingCoverage) l.buildingCoverage = buildingCoverage;
      if (floorAreaRatio) l.floorAreaRatio = floorAreaRatio;
    }

    setStep1Data(newStep1);
  }, [searchParams]);

  const handlePropertyTypeChange = useCallback((type: PropertyType) => {
    setPropertyType(type);
    setStep1Data(getDefaultStep1(type));
    setStep2Data({ ...defaultStep2 });
    setResult(null);
    setStep(1);
  }, []);

  const canProceedStep1 = (): boolean => {
    if (propertyType === 'mansion') {
      const d = step1Data as MansionFields;
      return !!(d.address && d.exclusiveArea && d.floor && d.buildingAge && d.layout && d.walkMinutes);
    }
    if (propertyType === 'house') {
      const d = step1Data as HouseFields;
      return !!(d.address && d.buildingArea && d.landArea && d.buildingAge && d.stories && d.layout && d.walkMinutes);
    }
    const d = step1Data as LandFields;
    return !!(d.address && d.landArea && d.walkMinutes && d.zoning);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setStep(3);

    try {
      const res = await fetch('/api/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          propertyType,
          step1: step1Data,
          step2: step2Data,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || '査定に失敗しました');
      }

      const data: AssessmentResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '査定に失敗しました。再度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
    setError('');
  };

  const typeOptions: { type: PropertyType; icon: string; label: string }[] = [
    { type: 'mansion', icon: '🏢', label: 'マンション' },
    { type: 'house', icon: '🏠', label: '一戸建て' },
    { type: 'land', icon: '🏞️', label: '土地' },
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <div className="app-header">
        <div className="app-logo">
          スモトクAI<span>かんたん査定</span>
        </div>
        <div className="app-subtitle">AIが不動産の査定価格を瞬時に算出</div>
      </div>

      {/* Mode Tabs */}
      <div className="mode-tabs">
        <button
          className={`mode-tab ${mode === 'sell' ? 'active' : ''}`}
          onClick={() => { setMode('sell'); handleReset(); }}
        >
          売却査定
        </button>
        <button
          className={`mode-tab ${mode === 'buy' ? 'active' : ''}`}
          onClick={() => { setMode('buy'); handleReset(); }}
        >
          購入査定
        </button>
      </div>

      {/* Stepper */}
      <div className="stepper">
        <div className="step-item">
          <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
          <span className={`step-label ${step === 1 ? 'active' : ''}`}>基本情報</span>
        </div>
        <div className={`step-connector ${step >= 2 ? 'done' : ''}`} />
        <div className="step-item">
          <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
          <span className={`step-label ${step === 2 ? 'active' : ''}`}>詳細情報</span>
        </div>
        <div className={`step-connector ${step >= 3 ? 'done' : ''}`} />
        <div className="step-item">
          <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
          <span className={`step-label ${step === 3 ? 'active' : ''}`}>結果</span>
        </div>
      </div>

      {/* Property Type Selector - only on step 1 */}
      {step === 1 && (
        <div className="property-type-selector">
          {typeOptions.map((opt) => (
            <button
              key={opt.type}
              className={`property-type-btn ${propertyType === opt.type ? 'active' : ''}`}
              onClick={() => handlePropertyTypeChange(opt.type)}
            >
              <span className="icon">{opt.icon}</span>
              <span className="label">{opt.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Step Content */}
      {step === 1 && (
        <>
          <Step1Form
            propertyType={propertyType}
            data={step1Data}
            onChange={setStep1Data}
          />
          <div style={{ marginTop: 24 }}>
            <button
              className="btn-primary"
              disabled={!canProceedStep1()}
              onClick={() => { setStep(2); window.scrollTo(0, 0); }}
            >
              次へ → 詳細情報の入力
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <Step2Form
            propertyType={propertyType}
            data={step2Data}
            onChange={setStep2Data}
          />
          <div className="btn-row">
            <button
              className="btn-secondary"
              onClick={() => { setStep(1); window.scrollTo(0, 0); }}
            >
              ← 戻る
            </button>
            <button
              className="btn-primary"
              onClick={() => { handleSubmit(); window.scrollTo(0, 0); }}
            >
              🔍 AI査定を実行
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          {loading && (
            <div className="loading-overlay">
              <div className="loading-spinner" />
              <div className="loading-text">AIが査定中です...</div>
              <div className="loading-sub">物件情報を分析しています（10〜20秒）</div>
            </div>
          )}

          {error && (
            <div>
              <div className="error-box">{error}</div>
              <button className="btn-secondary" onClick={handleReset}>
                最初からやり直す
              </button>
            </div>
          )}

          {result && !loading && (
            <>
              <Step3Result result={result} propertyType={propertyType} />
              <div style={{ marginTop: 16 }}>
                <button className="btn-secondary" onClick={handleReset}>
                  🔄 別の物件を査定する
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="app-container">
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      </div>
    }>
      <AssessmentApp />
    </Suspense>
  );
}
