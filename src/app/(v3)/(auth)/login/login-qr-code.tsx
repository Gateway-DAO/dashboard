'use client';
import { useEffect, useCallback, useRef, useState } from 'react';

import GtwQRCode from '@/components/gtw-qr/gtw-qr-code';
import { Socket, io } from 'socket.io-client';

export default function LoginQrCode() {
  const socketRef = useRef<Socket | null>(null);
  const [sessionId, setSessionId] = useState<string | undefined>();

  const initializeSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    console.log(`${process.env.NEXT_PUBLIC_BFF_API_SERVER}login`);
    socketRef.current = io(`${process.env.NEXT_PUBLIC_BFF_API_SERVER}login`, {
      extraHeaders: {
        'connection-type': 'login',
      },
    });

    socketRef.current.on('connect', () => {
      const sessionId = socketRef.current?.id;
      console.log(`[socket ${sessionId}] connected`);
      setSessionId(sessionId);
    });
    socketRef.current.on('disconnect', (e) => {
      console.log(`[socket] disconnected`);
      setSessionId(undefined);
    });
  }, []);

  return (
    <>
      <button type="button" onClick={initializeSocket}>
        Connect
      </button>
      <button
        type="button"
        onClick={() => {
          if (socketRef.current) {
            socketRef.current.disconnect();
          }
        }}
      >
        {' '}
        DIsconnect
      </button>
      <GtwQRCode value={''} />
    </>
  );
}
