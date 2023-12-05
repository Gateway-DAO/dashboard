'use client';

import DataModelCard from '@/components/data-model-card/data-model-card';
import { DataModel } from '@/services/protocol/types';
import { useToggle } from '@react-hookz/web';
import { PartialDeep } from 'type-fest';

import IssuePdaActions from '../issue-pda-actions';
import LearnMore from '../learn-more/learn-more';

type Props = {
  dataModel: PartialDeep<DataModel>;
};

export default function SearchCard({ dataModel }: Props) {
  const [openDetailModal, toggleDetailModal] = useToggle(false);

  return (
    <>
      <DataModelCard
        dataModel={dataModel}
        withLink={false}
        onClick={toggleDetailModal}
      >
        <IssuePdaActions id={dataModel.id!} />
      </DataModelCard>
      <LearnMore
        open={openDetailModal}
        onClose={toggleDetailModal}
        id={dataModel.id!}
      />
    </>
  );
}
