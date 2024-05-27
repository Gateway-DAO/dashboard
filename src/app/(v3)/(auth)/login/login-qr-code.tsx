'use client';
import { useEffect, useCallback, useRef, useState } from 'react';

import GtwQRCode from '@/components/gtw-qr/gtw-qr-code';
import LoadingQRCode from '@/components/gtw-qr/loading-qr-code';
import { useMediaQuery } from '@react-hookz/web';
import { Socket, io } from 'socket.io-client';

import { useTheme } from '@mui/system';

export default function LoginQrCode() {
  const socketRef = useRef<Socket | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | undefined>();
  const theme = useTheme();
  const isDesktop = useMediaQuery(
    theme.breakpoints.up('md').replace('@media ', ''),
    {
      initializeWithValue: false,
    }
  );

  const initializeSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io(`${process.env.NEXT_PUBLIC_BFF_API_SERVER}login`, {
      extraHeaders: {
        'connection-type': 'login',
      },
    });

    socketRef.current.on('create-pub', (event) => {
      const sessionId = socketRef.current?.id;
      console.log(`[socket ${sessionId}] connected`);
      if (process.env.NODE_ENV !== 'production') {
        console.log({ type: 'login', sessionId, ...event });
      }
      setQrCodeData(JSON.stringify({ type: 'login', sessionId, ...event }));
    });
    socketRef.current.on('disconnect', (e) => {
      console.log(`[socket] disconnected`);
      setQrCodeData(undefined);
    });
  }, []);

  useEffect(() => {
    if (isDesktop) {
      initializeSocket();
    }
  }, [isDesktop, initializeSocket]);

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
        DIsconnect
      </button>
      {qrCodeData ? <GtwQRCode value={qrCodeData} /> : <LoadingQRCode />}
    </>
  );
}
