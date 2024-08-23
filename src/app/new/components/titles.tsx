import { Box, Typography } from '@mui/material';

export const NewUserTitle = () => (
  <Box>
    <Typography variant="h2" mb={2}>
      Create your Gateway ID
    </Typography>
    <Typography variant="body1">
      The Gateway ID represents your identity. It consists of a username and a
      DID.
    </Typography>
  </Box>
);

export const UserCreatedTitle = () => (
  <Box>
    <Typography variant="h2" mb={2}>
      Your Gateway ID is ready
    </Typography>
    <Typography variant="body1">
      Now you're part of our exclusive community dedicated to safeguarding and
      maximizing the value of the data assets.
    </Typography>
  </Box>
);
