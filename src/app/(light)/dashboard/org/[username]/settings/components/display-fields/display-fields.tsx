'use client';

import { useSession } from 'next-auth/react';

import useOrganization from '@/hooks/use-organization';

import { Stack } from '@mui/material';

import Avatar from './avatar';
import DisplayFieldsView from './display-fields-view';
import DisplayName from './display-name/display-name';
import DisplayFieldsSkeletons from './skeletons';
import Username from './username/username';

export default function DisplayFields() {
  const { data: session } = useSession();
  const { canEdit } = useOrganization();

  if (!session) {
    return (
      <Stack gap={3} alignItems="stretch">
        <DisplayFieldsSkeletons />
      </Stack>
    );
  }

  if (!canEdit) {
    return (
      <Stack gap={3} alignItems="stretch">
        <DisplayFieldsView />
      </Stack>
    );
  }

  return (
    <Stack gap={3} alignItems="stretch">
      <Avatar />
      <DisplayName />
      <Username />
    </Stack>
  );
}
