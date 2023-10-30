import Link from 'next/link';

import GTWLogo from '@/components/gtw-logo/gtw-logo';
import routes from '@/constants/routes';

import { OpenInNew } from '@mui/icons-material';
import { Box, Link as MuiLink, Chip, Container, Stack } from '@mui/material';

import ToDashboardLink from './to-dashboard-link';

export default function ExplorerNavbar() {
  return (
    <Box
      component="nav"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          direction: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 5,
        }}
      >
        <Stack alignItems="center" direction="row" gap={2}>
          <Box
            component={Link}
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
            href="/explorer"
          >
            <GTWLogo />
            <Chip
              size="small"
              color="primary"
              label="Explorer"
              sx={{ ml: 1 }}
            />
          </Box>
          <Stack
            direction="row"
            gap={2}
            justifyContent="center"
            sx={{
              display: {
                xs: 'none',
                lg: 'flex',
              },
            }}
          >
            <MuiLink
              component={Link}
              href={routes.explorer.transactions}
              color="black"
              underline="hover"
              fontWeight="700"
            >
              Transactions
            </MuiLink>
            <MuiLink
              component={Link}
              href={routes.explorer.dataModels}
              color="black"
              underline="hover"
              fontWeight="700"
            >
              Data models
            </MuiLink>
            <MuiLink
              component={Link}
              href={routes.explorer.dataRequestTemplates}
              color="black"
              underline="hover"
              fontWeight="700"
            >
              Data request templates
            </MuiLink>
            <MuiLink
              component={Link}
              href="/explorer/"
              target="_blank"
              color="black"
              underline="hover"
              fontWeight="700"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              Docs <OpenInNew fontSize="medium" sx={{ ml: 1 }} />
            </MuiLink>
          </Stack>
        </Stack>
        <ToDashboardLink />
      </Container>
    </Box>
  );
}
