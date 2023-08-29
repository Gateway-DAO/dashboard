"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import ModalRight from "@/components/modal/modal-right"
import ModalTitle from "@/components/modal/modal-title"

import PDADetail from "./pda-detail";

export default function ModalPDADetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const id = searchParams.get('pda-id');
  const onClose = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('pda-id')
    router.replace(pathname + '?' + params.toString(), { scroll: false })
  };
  return (
    <ModalRight open={!!id} onClose={onClose}>
      <ModalTitle onClose={onClose} />
      {id && <PDADetail id={id} />}
    </ModalRight>
  )
}
