'use client';

import EVMButton from './evm-button';
import SolanaButton from './sol-button';
import { SignButtonsProps } from './types';

export default function SignButtons(props: SignButtonsProps) {
  return (
    <>
      <EVMButton {...props} />
      <SolanaButton {...props} />
    </>
  );
}
