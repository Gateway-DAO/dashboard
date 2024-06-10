'use client';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useEffect, useCallback, useRef, useState } from 'react';

import GtwQRCode from '@/components/gtw-qr/gtw-qr-code';
import LoadingQRCode from '@/components/gtw-qr/loading-qr-code';
import { LoginSessionV3 } from '@/types/user';
import { onSaveSVG } from '@/utils/save-svg';
import { useMediaQuery } from '@react-hookz/web';
import { useMutation } from '@tanstack/react-query';
import { Socket, io } from 'socket.io-client';

import { CheckCircle } from '@mui/icons-material';
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/system';

export default function LoginQrCode() {
  const socketRef = useRef<Socket | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | undefined>();
  const theme = useTheme();
  const router = useRouter();
  const isDesktop = useMediaQuery(
    theme.breakpoints.up('md').replace('@media ', ''),
    {
      initializeWithValue: false,
    }
  );

  const qrRef = useRef<SVGElement>(null);

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async ({
      token,
      privateKey,
    }: {
      token: string;
      privateKey: string;
    }) => {
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
    },
  });

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
      login.mutate({ token, privateKey });
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
      <Dialog open={login.isLoading || login.isSuccess} fullWidth maxWidth="xs">
        {login.isLoading && (
          <>
            <DialogTitle>
              <CircularProgress color="primary" size={18} /> Logging in...
            </DialogTitle>
            <Typography variant="body2" px={3} pb={3} pt={1}>
              Getting your session ready
            </Typography>
          </>
        )}
        {login.isSuccess && (
          <>
            <DialogTitle>
              <CheckCircle color="success" fontSize="small" /> Logged in
            </DialogTitle>
            <Typography variant="body2" px={3} pb={3} pt={1}>
              You'll enter shortly
            </Typography>
          </>
        )}
      </Dialog>
    </>
  );
}
