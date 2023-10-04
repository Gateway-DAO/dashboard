'use client';

import ListSection from '@/app/(light)/dashboard/components/list-section';
import WhiteList from '@/components/white-list/white-list';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { orgSettings } from '@/locale/en/settings';
import { useQuery } from '@tanstack/react-query';

import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';

export default function MembersArea() {
  const { organization } = useOrganization();
  const { privateApi } = useGtwSession();
  const members = useQuery({
    queryKey: ['organization-members', organization?.id],
    queryFn: () =>
      privateApi.organization_members({ id: organization?.id ?? '' }),
    enabled: !!organization?.id,
    select: (data) => data.organization?.accesses,
  });

  return (
    <Box sx={{ maxWidth: 1094 }}>
      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        justifyContent="space-between"
        sx={{ mb: 4, maxWidth: 1094 }}
      >
        <Stack gap={1}>
          <Typography variant="h5">{orgSettings.membersArea.title}</Typography>
          <Typography color="text.secondary">
            {orgSettings.membersArea.subtitle}
          </Typography>
        </Stack>
        <Button>Add member</Button>
      </Stack>
      <WhiteList>
        {members.isLoading ? (
          <>
            <Skeleton sx={{ mx: 2, my: 1 }} />
            <Skeleton sx={{ mx: 2, my: 1 }} />
            <Skeleton sx={{ mx: 2, my: 1 }} />
          </>
        ) : (
          members.data?.map((member) => (
            <div key={member.id}>Heyo {member.user?.gatewayId}</div>
          ))
        )}
      </WhiteList>
    </Box>
  );
}
