'use client';

import { useEffect, useRef, useState } from 'react';

import ModalRight from '@/components/modal/modal-right/modal-right';
import { Socket, io } from 'socket.io-client';

import InitialStep from './steps/initial/initial-step';
import MigrationStep from './steps/migration/migration';
import { QrStep } from './steps/qr/qr-step';
import { MigrationModalStep } from './types';

type Props = {
  step: MigrationModalStep;
  setStep: (step: MigrationModalStep) => void;
};

export default function MigrationModal({ step, setStep }: Props) {
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [migrationQueue, setMigrationQueue] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);

  const onClose = () => {
    // if (step === 'migration') {
    //   return;
    // }
    if (socketRef.current?.connected) {
      socketRef.current.disconnect();
    }
    setStep('closed');
    setMigrationQueue([]);
  };

  const onStartMigration = () => {
    setStep('qr');
    socketRef.current = io(process.env.NEXT_PUBLIC_BFF_API_SERVER);
    socketRef.current.on('connect', () => {
      const id = socketRef.current!.id;
      setSessionId(id);
    });
    socketRef.current.on('migration', (message) => {
      setStep('migration');
      setMigrationQueue((prev) => [...prev, message]);
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
    <ModalRight open={step !== 'closed'} onClose={onClose}>
      {step === 'start' && (
        <InitialStep onAccept={onStartMigration} onClose={onClose} />
      )}
      {step === 'qr' && <QrStep sessionId={sessionId} onClose={onClose} />}
      {step === 'migration' && <MigrationStep queue={migrationQueue} />}
    </ModalRight>
  );
}
