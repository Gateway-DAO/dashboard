"use client";
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function SolanaWalletConnect() {
  const { setVisible } = useWalletModal();

  const { connecting, connected, publicKey } = useWallet()
  if (connected) {
    return (
      <div>
        <div>Connected to {publicKey?.toString()}</div>
        <button onClick={() => setVisible(true)}>Change Wallet</button>
      </div>
    )
  }

  if (connecting) {
    return (
      <div>
        <div>Connecting</div>
        <button onClick={() => setVisible(true)}>Change Wallet</button>
      </div>
    )
  }

  return (
    <button onClick={() => setVisible(true)}>Open Solana</button>
  )
}
