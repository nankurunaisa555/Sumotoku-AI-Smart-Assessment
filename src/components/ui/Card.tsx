import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  accent?: boolean
  warning?: boolean
  hover?: boolean
}

export function Card({ children, className = '', accent = false, warning = false, hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-md p-6 border border-gray-100
        ${accent ? 'border-l-4 border-l-primary-500' : ''}
        ${warning ? 'bg-warning-50 border border-warning-500/20' : ''}
        ${hover ? 'hover:shadow-lg transition-shadow duration-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
