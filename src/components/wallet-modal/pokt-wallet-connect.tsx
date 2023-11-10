'use client';
import { useEffect, useState } from 'react';

import SolanaIcon from '@/components/icons/solana';
import { Chain } from '@/services/protocol/types';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import WalletModalButton from './wallet-modal-button';

declare global {
  interface Window {
    pocketNetwork: any;
  }
}

enum poktMessageType {
  REQUEST_ACCOUNTS = 'pokt_requestAccounts',
  BALANCE = 'pokt_balance',
  SEND_TRANSACTION = 'pokt_sendTransaction',
  TX = 'pokt_tx',
  HEIGHT = 'pokt_height',
  BLOCK = 'pokt_block',
  CHAIN = 'pokt_chain',
}

const handleError = (err: any) => {
  console.error(err);
  alert(`Error:\n\n${err.message}`);
};

type Props = {
  onConnect: (address: string, chain: Chain) => void;
};

export default function PoktWalletConnect({ onConnect }: Props) {
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [height, setHeight] = useState(0);
  const [txid, setTxid] = useState<string>('');
  const [transaction, setTransaction] = useState<any>(null);
  const [txRecipient, setTxRecipient] = useState<string>('');
  const [txAmount, setTxAmount] = useState<string>('');
  const [txMemo, setTxMemo] = useState<string>('');
  const [chain, setChain] = useState<string>('');

  const requestAccounts = async () => {
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
          handleError(err);
        });

      window.pocketNetwork
        .send(poktMessageType.BALANCE, [{ address }])
        .then((res: { balance: number }) => {
          setBalance(res?.balance ? res.balance : 0);
        })
        .catch((err: any) => {
          handleError(err);
        });
    }

    console.log('address', address);
    console.log('balance', balance);
    console.log('height', height);
    console.log('chain', chain);
  }, [address]);

  return (
    <WalletModalButton
      startIcon={<SolanaIcon sx={{ fontSize: '24' }} />}
      onClick={() => {
        requestAccounts();
      }}
    >
      POKT Network
    </WalletModalButton>
  );
}
