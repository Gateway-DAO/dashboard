'use client';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import WhiteList from '@/components/white-list/white-list';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { orgSettings } from '@/locale/en/settings';
import { OrganizationRole } from '@/services/protocol/types';
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  Box,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import AddMember from './add-member';
import ManageMemberButton from './manage-member-button';
import MembersAreaListSkeleton from './skeleton';

export default function MembersArea() {
  const { organization, canEdit } = useOrganization();
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

  const onChangeRole = async (userId: string, role: OrganizationRole) => {
    await changeRole.mutateAsync({ userId, role });
    await members.refetch();
  };

  const onRemoveUser = async (userId: string) => {
    await removeUser.mutateAsync(userId);
    await members.refetch();
  };

  const isMutating =
    changeRole.isLoading ||
    removeUser.isLoading ||
    members.isLoading ||
    members.isRefetching;

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
          {canEdit && (
            <Typography color="text.secondary">
              {orgSettings.membersArea.subtitle}
            </Typography>
          )}
        </Stack>
        {canEdit && (
          <AddMember disabled={isMutating} onSuccess={members.refetch} />
        )}
      </Stack>

      {members.isLoading ? (
        <MembersAreaListSkeleton />
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
                            mr: !canEdit
                              ? 0
                              : member.role === OrganizationRole.Owner
                              ? 6
                              : 1,
                          }}
                        />
                      )}
                      {canEdit && member.role !== OrganizationRole.Owner && (
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
