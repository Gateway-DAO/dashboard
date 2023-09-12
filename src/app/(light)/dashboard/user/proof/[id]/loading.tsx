import BackButton from '@/components/buttons/back-button';
import TopBarContainer from '@/components/top-bar-container/top-bar-container';

import ProofSkeleton from './components/proof-skeleton';

export default function LoadingProofPage() {
  return (
    <>
      <TopBarContainer>
        <BackButton />
      </TopBarContainer>
      <ProofSkeleton />
    </>
  );
}
