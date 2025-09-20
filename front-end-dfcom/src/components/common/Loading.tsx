import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  className,
  text = 'Carregando...',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-8',
        className,
      )}
    >
      <Loader2
        className={cn('animate-spin text-blue-600', sizeClasses[size])}
      />
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </div>
  )
}

export default Loading
