import Link from 'next/link';

import {
  Box,
  Card,
  CardActionArea,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';

export default function DataModelPage() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'primary.light',
          pt: 16,
          pb: 6,
        }}
      >
        <Stack
          component={Container}
          maxWidth="xl"
          justifyContent="space-between"
          direction="row"
          gap={2}
        >
          <Box sx={{ flex: 0.75 }}>
            <Typography component="h1" variant="h2" fontWeight="300" mb={2}>
              Data models
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Data models serve as foundational templates for Private Data
              Assets (PDAs). Each PDA created using a data model adheres to a
              standardized structure of claims, making these frameworks
              exceptionally reusable for various related scenarios.
            </Typography>
            <MuiLink
              component={Link}
              href="/"
              fontWeight="700"
              underline="hover"
            >
              How to use data models
            </MuiLink>
          </Box>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: 'transparent',
              flex: 0.25,
            }}
          >
            <CardActionArea
              component={Link}
              href="/explorer"
              sx={{ height: '100%' }}
            >
              GTW
            </CardActionArea>
          </Card>
        </Stack>
      </Box>
    </>
  );
}
