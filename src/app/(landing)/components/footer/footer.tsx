import { Container, Stack } from '@mui/material';

import Investors from './investors';

export default function Footer() {
  return (
    <Container
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
      }}
    >
      <Stack
        sx={{
          pt: {
            xs: 6,
            md: 10,
          },
          pb: {
            xs: 6,
            md: 20,
          },
          gap: {
            xs: 6,
            md: 10,
          },
        }}
      >
        <Investors />
      </Stack>
    </Container>
  );
}
