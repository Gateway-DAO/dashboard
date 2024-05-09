'use client';

import { useEffect, useCallback, useRef, useState } from 'react';

import ModalRight from '@/components/modal/modal-right/modal-right';
import { useGtwSession } from '@/context/gtw-session-provider';
import { Socket, io } from 'socket.io-client';

import { Box } from '@mui/material';

import { useMigrationModal } from './state';
import InitialStep from './steps/initial/initial-step';
import MigrationProgressStep from './steps/migration-progress/migration-progress';
import QrStep from './steps/qr/qr-step';
import { MigrationEvent } from './types';

export default function MigrationModal() {
  const {
    state,
    onCloseModal,
    onOpenModal,
    onOpenQR,
    onMigrationStarted,
    onMigrationFinished,
    onMigrationError,
  } = useMigrationModal();
  const { session } = useGtwSession();
  const [socketSessionId, setSocketSessionId] = useState<string | undefined>();
  const socketRef = useRef<Socket | null>(null);

  const initializeSocket = useCallback(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_BFF_API_SERVER, {
      extraHeaders: {
        authorization: `Bearer ${session?.token}`,
      },
    });

    socketRef.current.on('connect', () => {
      const sessionId = socketRef.current?.id;
      console.log(`[socket ${sessionId}] connected`);
      setSocketSessionId(sessionId);
    });
    socketRef.current.on('disconnect', (e) => {
      console.log(`[socket] disconnected`);
      setSocketSessionId(undefined);
    });

    socketRef.current.on('migration', (message) => {
      try {
        const data: MigrationEvent = JSON.parse(message);

        switch (data.status) {
          case 'pending':
            onMigrationStarted(data.target);
            break;
          case 'finished':
            onMigrationFinished();
            break;
          case 'error':
            onMigrationError(data.error!);
            break;
          default:
            console.log(data);
        }
      } catch {
        console.error(`error on parse ${message}`);
      }
    });
  }, []);

  const onBack = () => {
    if (socketRef.current?.connected) {
      socketRef.current.disconnect();
    }
    onOpenModal();
  };

  const onClose = () => {
    if (socketRef.current?.connected) {
      socketRef.current.disconnect();
    }
    onCloseModal();
  };

  const onStartMigration = () => {
    onOpenQR();
    if (!socketRef.current) {
      initializeSocket();
    } else {
      socketRef.current.connect();
    }
  };

  useEffect(() => {
    return () => {
      if (socketRef.current?.connected) {
        socketRef.current.disconnect();
      }
    };
  }, [socketRef]);

  return (
    <ModalRight open={state.status !== 'closed'} onClose={onClose}>
      <Box pb={4}>
        {state.status === 'start' && (
          <InitialStep onAccept={onStartMigration} onClose={onClose} />
        )}
        {state.status === 'qr' && (
          <QrStep
            sessionId={socketSessionId}
            onClose={onClose}
            onBack={onBack}
          />
        )}
        {(state.status === 'pending' ||
          state.status === 'finished' || state.status === "error") && (
            <MigrationProgressStep
              status={state.status}
              error={state.error}
              target={state.target!}
              onClose={onClose}
              onReset={onOpenQR}
            />
          )}
      </Box>
    </ModalRight>
  );
}
