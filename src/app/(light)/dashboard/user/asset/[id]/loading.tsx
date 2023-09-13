import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/top-bar-container/top-bar-container';

import PDASkeleton from './components/pda-skeleton';

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
