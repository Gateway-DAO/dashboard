import { pda } from '@/locale/en/pda';

import { ErrorOutline } from '@mui/icons-material';
import { Avatar, Box, Stack, Typography } from '@mui/material';

type Props = {
  error: string;
};

export default function ShareCopyFormError({ error }: Props) {
  return (
    <>
      <Stack>
        <Box sx={{ position: 'absolute', top: { xs: 24, md: 48 } }}>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              color: 'action.active',
              width: 40,
              height: 40,
            }}
          >
            <ErrorOutline />
          </Avatar>
        </Box>
        <Typography
          id="proof-created-title"
          component="h3"
          fontSize={34}
          sx={{ mb: 6 }}
        >
          {pda.share.error_title}
        </Typography>
        <Typography>{error}</Typography>
      </Stack>
    </>
  );
}
