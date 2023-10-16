'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { DecryptedProofPda } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import PDADetail from './pda-detail';

export default function ModalPDADetail({
  pdas,
}: {
  pdas: PartialDeep<DecryptedProofPda>[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const id = searchParams.get('pda-id');
  const onClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('pda-id');
    router.replace(pathname + '?' + params.toString(), { scroll: false });
  };

  return (
    <ModalRight open={!!id} onClose={onClose}>
      <ModalHeader onClose={onClose} />
      {id && <PDADetail pdas={pdas} id={id} />}
    </ModalRight>
  );
}
