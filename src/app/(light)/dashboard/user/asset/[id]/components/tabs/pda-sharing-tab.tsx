import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { ChevronRightOutlined } from '@mui/icons-material';
import { Typography, IconButton, Divider } from '@mui/material';
import { Stack } from '@mui/system';
import { IndividualDetailRow } from './pda-tabs';

export default function PDASharingTab({ pda }: { pda: any }) {
  return (
    <IndividualDetailRow>
      {pda.sharing.map((user: any) => {
        return (
          <>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              sx={{ mt: 1, mb: 2, width: '47%' }}
            >
              <Stack direction={'row'}>
                <GTWAvatar name={user.did} size={45} />
                <Typography
                  variant="body1"
                  fontWeight={400}
                  sx={{ mt: 1, mx: 3 }}
                >
                  {user.username}
                </Typography>
              </Stack>
              <IconButton>
                <ChevronRightOutlined />
              </IconButton>
            </Stack>
            <Divider />
          </>
        );
      })}
    </IndividualDetailRow>
  );
}
