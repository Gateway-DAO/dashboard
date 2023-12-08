'use client';

import InfiniteLoadMore from '@/components/infinite-load-more/infinite-load-more';
import PdaCardSkeleton from '@/components/pda-card/pda-card-skeleton';
import { useGtwSession } from '@/context/gtw-session-provider';
import { coachMarkGuide } from '@/locale/en/pda';
import { Received_PdasQuery } from '@/services/protocol/types';
import { useToggle } from '@react-hookz/web';
import { useInfiniteQuery } from '@tanstack/react-query';
import Joyride, { Step } from 'react-joyride';

import { Stack } from '@mui/material';

import PDAsList from '../../components/pdas-list';
import PDAsListContainer from '../../components/pdas-list-container';
import { InstructionGuide, InstructionToolTip } from './instruction-guide';

type Props = {
  pdas: Received_PdasQuery['myPDAs'];
};

export default function ReceivedPDAsList({ pdas: initialPdas }: Props) {
  const { privateApi } = useGtwSession();
  const [openCoachMarkGuide, toggleCoachMarkGuide] = useToggle(false);

  const handleJoyrideCallback = (data: any) => {
    if (data.status === 'finished') {
      toggleCoachMarkGuide();
    }
  };

  const steps = [
    {
      target: '.hello', // CSS selector for the element to highlight
      content:
        'This your first Private Data Asset issued by Gateway. Open and discover where you can use it.',
      title: 'Start using now',

      disableBeacon: true, // Disable the pulsating beacon
      hideFooter: true,
      customData: {
        btnTitle: 'open now',
      },
    },
  ];

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['pdas', privateApi],
      queryFn: async ({ pageParam }) => {
        return (await privateApi!.received_pdas({ take: 6, skip: pageParam }))
          ?.myPDAs;
      },
      getNextPageParam: (lastPage, pages) =>
        lastPage && lastPage.length < 6 ? undefined : pages.length * 6,
      initialData: {
        pageParams: [0],
        pages: [initialPdas],
      },
    });

  const pdas = data?.pages.flat().filter(Boolean);

  return (
    <>
      <InstructionGuide
        title={coachMarkGuide.title}
        desc={coachMarkGuide.description}
        btnLink={coachMarkGuide.btn_link}
        btnText={coachMarkGuide.btn_text}
        videoUrl={coachMarkGuide.video_link}
        toggleCoachMarkGuide={toggleCoachMarkGuide}
      />
      <Stack className="hello" gap={1}>
        <PDAsList pdas={pdas ?? []} />
        {privateApi && hasNextPage && (
          <InfiniteLoadMore
            isLoading={isFetchingNextPage}
            onLoadMore={() => fetchNextPage()}
          >
            <PDAsListContainer>
              <PdaCardSkeleton />
              <PdaCardSkeleton />
              <PdaCardSkeleton />
            </PDAsListContainer>
          </InfiniteLoadMore>
        )}
      </Stack>
      <Joyride
        steps={steps}
        run={openCoachMarkGuide}
        callback={handleJoyrideCallback}
        tooltipComponent={InstructionToolTip}
        styles={{ options: { arrowColor: '#499AA5' } }}
      />
    </>
  );
}
