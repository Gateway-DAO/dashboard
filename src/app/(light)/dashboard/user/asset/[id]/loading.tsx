import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';

import PDASkeleton from '../old/[id]/components/pda-skeleton';

export default function LoadingPDAPage() {
  return (
    <>
      <TopBarContainer>
        <BackButton />
      </TopBarContainer>
      <PDASkeleton />
    </>
  );
}
