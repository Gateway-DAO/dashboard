'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useRef, useState } from 'react';

import GtwQRCode from '@/components/gtw-qr/gtw-qr-code';
import LoadingQRCode from '@/components/gtw-qr/loading-qr-code';
import { LoginSessionV3 } from '@/types/user';
import { onSaveSVG } from '@/utils/save-svg';
import { useMediaQuery } from '@react-hookz/web';
import { Socket, io } from 'socket.io-client';

import { useTheme } from '@mui/system';

export default function LoginQrCode() {
  const socketRef = useRef<Socket | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | undefined>();
  const theme = useTheme();
  const session = useSession();
  const router = useRouter();
  const isDesktop = useMediaQuery(
    theme.breakpoints.up('md').replace('@media ', ''),
    {
      initializeWithValue: false,
    }
  );

  const qrRef = useRef<SVGElement>(null);

  const login = async (token: string, privateKey: string) => {
    try {
      const res = await signIn('credential-jwt', {
        token,
        privateKey,
        redirect: false,
      });

      if (!res) {
        throw new Error("Couldn't login");
      }

      if (res.error) {
        throw res.error;
      }

      router.push('/dashboard/v3');
    } catch (e) {
      console.log(e);
    }
  };

  const initializeSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io(`${process.env.NEXT_PUBLIC_BFF_API_SERVER}user`, {
      extraHeaders: {
        'connection-type': 'login',
      },
    });

    socketRef.current.on('create-pub', () => {
      const sessionId = socketRef.current?.id;
      console.log(`[socket ${sessionId}] connected`);
      setQrCodeData(JSON.stringify({ type: 'login', sessionId }));
    });

    socketRef.current.on('login', async (event: LoginSessionV3) => {
      console.log(`[socket] login`, event);
      const { token, privateKey } = event;
      login(token, privateKey);
    });

    socketRef.current.on('disconnect', (e) => {
      console.log(`[socket] disconnected`);
      setQrCodeData(undefined);
    });
  }, []);

  const onSignOut = async () => {
    try {
      await signOut({
        redirect: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isDesktop) {
      initializeSocket();
    }
  }, [isDesktop, initializeSocket]);

  return (
    <>
      {qrCodeData ? (
        <>
          <GtwQRCode value={qrCodeData} ref={qrRef} />
          {process.env.NODE_ENV === 'development' && (
            <button onClick={() => onSaveSVG(qrRef.current)}>Print</button>
          )}
        </>
      ) : (
        <LoadingQRCode />
      )}
    </>
  );
}
