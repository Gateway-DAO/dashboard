'use client';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { queries } from '@/constants/queries';
import { apiPublic } from '@/services/protocol/api';
import { Explorer_Data_Model_Detail_OverviewQuery } from '@/services/protocol/types';
import { useQuery } from '@tanstack/react-query';

import LearnMoreContent from './learn-more-content';

type Props = {
  open: boolean;
  onClose: () => void;
  id: string;
};

export default function LearnMore({ open, id, onClose }: Props) {
  const { data: dataModel, isLoading } = useQuery({
    queryKey: [queries.data_model, id],
    queryFn: async () => apiPublic.explorer_data_model_detail_overview({ id }),
    select: (data: any) =>
      (data as Explorer_Data_Model_Detail_OverviewQuery)
        ?.dataModel as Explorer_Data_Model_Detail_OverviewQuery['dataModel'],
  });

  return (
    <ModalRight open={open} onClose={onClose}>
      <ModalHeader onClose={onClose} />
      <LearnMoreContent dataModel={dataModel!} isLoading={isLoading} />
    </ModalRight>
  );
}
