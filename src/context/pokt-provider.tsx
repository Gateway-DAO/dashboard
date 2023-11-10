'use client';
import { Session } from 'next-auth';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

enum poktMessageType {
  REQUEST_ACCOUNTS = 'pokt_requestAccounts',
  BALANCE = 'pokt_balance',
  SEND_TRANSACTION = 'pokt_sendTransaction',
  TX = 'pokt_tx',
  HEIGHT = 'pokt_height',
  BLOCK = 'pokt_block',
  CHAIN = 'pokt_chain',
}

type PoktType = {
  address: string;
  balance: number;
  height: number;
  chain: string;
  isConnected: boolean;
  connect: () => void;
};

export const PoktContext = createContext<PoktType>({
  address: '',
  balance: 0,
  height: 0,
  chain: '',
  isConnected: false,
} as PoktType);

export function PoktProvider({ children }: PropsWithChildren<{}>) {
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [height, setHeight] = useState(0);
  const [chain, setChain] = useState<string>('');

  const [error, setError] = useState<string>('');

  const connect = async () => {
    const [address]: [string] = await window.pocketNetwork.send(
      poktMessageType.REQUEST_ACCOUNTS
    );
    setAddress(address);
  };

  useEffect(() => {
    if (address) {
      window.pocketNetwork
        .send(poktMessageType.CHAIN)
        .then((res: { chain: string }) => {
          setChain(res?.chain ? res.chain : '');
        })
        .catch((err: any) => {
          console.error(err);
        });

      window.pocketNetwork
        .send(poktMessageType.HEIGHT)
        .then((res: { height: number }) => {
          setHeight(res?.height ? res.height : 0);
        })
        .catch((err: any) => {
          setError(err);
        });

      window.pocketNetwork
        .send(poktMessageType.BALANCE, [{ address }])
        .then((res: { balance: number }) => {
          setBalance(res?.balance ? res.balance : 0);
        })
        .catch((err: any) => {
          setError(err);
        });
    }
  }, [address]);

  return (
    <PoktContext.Provider
      value={{
        address,
        balance,
        height,
        chain,
        connect,
        isConnected: !!address,
      }}
    >
      {children}
    </PoktContext.Provider>
  );
}

export const usePokt = () => useContext(PoktContext);
