'use client';

import { useEffect, useRef, useState } from 'react';

import ModalRight from '@/components/modal/modal-right/modal-right';
import { Socket, io } from 'socket.io-client';

import { MigrationTarget, useMigrationModal } from './state';
import InitialStep from './steps/initial/initial-step';
import MigrationProgressStep from './steps/migration-progress/migration-progress';
import QrStep from './steps/qr/qr-step';

export default function MigrationModal() {
  const {
    state,
    onOpenQR,
    onCloseModal,
    onOpenModal,
    onMigrationStarted,
    onMigrationFinished,
  } = useMigrationModal();
  const [sessionId, setSessionId] = useState<string | undefined>();
  const socketRef = useRef<Socket | null>(null);

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
    socketRef.current = io(process.env.NEXT_PUBLIC_BFF_API_SERVER);

    socketRef.current.on('connect', () => {
      console.log('connected', socketRef.current?.id);
      const id = socketRef.current!.id;
      setSessionId(id);
    });

    socketRef.current.on('migration', (message) => {
      try {
        const data = JSON.parse(message) as {
          status: 'started' | 'finished';
          target: MigrationTarget;
        };

        if (data.status === 'started') {
          onMigrationStarted(data.target);
        } else if (data.status === 'finished') {
          onMigrationFinished();
        } else {
          console.log(data);
        }
      } catch {
        console.error(`error on parse ${message}`);
      }
    });
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
    <ModalRight open={state.status !== 'closed'} onClose={onClose}>
      {state.status === 'start' && (
        <InitialStep onAccept={onStartMigration} onClose={onClose} />
      )}
      {state.status === 'qr' && (
        <QrStep sessionId={sessionId} onClose={onClose} onBack={onBack} />
      )}
      {(state.status === 'started-migration' ||
        state.status === 'finished-migration') && (
        <MigrationProgressStep
          isSuccess={state.status === 'finished-migration'}
          target={state.target!}
          onClose={onClose}
        />
      )}
    </ModalRight>
  );
}
