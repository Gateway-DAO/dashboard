import { Stack } from '@mui/material';

import EditAvatar from './components/edit-avatar/edit-avatar';
import { EditMetaInfo } from './components/edit-meta-info';

export function EditProfileCard() {
  const onSubmit = async (profilePicture: Blob) => {};
  return (
    <>
      <Stack
        width={591}
        height="auto"
        bgcolor={'primary.light'}
        padding={2}
        borderRadius={1.2}
      >
        <EditAvatar name="profile-picture" id="pfp" onChange={onSubmit} />
        <EditMetaInfo />
      </Stack>
    </>
  );
}
