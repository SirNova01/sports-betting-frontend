import { useEffect } from 'react';
import { SocketService } from '../services/SocketService';

export const useSocket = (serverUrl: string) => {
  useEffect(() => {
    const socketService = SocketService.getInstance();
    socketService.connect(serverUrl);

    // Cleanup on unmount
    return () => {
      socketService.disconnect();
    };
  }, [serverUrl]);
};
