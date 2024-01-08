import { Metadata } from 'next';

import IssuePdaContent from '@/app/(light)/dashboard/components/issue-pda/issue-pda-content';
import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';

export const metadata: Metadata = {
  title: 'Issue a Private Data Asset - Gateway Network',
};

export default async function OrgIssuePage() {
  return (
    <>
      <TopBarContainer>
        <BackButton />
      </TopBarContainer>
      <IssuePdaContent />
    </>
  );
}
