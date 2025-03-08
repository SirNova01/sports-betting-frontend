import { useEffect } from 'react';
import { SocketService } from '../services/SocketService';

export const useSocketEvent = <T,>(eventName: string, callback: (data: T) => void) => {
  useEffect(() => {
    const socketService = SocketService.getInstance();
    socketService.onEvent<T>(eventName, callback);
  }, [eventName, callback]);
};
