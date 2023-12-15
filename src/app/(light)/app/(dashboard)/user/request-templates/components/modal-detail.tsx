'use client';

import CopyBox from '@/components/copy-box/copy-box';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { queries } from '@/constants/queries';
import { useGtwSession } from '@/context/gtw-session-provider';
import { requestTemplate } from '@/locale/en/request-template';
import { DataRequestTemplateByIdQuery } from '@/services/protocol/types';
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

  const { data: template, isLoading } = useQuery({
    queryKey: [queries.data_request_template, id],
    queryFn: () => privateApi?.dataRequestTemplateById({ id }),
    select: (data: any) =>
      (data as DataRequestTemplateByIdQuery)?.dataRequestTemplate,
  });

  return (
    <ModalRight open={open} onClose={onClose}>
      <ModalHeader onClose={onClose} />

      <Typography variant="h4" mb={3}>
        {isLoading ? <Skeleton /> : template?.name}
      </Typography>
      <Typography variant="body1" mb={3}>
        {isLoading ? <Skeleton /> : template?.description}
      </Typography>
      <CopyBox title={requestTemplate.data_request_template_id} value={id} />
      <TabsStructure id={id} isLoading={isLoading} data={template} />
    </ModalRight>
  );
}
