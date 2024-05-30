'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useRef, useState } from 'react';

import GtwQRCode from '@/components/gtw-qr/gtw-qr-code';
import LoadingQRCode from '@/components/gtw-qr/loading-qr-code';
import { LoginSessionV3 } from '@/types/user';
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

  const initializeSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io(`${process.env.NEXT_PUBLIC_BFF_API_SERVER}user`, {
      extraHeaders: {
        'connection-type': 'login',
      },
    });

    socketRef.current.on('create-pub', (publicKey: string) => {
      const sessionId = socketRef.current?.id;
      console.log(`[socket ${sessionId}] connected`);
      if (process.env.NODE_ENV !== 'production') {
        console.log({ type: 'login', sessionId, publicKey });
      }
      setQrCodeData(JSON.stringify({ type: 'login', sessionId, publicKey }));
    });

    socketRef.current.on('login', async (event: LoginSessionV3) => {
      console.log(`[socket] login`, event);
      const { token, privateKey } = event;
      try {
        await signIn('credential-jwt', {
          token,
          privateKey,
          redirect: false,
        });
        router.push('/dashboard/v3');
      } catch (e) {
        console.log(e);
      }
    });

    socketRef.current.on('disconnect', (e) => {
      console.log(`[socket] disconnected`);
      setQrCodeData(undefined);
    });
  }, []);

  const onLogin = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaWQiOiJkaWQ6Z2F0ZXdheUlkOm15Z2F0ZXdheTozYTdlYjgzODhkY2M5MTk5ZTllZDFlYjFmM2UwZWQxMzE5YjM4M2RhYzU3YmQzZDA5ZjkwMDIxNjgzMGI2ZTE0IiwicHJvdG9jb2xfaWQiOiJkM2JhY2U2Mi1hMDA3LTRiYmQtOGU5My01MWI2MDhhYzA1YjIiLCJpYXQiOjE3MTQzOTczOTN9.EUXznbnHlm7PEq9UiJFuqES_C__KP8PD6oCr5UpCuLQ';
    const privateKey = 'dado-privado';
    try {
      await signIn('credential-jwt', {
        token,
        privateKey,
        redirect: false,
      });
      router.push('/dashboard/v3');
    } catch (e) {
      console.log(e);
    }
  };

  const onSignOut = async () => {
    try {
      await signOut({
        redirect: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log('session', session);

  useEffect(() => {
    if (isDesktop) {
      initializeSocket();
    }
  }, [isDesktop, initializeSocket]);

  return (
    <>
      {/* <button type="button" onClick={onLogin}>
        Login
      </button>
      <button type="button" onClick={onSignOut}>
        SignOut
      </button> */}
      {qrCodeData ? <GtwQRCode value={qrCodeData} /> : <LoadingQRCode />}
    </>
  );
}
