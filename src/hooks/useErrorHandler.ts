import { useState, useCallback } from 'react';
import { ErrorLogger } from '../utils/ErrorLogger';

export const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((err: unknown) => {
    let message: string;
    if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }
    setError(message);
    ErrorLogger.log(message);
  }, []);

  return { error, setError, handleError };
};
