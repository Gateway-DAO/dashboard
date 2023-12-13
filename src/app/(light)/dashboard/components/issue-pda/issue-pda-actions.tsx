'use client';

import Link from 'next/link';

import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';
import { dataModelCard } from '@/locale/en/datamodel';

import { Button, Stack } from '@mui/material';

type Props = {
  id: string;
};

export default function IssuePdaActions({ id }: Props) {
  const { isOrg, organization } = useOrganization();
  return (
    <>
      <Stack direction="row" gap={1}>
        <Button
          component={Link}
          size="small"
          variant="contained"
          onClick={(e) => e.stopPropagation()}
          href={
            isOrg
              ? routes.dashboard.org.issuePda(organization.gatewayId, id)
              : routes.dashboard.user.issuePda(id)
          }
        >
          {dataModelCard.issue}
        </Button>
        <Button size="small" variant="outlined">
          {dataModelCard.learn_more}
        </Button>
      </Stack>
    </>
  );
}
