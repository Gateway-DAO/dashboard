import { Metadata } from 'next';

import IssuePdaContent from '@/app/(light)/dashboard/features/issue-pda/issue-pda-content';
import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';

export const metadata: Metadata = {
  title: 'Issue a Personal Data Asset - Gateway Network',
};

export default async function IssuePage() {
  return (
    <>
      <TopBarContainer>
        <BackButton />
      </TopBarContainer>
      <IssuePdaContent />
    </>
  );
}
