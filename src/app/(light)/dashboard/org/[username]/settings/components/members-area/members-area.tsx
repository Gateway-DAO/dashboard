'use client';

import { useSession } from 'next-auth/react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import WhiteList from '@/components/white-list/white-list';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { orgSettings } from '@/locale/en/settings';
import { OrganizationRole } from '@/services/protocol/types';
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  Box,
  Button,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import ManageMemberButton from './manage-member-button';

export default function MembersArea() {
  const { data: session } = useSession();
  const { organization } = useOrganization();
  const { privateApi } = useGtwSession();
  const members = useQuery({
    queryKey: ['organization-members', organization?.id],
    queryFn: () =>
      privateApi.organization_members({ id: organization?.id ?? '' }),
    enabled: !!organization?.id,
    select: (data) => data.organization?.accesses,
  });

  const changeRole = useMutation({
    mutationKey: ['change-role', organization?.id],
    mutationFn: ({
      userId,
      role,
    }: {
      userId: string;
      role: OrganizationRole;
    }) =>
      privateApi.update_org_user_role({
        id: organization?.id ?? '',
        userId,
        role,
      }),
  });

  const removeUser = useMutation({
    mutationKey: ['remove-user', organization?.id],
    mutationFn: (userId: string) =>
      privateApi.remove_org_user({
        id: organization?.id ?? '',
        userId,
      }),
  });

  const canChangeRole = members.data?.some((member) => {
    if (member.user.id === session?.user?.id) {
      return (
        member.role === OrganizationRole.Admin ||
        member.role === OrganizationRole.Owner
      );
    }
  });

  const onChangeRole = async (userId: string, role: OrganizationRole) => {
    await changeRole.mutateAsync({ userId, role });
    await members.refetch();
  };

  const onRemoveUser = async (userId: string) => {
    await removeUser.mutateAsync(userId);
    await members.refetch();
  };

  const isMutating =
    changeRole.isLoading || removeUser.isLoading || members.isRefetching;

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

      {members.isLoading ? (
        <WhiteList>
          <Skeleton sx={{ mx: 2, my: 1 }} />
          <Skeleton sx={{ mx: 2, my: 1 }} />
          <Skeleton sx={{ mx: 2, my: 1 }} />
        </WhiteList>
      ) : (
        <>
          {members.data?.length === 0 ? (
            <div>empty</div>
          ) : (
            <WhiteList
              sx={{
                pointerEvents: isMutating ? 'none' : 'auto',
                opacity: isMutating ? 0.5 : 1,
              }}
            >
              {members.data?.map((member) => (
                <ListItem
                  key={member?.id}
                  secondaryAction={
                    <>
                      {member.role !== OrganizationRole.Member && (
                        <Chip
                          label={member.role}
                          size="small"
                          color="primary"
                          sx={{
                            mr: () => {
                              if (!canChangeRole) return 0;
                              if (member.role === OrganizationRole.Owner)
                                return 6;
                              return 1;
                            },
                          }}
                        />
                      )}
                      {canChangeRole &&
                        member.role !== OrganizationRole.Owner && (
                          <ManageMemberButton
                            userId={member.user.id}
                            role={member.role}
                            onChangeRole={onChangeRole}
                            onRemoveUser={onRemoveUser}
                          />
                        )}
                    </>
                  }
                >
                  <ListItemAvatar>
                    <GTWAvatar
                      name={member?.user?.id}
                      alt={member?.user?.displayName ?? member?.user?.gatewayId}
                      src={member?.user?.profilePicture}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      member?.user?.displayName ?? member?.user?.gatewayId
                    }
                    secondary={
                      member?.user?.displayName ? member?.user?.gatewayId : null
                    }
                  />
                </ListItem>
              ))}
            </WhiteList>
          )}
        </>
      )}
    </Box>
  );
}
