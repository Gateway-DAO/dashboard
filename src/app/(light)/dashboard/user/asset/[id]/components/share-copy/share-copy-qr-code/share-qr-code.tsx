'use client';
import { useEffect, useCallback, useRef } from 'react';

import GtwQRCode from '@/components/gtw-qr/gtw-qr-code';
import GtwQrCodeContainer from '@/components/gtw-qr/gtw-qr-code-container';
import { LoginSessionV3 } from '@/types/user';
import { useMediaQuery } from '@react-hookz/web';
import { Socket, io } from 'socket.io-client';

import { useTheme } from '@mui/system';

import { ShareCopyQrCodeProps } from './types';

export default function ShareQrCode({
  identification,
  pda,
}: ShareCopyQrCodeProps) {
  const socketRef = useRef<Socket | null>(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(
    theme.breakpoints.up('md').replace('@media ', ''),
    {
      initializeWithValue: false,
    }
  );

  const qrRef = useRef<SVGElement>(null);

  const initializeSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io(`${process.env.NEXT_PUBLIC_BFF_API_SERVER}user`, {
      extraHeaders: {
        'connection-type': 'login',
      },
    });

    socketRef.current.on('share', async (event: LoginSessionV3) => {
      console.log(`[socket] share`, event);
      const { token, privateKey } = event;
    });
  }, []);

  useEffect(() => {
    if (isDesktop) {
      initializeSocket();
    }
  }, [isDesktop, initializeSocket]);

  const data = JSON.stringify({
    identification,
    pdaId: pda.id,
  });

  return (
    <GtwQrCodeContainer>
      <GtwQRCode value={data} ref={qrRef} />
    </GtwQrCodeContainer>
  );
}
