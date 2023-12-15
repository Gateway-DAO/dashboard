import { Metadata } from 'next';

import IssuePdaForm from '@/app/(light)/app/(dashboard)/components/issue-pda/issue-form/issue-form';
import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';

export const metadata: Metadata = {
  title: 'Issue a Private Data Asset - Gateway Network',
};

export default async function OrgIssueDataAsset({
  params: { id, username },
}: PageProps<{ id: string; username: string }>) {
  const { dataModel } = await apiPublic.dataModelById({
    id,
  });

  return (
    <>
      <TopBarContainer>
        <BackButton href={routes.dashboard.org.issue(username)} />
      </TopBarContainer>
      <IssuePdaForm dataModel={dataModel} />
    </>
  );
}
