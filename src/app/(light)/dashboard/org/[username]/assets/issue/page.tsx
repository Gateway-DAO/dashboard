import { Metadata } from 'next';

import IssuePdaContent from '@/app/(light)/dashboard/components/issue-pda-content';
import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Issue a Private Data Asset - Gateway Network',
  };
}

export default async function OrgIssuePage(props: any) {
  const pathnameOrg = props.params?.username;
  return (
    <>
      <TopBarContainer>
        <BackButton href={routes.dashboard.org.issuedAssets(pathnameOrg)} />
      </TopBarContainer>
      <IssuePdaContent />
    </>
  );
}
