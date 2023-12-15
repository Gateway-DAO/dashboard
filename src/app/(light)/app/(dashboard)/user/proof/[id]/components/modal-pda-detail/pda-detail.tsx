'use client';
import PDAItem from '@/app/(light)/app/(dashboard)/user/asset/[id]/components/pda-item';
import DefaultError from '@/components/default-error/default-error';
import { errorMessages } from '@/locale/en/errors';
import { DecryptedProofPda } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

type Props = {
  id: string;
  pdas: PartialDeep<DecryptedProofPda>[];
};

export default function PDADetail({ pdas, id }: Props) {
  const PDA = pdas.find(({ id: idInternal }) => id === idInternal);
  const PDAPattern = {
    id: PDA?.id,
    dataAsset: {
      ...PDA,
    },
  };

  if (!PDA || !PDA.id) {
    return (
      <DefaultError message={errorMessages.UNEXPECTED_ERROR} isModal={true} />
    );
  }

  return <PDAItem pda={PDAPattern} isProofPda={true} />;
}
