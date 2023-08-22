import { Chain } from "@/services/protocol/types";

export const common = {
  chain: {
    EVM: "Ethereum",
    SOL: "Solana"
  } as Record<Chain, string>,
}
