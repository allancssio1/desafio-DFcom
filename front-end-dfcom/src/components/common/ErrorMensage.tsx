import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
  className?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Ops! Algo deu errado',
  message,
  onRetry,
  className,
}) => {
  return (
    <div className={`py-8 ${className}`}>
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="mt-2">
          <div className="font-semibold mb-1">{title}</div>
          <div className="text-sm text-slate-600 mb-3">{message}</div>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Tentar novamente</span>
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default ErrorMessage
