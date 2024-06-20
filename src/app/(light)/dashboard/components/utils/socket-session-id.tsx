'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';

import { Socket, io } from 'socket.io-client';

type Props = {
  event: string;
  eventMethod: (event: any) => void;
  connectionType: string;
};

export default function UtilsSocketSessionId({
  connectionType,
  event,
  eventMethod,
}: Props) {
  const socketRef = useRef<Socket | null>(null);
  const session = useSession();
  const [id, setId] = useState<string | null>(null);

  const initializeSocket = () => {
    if (socketRef.current) {
      setId(null);
      socketRef.current.disconnect();
    }

    socketRef.current = io(`${process.env.NEXT_PUBLIC_BFF_API_SERVER}pda`, {
      extraHeaders: {
        Authorization: `Bearer ${session.data?.token}`,
        'connection-type': connectionType,
      },
    });

    socketRef.current.on('connect', () => {
      console.log(`[socket] connected`);
      setId(socketRef.current?.id ?? null);
    });

    socketRef.current.on(event, eventMethod);

    socketRef.current.on('disconnect', (e) => {
      console.log(`[socket] disconnected`);
      setId(null);
    });
  };

  const copy = () => {
    if (id) {
      navigator.clipboard.writeText(id);
    }
  };

  useEffect(() => {
    if (!id || !socketRef.current?.connected) {
      initializeSocket();
    }
  }, [id, initializeSocket]);

  return (
    <>
      <p>Socket Session Id</p>
      <p>{id || 'Not connected'}</p>
      <button onClick={copy}>Copy</button>
      <button onClick={initializeSocket}>Reconnect</button>
    </>
  );
}
