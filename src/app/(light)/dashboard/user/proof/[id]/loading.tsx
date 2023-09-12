import BackButton from '@/components/buttons/back-button';
import TopBarContainer from '@/components/top-bar-container/top-bar-container';

import PDASkeleton from '../../asset/[id]/components/pda-skeleton';

export default function LoadingProofPage() {
  return (
    <>
      <TopBarContainer>
        <BackButton />
      </TopBarContainer>
      <PDASkeleton />
    </>
  );
}
