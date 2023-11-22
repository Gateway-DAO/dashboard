'use client';
import CopyBox from '@/components/copy-box/copy-box';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { queries } from '@/constants/queries';
import { useGtwSession } from '@/context/gtw-session-provider';
import { datamodel } from '@/locale/en/datamodel';
import { DataModelByIdQuery } from '@/services/protocol/types';
import { useQuery } from '@tanstack/react-query';

import { Skeleton, Typography } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  id: string;
};

export default function LearnMore({ open, id, onClose }: Props) {
  const { privateApi } = useGtwSession();

  const { data: dataModel, isLoading } = useQuery({
    queryKey: [queries.data_model, id],
    queryFn: () => privateApi?.dataModelById({ id }),
    select: (data: any) =>
      (data as DataModelByIdQuery)
        ?.dataModel as DataModelByIdQuery['dataModel'],
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
      <CopyBox title={datamodel.data_model_id} value={id} />
    </ModalRight>
  );
}
