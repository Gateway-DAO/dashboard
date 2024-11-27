export const missions = [
  {
    id: 'compute',
    title: 'Verifiable Computation',
    text: 'Authenticated garbled circuits provide intrinsic verification of both inputs and outputs.',
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality and Integrity',
    text: 'The garbled circuit model ensures data remains encrypted throughout, while also guaranteeing that only authorized computations are performed on the data.',
  },
  {
    id: 'processing',
    title: 'Efficient Processing',
    text: 'GVM achieves both secure and efficient encrypted computation, with minimized overhead from external proof systems.',
  },
  {
    id: 'access',
    title: 'Unified State Access',
    text: 'Delivering performant computation across stored encrypted state data, and public state information.',
  },
] as const;
