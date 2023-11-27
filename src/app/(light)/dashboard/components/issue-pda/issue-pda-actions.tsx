'use client';

import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';
import { dataModelCard } from '@/locale/en/datamodel';
import { useToggle } from '@react-hookz/web';

import { Button, Stack } from '@mui/material';

import LearnMore from './learn-more/learn-more';
import IssuePdaDialog from './review/dialog';

type Props = {
  id: string;
};

export default function IssuePdaActions({ id }: Props) {
  const [openDetailModal, toggleDetailModal] = useToggle(false);
  const [testSuccess, toggleSuccess] = useToggle(false);
  const { isOrg, organization } = useOrganization();
  return (
    <>
      <Stack direction="row" gap={1}>
        <Button
          size="small"
          variant="contained"
          href={
            isOrg
              ? routes.dashboard.org.issue(organization.gatewayId)
              : routes.dashboard.user.issuePda(id)
          }
        >
          {dataModelCard.issue}
        </Button>
        <Button size="small" variant="outlined" onClick={toggleDetailModal}>
          {dataModelCard.learn_more}
        </Button>
        <Button size="small" variant="outlined" onClick={toggleSuccess}>
          Success
        </Button>
      </Stack>
      <LearnMore open={openDetailModal} onClose={toggleDetailModal} id={id} />
      <IssuePdaDialog open={testSuccess} onClose={toggleSuccess} />
    </>
  );
}
