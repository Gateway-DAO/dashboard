'use client';
import { useEffect, useCallback, useRef, useState } from 'react';

import GtwQRCode from '@/components/gtw-qr/gtw-qr-code';
import GtwQrCodeContainer from '@/components/gtw-qr/gtw-qr-code-container';
import LoadingQRCode from '@/components/gtw-qr/loading-qr-code';
import { useMediaQuery } from '@react-hookz/web';
import { Socket, io } from 'socket.io-client';

import { useTheme } from '@mui/system';

import { V3MockToken } from './mock';

export default function UpdateQrCode() {
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

    socketRef.current = io(`${process.env.NEXT_PUBLIC_BFF_API_SERVER}user`, {
      extraHeaders: {
        'connection-type': 'update',
        Authorization: `Bearer ${V3MockToken}`,
      },
    });

    socketRef.current.on('create-pub', (publicKey: string) => {
      const sessionId = socketRef.current?.id;
      console.log(`[socket ${sessionId}] connected`);
      if (process.env.NODE_ENV !== 'production') {
        console.log({ type: 'update', sessionId, publicKey });
      }
      setQrCodeData(JSON.stringify({ type: 'update', sessionId, publicKey }));
    });

    socketRef.current.on('update', (event) => {
      console.log(`[socket] update`, event);
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
    <GtwQrCodeContainer>
      {qrCodeData ? <GtwQRCode value={qrCodeData} /> : <LoadingQRCode />}
    </GtwQrCodeContainer>
  );
}
