interface StepIndicatorProps {
  currentStep: number // 1-based
  steps: string[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, i) => {
        const stepNum = i + 1
        const isDone = stepNum < currentStep
        const isCurrent = stepNum === currentStep
        return (
          <div key={stepNum} className="flex items-center flex-1">
            <div className="flex items-center shrink-0">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${isDone ? 'bg-secondary-500 text-white' : ''}
                  ${isCurrent ? 'bg-secondary-500 text-white ring-4 ring-secondary-100' : ''}
                  ${!isDone && !isCurrent ? 'bg-gray-200 text-gray-500' : ''}
                `}
              >
                {isDone ? '✓' : stepNum}
              </div>
              <span
                className={`ml-2 text-sm whitespace-nowrap ${
                  isCurrent ? 'font-bold text-secondary-700' : isDone ? 'font-medium text-secondary-700' : 'text-gray-500'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 ${isDone ? 'bg-secondary-500' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
