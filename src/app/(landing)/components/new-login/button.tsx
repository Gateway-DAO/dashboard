'use client';

import { useEffect, useRef, useState } from 'react';

import { useToggle } from '@react-hookz/web';
import QRCode from 'react-qr-code';
import { Socket, io } from 'socket.io-client';

import { Box } from '@mui/material';

import Button from '../button';
import Modal from '../modal';

export default function NewLoginButton() {
  const [isOpen, toggle] = useToggle(false);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const socketRef = useRef<Socket | null>(null);

  const onLogin = () => {
    socketRef.current = io(process.env.NEXT_PUBLIC_BFF_API_SERVER);
    socketRef.current.on('connect', () => {
      const id = socketRef.current!.id;
      setSessionId(id);
    });
    toggle();
  };

  useEffect(() => {
    // We just disconnect the socket when the component is unmounted (ie.: Route change), to avoid new sessions being generated

    return () => {
      if (socketRef.current?.connected) {
        socketRef.current.disconnect();
      }
    };
  }, [socketRef]);

  return (
    <>
      <Button variant="contained" onClick={onLogin}>
        Login
      </Button>
      <Modal active={isOpen} setActive={toggle}>
        <Box p={2}>
          {sessionId ? (
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={sessionId}
              viewBox={`0 0 256 256`}
            />
          ) : (
            'Loading...'
          )}
        </Box>
      </Modal>
    </>
  );
}
