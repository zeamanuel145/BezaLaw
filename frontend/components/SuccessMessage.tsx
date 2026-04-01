import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SuccessMessageProps {
  message: string;
  onDismiss: () => void;
  autoHideDuration?: number;
}

export function SuccessMessage({ 
  message, 
  onDismiss, 
  autoHideDuration = 5000 
}: SuccessMessageProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, autoHideDuration);
    return () => clearTimeout(timer);
  }, [onDismiss, autoHideDuration]);

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-green-800">Success</h3>
              <p className="mt-1 text-sm text-green-700">{message}</p>
            </div>
            <button
              onClick={onDismiss}
              className="flex-shrink-0 text-green-400 hover:text-green-500"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
