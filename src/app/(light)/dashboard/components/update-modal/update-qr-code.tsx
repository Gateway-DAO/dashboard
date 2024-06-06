'use client';
import { signIn, useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import GtwQRCode from '@/components/gtw-qr/gtw-qr-code';
import LoadingQRCode from '@/components/gtw-qr/loading-qr-code';
import { LoginSessionV3 } from '@/types/user';
import { onSaveSVG } from '@/utils/save-svg';
import { Socket, io } from 'socket.io-client';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UpdateQrCode({ isOpen, onClose }: Props) {
  const socketRef = useRef<Socket | null>(null);
  const session = useSession();
  const [qrCodeData, setQrCodeData] = useState<string | undefined>();
  const [isMounted, setIsMounted] = useState(false);
  const qrRef = useRef<SVGElement>(null);

  const initializeSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io(`${process.env.NEXT_PUBLIC_BFF_API_SERVER}user`, {
      extraHeaders: {
        Authorization: `Bearer ${session.data?.token}`,
        'connection-type': 'update',
      },
    });

    socketRef.current.on('create-pub', () => {
      const sessionId = socketRef.current?.id;
      console.log(`[socket ${sessionId}] connected`);
      setQrCodeData(JSON.stringify({ type: 'update', sessionId }));
    });

    socketRef.current.on('update', async (event: LoginSessionV3) => {
      console.log(`[socket] update`, event);
      const { token, privateKey } = event;
      update(token, privateKey);
    });

    socketRef.current.on('disconnect', (e) => {
      console.log(`[socket] disconnected`);
      setQrCodeData(undefined);
    });
  }, []);

  const update = async (token: string, privateKey: string) => {
    try {
      const res = await signIn('credential-jwt', {
        token,
        privateKey,
        redirect: false,
      });

      if (!res) {
        throw new Error("Couldn't update");
      }

      if (res.error) {
        throw res.error;
      }
      //TODO: Fix performance
      onClose();
      socketRef.current?.disconnect();
      setIsMounted(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isOpen && (!isMounted || !socketRef.current?.connected)) {
      setIsMounted(true);
      initializeSocket();
    }
  }, [isOpen, isMounted, initializeSocket]);

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
