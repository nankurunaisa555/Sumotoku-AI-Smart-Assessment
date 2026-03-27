'use client'

interface ChipSelectProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  max?: number
}

export function ChipSelect({ options, selected, onChange, max = 3 }: ChipSelectProps) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt))
    } else if (selected.length < max) {
      onChange([...selected, opt])
    }
  }

  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((opt) => {
        const isSelected = selected.includes(opt)
        const isDisabled = !isSelected && selected.length >= max
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            disabled={isDisabled}
            aria-pressed={isSelected}
            className={`
              py-2 px-4 rounded-full text-sm font-medium transition-all duration-150
              ${isSelected
                ? 'bg-secondary-50 border-2 border-secondary-500 text-secondary-700 shadow-sm font-bold'
                : 'bg-white border border-gray-300 text-gray-600 hover:border-secondary-400 hover:text-secondary-600'
              }
              ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {isSelected ? `${opt} ✓` : opt}
          </button>
        )
      })}
    </div>
  )
}
