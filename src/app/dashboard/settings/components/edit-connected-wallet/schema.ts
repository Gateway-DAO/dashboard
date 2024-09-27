import { PublicKey } from '@solana/web3.js';
import { z } from 'zod';

// Função para validar endereço Solana
const isValidSolanaAddress = (address: string) => {
  try {
    const pubkey = new PublicKey(address);
    return PublicKey.isOnCurve(pubkey);
  } catch {
    return false;
  }
};

// Regex para validar endereços EVM (Ethereum)
const evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;

// Schema de validação Zod
export const walletSchema = z
  .string()
  .refine(
    (address) => evmAddressRegex.test(address) || isValidSolanaAddress(address),
    {
      message:
        'Invalid wallet address. Please provide a valid Ethereum or Solana address.',
    }
  );
