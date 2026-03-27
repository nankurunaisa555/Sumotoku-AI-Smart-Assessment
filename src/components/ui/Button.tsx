import { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'line'
type Size = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
  fullWidth?: boolean
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white shadow-md hover:shadow-lg',
  secondary:
    'bg-secondary-50 hover:bg-secondary-100 active:bg-secondary-200 text-secondary-700 border border-secondary-200',
  ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
  line: 'bg-[#06C755] hover:bg-[#05b34d] text-white shadow-md hover:shadow-lg',
}

const sizeClasses: Record<Size, string> = {
  sm: 'py-1.5 px-3 text-sm rounded-md min-h-[36px]',
  md: 'py-2.5 px-5 text-base rounded-lg min-h-[44px]',
  lg: 'py-3.5 px-7 text-lg rounded-lg min-h-[52px]',
  xl: 'py-4 px-8 text-lg rounded-xl min-h-[56px]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-bold
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}
