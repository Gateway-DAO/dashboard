'use client';

import DataModelImageCard from '@/components/data-model-image-card/data-model-image-card';
import { DataModel } from '@/services/protocol/types';
import { useToggle } from '@react-hookz/web';
import { PartialDeep } from 'type-fest';

import IssuePdaActions from '../issue-pda-actions';
import LearnMore from '../learn-more/learn-more';

type Props = {
  dataModel: PartialDeep<DataModel>;
};

export default function FeaturedCard({ dataModel }: Props) {
  const [openDetailModal, toggleDetailModal] = useToggle(false);

  return (
    <>
      <DataModelImageCard
        dataModel={dataModel}
        key={dataModel.id}
        withLink={false}
        onClick={toggleDetailModal}
      >
        <IssuePdaActions id={dataModel.id!} />
      </DataModelImageCard>
      <LearnMore
        open={openDetailModal}
        onClose={toggleDetailModal}
        id={dataModel.id!}
      />
    </>
  );
}
