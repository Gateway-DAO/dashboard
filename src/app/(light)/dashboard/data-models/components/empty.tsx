import { Typography } from '@mui/material';

export default function Empty() {
  return (
    <Typography
      color="text.secondary"
      sx={{
        textAlign: 'center',
        width: '100%',
        pt: 16,
      }}
    >
      No data model yet
    </Typography>
  );
}
