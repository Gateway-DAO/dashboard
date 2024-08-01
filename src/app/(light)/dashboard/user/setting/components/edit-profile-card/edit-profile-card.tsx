import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Badge, IconButton, Paper, Stack } from '@mui/material';

import { EditMetaInfo } from './components/edit-meta-info';

export function EditProfileCard() {
  return (
    <>
      <Stack
        width={591}
        height="auto"
        bgcolor={'primary.light'}
        padding={2}
        borderRadius={1.2}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          badgeContent={
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          }
        >
          <Avatar
            sx={{ width: 60, height: 60 }}
            alt="Edit Picture"
            src="avatar.png"
          />
        </Badge>

        <EditMetaInfo />
      </Stack>
    </>
  );
}
