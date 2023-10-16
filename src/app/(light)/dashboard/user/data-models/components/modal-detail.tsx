'use client';

import CopyBox from '@/components/copy-box/copy-box';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { queries } from '@/constants/queries';
import { useGtwSession } from '@/context/gtw-session-provider';
import { DataModelByIdQuery } from '@/services/protocol/types';
import { useQuery } from '@tanstack/react-query';

import { Skeleton, Typography } from '@mui/material';

import TabsStructure from './tabs-structure';

export default function ModalDetail({
  open,
  id,
  onClose,
}: {
  open: boolean;
  onClose: any;
  id: string;
}) {
  const { privateApi } = useGtwSession();

  const { data: dataModel, isLoading } = useQuery({
    queryKey: [queries.data_model, id],
    queryFn: () => privateApi?.dataModelById({ id }),
    select: (data: any) => (data as DataModelByIdQuery)?.dataModel,
  });

  return (
    <ModalRight open={open} onClose={onClose}>
      <ModalHeader onClose={onClose} />

      <Typography variant="h4" mb={3}>
        {isLoading ? <Skeleton /> : dataModel?.title}
      </Typography>
      <Typography variant="body1" mb={3}>
        {isLoading ? <Skeleton /> : dataModel?.description}
      </Typography>
      <CopyBox title="Data request template ID" value={id} />
      <TabsStructure id={id} isLoading={isLoading} data={dataModel} />
    </ModalRight>
  );
}
