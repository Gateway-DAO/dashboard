
import EvmWalletConnect from "./components/evm-wallet-connect";
import EvmProvider from "./components/providers/evm-provider";
import SolanaProvider from './components/providers/solana-provider';
import SolanaWalletConnect from "./components/solana-wallet-connect";

export default function Login() {

  return <div>
    <EvmProvider><EvmWalletConnect /></EvmProvider>
    <SolanaProvider><SolanaWalletConnect /></SolanaProvider>
  </div>;
}
