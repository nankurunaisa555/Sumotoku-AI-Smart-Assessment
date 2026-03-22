'use client';

import React, { useRef } from 'react';
import { PropertyType, Step2Data } from '@/types';
import {
  DIRECTIONS,
  SUNLIGHT_OPTIONS,
  INTERIOR_CONDITIONS,
  EQUIPMENT_GRADES,
  SEISMIC_OPTIONS,
  ENERGY_OPTIONS,
  LAND_SHAPES,
  FRONTAGE_OPTIONS,
  ELEVATION_OPTIONS,
  INFRASTRUCTURE_OPTIONS,
  ROAD_ACCESS_OPTIONS,
} from '@/lib/constants';

interface Step2Props {
  propertyType: PropertyType;
  data: Step2Data;
  onChange: (data: Step2Data) => void;
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="radio-group">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`radio-btn ${value === opt ? 'active' : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function Step2Form({ propertyType, data, onChange }: Step2Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const isBuilding = propertyType === 'mansion' || propertyType === 'house';
  const isLandLike = propertyType === 'house' || propertyType === 'land';

  const update = (field: keyof Step2Data, value: string | null) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('画像は5MB以下にしてください');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      update('viewPhoto', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const photoHint = propertyType === 'land'
    ? '敷地からメインの方角に向けて外を撮影した写真。四方より1〜2枚が査定に活かしやすい'
    : '窓からの眺望やバルコニーからの景色の写真';

  return (
    <div className="fade-in">
      {/* Direction & Sunlight - All */}
      <div className="section-divider">🧭 向き・日当たり</div>

      <div className="form-group">
        <label className="form-label">向き</label>
        <RadioGroup
          options={DIRECTIONS}
          value={data.direction}
          onChange={(v) => update('direction', v)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">日当たり</label>
        <RadioGroup
          options={SUNLIGHT_OPTIONS}
          value={data.sunlight}
          onChange={(v) => update('sunlight', v)}
        />
      </div>

      {/* Interior & Equipment - Building only */}
      {isBuilding && (
        <>
          <div className="section-divider">🏠 室内・設備</div>

          <div className="form-group">
            <label className="form-label">室内状態</label>
            <RadioGroup
              options={INTERIOR_CONDITIONS}
              value={data.interiorCondition}
              onChange={(v) => update('interiorCondition', v)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">設備グレード</label>
            <RadioGroup
              options={EQUIPMENT_GRADES}
              value={data.equipmentGrade}
              onChange={(v) => update('equipmentGrade', v)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              分譲会社・建築会社<span className="optional">任意</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="例：三井不動産レジデンシャル"
              value={data.developer}
              onChange={(e) => update('developer', e.target.value)}
            />
          </div>

          <div className="section-divider">🔧 構造・認定</div>

          <div className="form-group">
            <label className="form-label">耐震・免震構造</label>
            <RadioGroup
              options={SEISMIC_OPTIONS}
              value={data.seismicStructure}
              onChange={(v) => update('seismicStructure', v)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">省エネ・認定住宅</label>
            <RadioGroup
              options={ENERGY_OPTIONS}
              value={data.energyEfficiency}
              onChange={(v) => update('energyEfficiency', v)}
            />
          </div>
        </>
      )}

      {/* Land-related fields */}
      {isLandLike && (
        <>
          <div className="section-divider">📐 土地条件</div>

          <div className="form-group">
            <label className="form-label">土地の形状</label>
            <RadioGroup
              options={LAND_SHAPES}
              value={data.landShape}
              onChange={(v) => update('landShape', v)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">間口の広さ</label>
            <RadioGroup
              options={FRONTAGE_OPTIONS}
              value={data.frontageWidth}
              onChange={(v) => update('frontageWidth', v)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">高低差</label>
            <RadioGroup
              options={ELEVATION_OPTIONS}
              value={data.elevation}
              onChange={(v) => update('elevation', v)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">インフラ（上下水道・ガス）</label>
            <RadioGroup
              options={INFRASTRUCTURE_OPTIONS}
              value={data.infrastructure}
              onChange={(v) => update('infrastructure', v)}
            />
          </div>
        </>
      )}

      {/* Road Access - All */}
      <div className="section-divider">🛣️ 接道状況</div>

      <div className="form-group">
        <label className="form-label">接道状況</label>
        <RadioGroup
          options={ROAD_ACCESS_OPTIONS}
          value={data.roadAccess}
          onChange={(v) => update('roadAccess', v)}
        />
      </div>

      {/* View / Photo - All (optional) */}
      <div className="section-divider">📷 眺望・周辺環境（任意）</div>

      <div className="form-group">
        <label className="form-label">
          眺望写真<span className="optional">任意</span>
        </label>
        {data.viewPhoto ? (
          <div className="photo-preview">
            <img src={data.viewPhoto} alt="眺望写真" />
            <button
              type="button"
              className="photo-remove"
              onClick={() => {
                update('viewPhoto', null);
                if (fileRef.current) fileRef.current.value = '';
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="photo-upload" onClick={() => fileRef.current?.click()}>
            <div className="upload-icon">📷</div>
            <div className="upload-text">タップして写真を選択</div>
            <div className="upload-hint">{photoHint}</div>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handlePhoto}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          眺望・周辺環境の説明<span className="optional">任意</span>
        </label>
        <textarea
          className="form-textarea"
          placeholder="例：南側に公園あり、遠方に山並みが見える。周辺は閑静な住宅街。"
          value={data.viewDescription}
          onChange={(e) => update('viewDescription', e.target.value)}
        />
      </div>
    </div>
  );
}
