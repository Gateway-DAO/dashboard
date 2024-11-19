export const missions = [
  {
    id: 'control',
    title: 'Verifiable Computation',
    text: 'Authenticated garbled circuits provide intrinsic verification of both inputs and outputs.',
  },
  {
    id: 'privacy',
    title: 'Confidentiality and Integrity',
    text: 'The garbled circuit model ensures data remains encrypted throughout, while also guaranteeing that only authorized computations are performed on the data.',
  },
  {
    id: 'blocks',
    title: 'Unified State Access',
    text: 'Delivering performant computation across stored encrypted state data, and public state information.',
  },
] as const;
