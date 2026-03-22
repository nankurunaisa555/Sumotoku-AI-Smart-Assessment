'use client';

import React from 'react';
import { PropertyType, Step1Data, MansionFields, HouseFields, LandFields } from '@/types';
import { LAYOUTS, ZONING_OPTIONS } from '@/lib/constants';

interface Step1Props {
  propertyType: PropertyType;
  data: Step1Data;
  onChange: (data: Step1Data) => void;
}

export default function Step1Form({ propertyType, data, onChange }: Step1Props) {
  const update = (field: string, value: string) => {
    onChange({ ...data, [field]: value } as Step1Data);
  };

  return (
    <div className="fade-in">
      {/* Address - common to all */}
      <div className="form-group">
        <label className="form-label">
          住所<span className="required">必須</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="例：東京都新宿区西新宿1-1-1"
          value={(data as MansionFields).address || ''}
          onChange={(e) => update('address', e.target.value)}
        />
      </div>

      {propertyType === 'mansion' && (
        <>
          <div className="form-group">
            <label className="form-label">
              専有面積<span className="required">必須</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="70"
                value={(data as MansionFields).exclusiveArea || ''}
                onChange={(e) => update('exclusiveArea', e.target.value)}
              />
              <span className="form-unit">㎡</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              所在階<span className="required">必須</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="5"
                value={(data as MansionFields).floor || ''}
                onChange={(e) => update('floor', e.target.value)}
              />
              <span className="form-unit">階</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              築年数<span className="required">必須</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="10"
                value={(data as MansionFields).buildingAge || ''}
                onChange={(e) => update('buildingAge', e.target.value)}
              />
              <span className="form-unit">年</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              間取り<span className="required">必須</span>
            </label>
            <select
              className="form-select"
              value={(data as MansionFields).layout || ''}
              onChange={(e) => update('layout', e.target.value)}
            >
              <option value="">選択してください</option>
              {LAYOUTS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              総戸数<span className="optional">任意</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="100"
                value={(data as MansionFields).totalUnits || ''}
                onChange={(e) => update('totalUnits', e.target.value)}
              />
              <span className="form-unit">戸</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              最寄駅からの徒歩分数<span className="required">必須</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="10"
                value={(data as MansionFields).walkMinutes || ''}
                onChange={(e) => update('walkMinutes', e.target.value)}
              />
              <span className="form-unit">分</span>
            </div>
          </div>
        </>
      )}

      {propertyType === 'house' && (
        <>
          <div className="form-group">
            <label className="form-label">
              建物面積<span className="required">必須</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="100"
                value={(data as HouseFields).buildingArea || ''}
                onChange={(e) => update('buildingArea', e.target.value)}
              />
              <span className="form-unit">㎡</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              土地面積<span className="required">必須</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="120"
                value={(data as HouseFields).landArea || ''}
                onChange={(e) => update('landArea', e.target.value)}
              />
              <span className="form-unit">㎡</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              築年数<span className="required">必須</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="15"
                value={(data as HouseFields).buildingAge || ''}
                onChange={(e) => update('buildingAge', e.target.value)}
              />
              <span className="form-unit">年</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              階建て<span className="required">必須</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="2"
                value={(data as HouseFields).stories || ''}
                onChange={(e) => update('stories', e.target.value)}
              />
              <span className="form-unit">階建て</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              間取り<span className="required">必須</span>
            </label>
            <select
              className="form-select"
              value={(data as HouseFields).layout || ''}
              onChange={(e) => update('layout', e.target.value)}
            >
              <option value="">選択してください</option>
              {LAYOUTS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              最寄駅からの徒歩分数<span className="required">必須</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="10"
                value={(data as HouseFields).walkMinutes || ''}
                onChange={(e) => update('walkMinutes', e.target.value)}
              />
              <span className="form-unit">分</span>
            </div>
          </div>
        </>
      )}

      {propertyType === 'land' && (
        <>
          <div className="form-group">
            <label className="form-label">
              土地面積<span className="required">必須</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="150"
                value={(data as LandFields).landArea || ''}
                onChange={(e) => update('landArea', e.target.value)}
              />
              <span className="form-unit">㎡</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              最寄駅からの徒歩分数<span className="required">必須</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="10"
                value={(data as LandFields).walkMinutes || ''}
                onChange={(e) => update('walkMinutes', e.target.value)}
              />
              <span className="form-unit">分</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              用途地域<span className="required">必須</span>
            </label>
            <select
              className="form-select"
              value={(data as LandFields).zoning || ''}
              onChange={(e) => update('zoning', e.target.value)}
            >
              <option value="">選択してください</option>
              {ZONING_OPTIONS.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              建ぺい率<span className="optional">任意</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="60"
                value={(data as LandFields).buildingCoverage || ''}
                onChange={(e) => update('buildingCoverage', e.target.value)}
              />
              <span className="form-unit">%</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              容積率<span className="optional">任意</span>
            </label>
            <div className="form-input-row">
              <input
                type="number"
                className="form-input"
                placeholder="200"
                value={(data as LandFields).floorAreaRatio || ''}
                onChange={(e) => update('floorAreaRatio', e.target.value)}
              />
              <span className="form-unit">%</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
