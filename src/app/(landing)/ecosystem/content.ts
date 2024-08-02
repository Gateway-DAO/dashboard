export enum ClientTag {
  Networks = 'Networks',
  FinTech = 'FinTech',
  DeFi = 'DeFi',
  Gating = 'Gating',
  Consumer = 'Consumer',
  HumanhoodKyc = 'Humanhood/KYC',
  DePin = 'DePIN',
  Governance = 'Governance',
  Education = 'Education',
  Ai = 'AI',
  Compute = 'Compute',
}

export const clientTags: ClientTag[] = [
  ClientTag.Networks,
  ClientTag.FinTech,
  ClientTag.DeFi,
  ClientTag.Gating,
  ClientTag.Consumer,
  ClientTag.HumanhoodKyc,
  ClientTag.DePin,
  ClientTag.Governance,
  ClientTag.Education,
  ClientTag.Ai,
  ClientTag.Compute,
];

export const clients = [
  {
    // logo: import('public/images/ecosystem/solana.png'),
    name: 'Solana Foundation',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Networks,
  },
  {
    // logo: import('public/images/ecosystem/pokt.png'),
    name: 'POKT Network',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Networks,
  },
  {
    // logo: import('public/images/ecosystem/brx.png'),
    name: 'BRX Finance',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Networks,
  },
  {
    // logo: import('public/images/ecosystem/seda.png'),
    name: 'SEDA',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Networks,
  },
  {
    // logo: import('public/images/ecosystem/plume.png'),
    name: 'Plume Network',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Networks,
  },
  {
    // logo: import('public/images/ecosystem/cred.png'),
    name: 'Cred Protocol',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.FinTech,
  },
  {
    // logo: import('public/images/ecosystem/sphere.png'),
    name: 'SpherePay',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.FinTech,
  },
  {
    // logo: import('public/images/ecosystem/twine.png'),
    name: 'Twine',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.FinTech,
  },
  {
    // logo: import('public/images/ecosystem/dyxd.png'),
    name: 'DYDX',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.DeFi,
  },
  {
    // logo: import('public/images/ecosystem/lifi.png'),
    name: 'LI.FI',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.DeFi,
  },
  {
    // logo: import('public/images/ecosystem/goldfinch.png'),
    name: 'Goldfinch',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.DeFi,
  },
  {
    // logo: import('public/images/ecosystem/aave.png'),
    name: 'AAVE',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.DeFi,
  },
  {
    // logo: import('public/images/ecosystem/swing.png'),
    name: 'Swing.xyz',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.DeFi,
  },
  {
    // logo: import('public/images/ecosystem/guild.png'),
    name: 'Guild',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Gating,
  },
  {
    // logo: import('public/images/ecosystem/access.png'),
    name: 'Access',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Gating,
  },
  {
    // logo: import('public/images/ecosystem/blackbird.png'),
    name: 'Blackbird',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Consumer,
  },
  {
    // logo: import('public/images/ecosystem/wonderverse.png'),
    name: 'Wonderverse',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Consumer,
  },
  {
    // logo: import('public/images/ecosystem/layer3.png'),
    name: 'Layer3',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Consumer,
  },
  {
    // logo: import('public/images/ecosystem/sumsub.png'),
    name: 'Sumsub',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.HumanhoodKyc,
  },
  {
    // logo: import('public/images/ecosystem/humanode.png'),
    name: 'Humanode',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.HumanhoodKyc,
  },
  {
    // logo: import('public/images/ecosystem/albus.png'),
    name: 'Albus Protocol',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.HumanhoodKyc,
  },
  {
    // logo: import('public/images/ecosystem/dimo.png'),
    name: 'DIMO',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.DePin,
  },
  {
    // logo: import('public/images/ecosystem/hivemapper.png'),
    name: 'Hivemapper',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.DePin,
  },
  {
    // logo: import('public/images/ecosystem/snapshot.png'),
    name: 'Snapshot',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Governance,
  },
  {
    // logo: import('public/images/ecosystem/odyssey.png'),
    name: 'Odyssey',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Education,
  },
  {
    // logo: import('public/images/ecosystem/atoma.png'),
    name: 'Atoma Network',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Ai,
  },
  {
    // logo: import('public/images/ecosystem/heurist.png'),
    name: 'Heurist',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Ai,
  },
  {
    // logo: import('public/images/ecosystem/shiza.png'),
    name: 'SHIZA',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Ai,
  },
  {
    // logo: import('public/images/ecosystem/fleek.png'),
    name: 'Fleek Network',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Compute,
  },
  {
    // logo: import('public/images/ecosystem/zama.png'),
    name: 'ZAMA',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Compute,
  },
  {
    // logo: import('public/images/ecosystem/irys.png'),
    name: 'Irys',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Compute,
  },
  {
    // logo: import('public/images/ecosystem/arweave.png'),
    name: 'Arweave',
    description:
      'Encrypted order book that enables building of a private perpetual DEX.',
    tag: ClientTag.Compute,
  },
];
