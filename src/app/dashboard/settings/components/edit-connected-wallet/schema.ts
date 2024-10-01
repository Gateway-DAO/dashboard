import { PublicKey } from '@solana/web3.js';
import { z } from 'zod';

// Solana Validation
const isValidSolanaAddress = (address: string) => {
  try {
    const pubkey = new PublicKey(address);
    return PublicKey.isOnCurve(pubkey);
  } catch {
    return false;
  }
};

// Evm Validation
const evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;

// Sui Validation
const suiAddressRegex = /^0x[a-fA-F0-9]{64}$/;

export const walletSchema = z
  .string()
  .refine(
    (address) =>
      evmAddressRegex.test(address) ||
      suiAddressRegex.test(address) ||
      isValidSolanaAddress(address),
    {
      message:
        'Invalid wallet address. Please provide a valid Ethereum, Solana or Sui address.',
    }
  );
