"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from "react";

import ErrorBoundary from '@/components/error-boundary/error-boundary';
import ModalRight from "@/components/modal/modal-right"
import ModalTitle from "@/components/modal/modal-title"

import PDASkeleton from "../../../data-asset/[id]/components/pda-skeleton";
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
  console.log(id)
  return (
    <ModalRight open={!!id} onClose={onClose}>
      <ModalTitle onClose={onClose} />

      {id && <ErrorBoundary fallback={<>Error</>}><Suspense fallback={<PDASkeleton />}>
        <PDADetail id={id} />
      </Suspense></ErrorBoundary>}
    </ModalRight>
  )
}
