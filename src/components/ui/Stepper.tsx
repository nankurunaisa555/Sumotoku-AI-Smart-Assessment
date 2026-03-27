'use client'

interface StepperProps {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  unit?: string
  label?: string
  id?: string
}

export function Stepper({ value, onChange, min = 0, max = 9999, unit, label, id }: StepperProps) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))

  return (
    <div className="flex items-center gap-0">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label={`${label ?? ''}を1減らす`}
        className="w-12 h-12 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 text-xl font-bold rounded-l-lg border border-gray-300 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        −
      </button>
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10)
          if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)))
        }}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        role="spinbutton"
        className="w-20 h-12 text-center text-base font-medium border-y border-gray-300 tabular-nums focus:outline-none focus:ring-2 focus:ring-secondary-500"
      />
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label={`${label ?? ''}を1増やす`}
        className="w-12 h-12 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 text-xl font-bold rounded-r-lg border border-gray-300 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        +
      </button>
      {unit && <span className="ml-2 text-sm text-gray-600">{unit}</span>}
    </div>
  )
}
