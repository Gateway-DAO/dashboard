import Link from 'next/link';

import {
  Box,
  Container,
  Link as MuiLink,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';

import InfoCard from '../info-card/info-card';

type Props = {
  title: string;
  subtitle?: string;
  help?: string;
  helpLink?: string;
  infoCard?: boolean;
  sx?: SxProps;
};

export default function ExplorerHero({
  title,
  subtitle,
  help,
  helpLink,
  infoCard,
  sx,
}: Props) {
  return (
    <Box
      sx={{
        pt: 21,
        pb: 6,
        ...sx,
      }}
    >
      <Stack
        component={Container}
        maxWidth="xl"
        justifyContent="space-between"
        direction="row"
        gap={2}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
              md: 'calc(50% - 16px)',
              lg: '50%',
            },
          }}
        >
          <Typography component="h1" variant="h2" fontWeight="300" mb={2}>
            {title}
          </Typography>
          <Typography color="text.secondary" mb={3}>
            {subtitle}
          </Typography>
          {help && (
            <MuiLink
              component={Link}
              href={helpLink ?? '/'}
              fontWeight="700"
              underline="hover"
              target="_blank"
            >
              {help}
            </MuiLink>
          )}
        </Box>
        {infoCard && (
          <InfoCard
            sx={{
              width: {
                md: 'calc(50% - 16px)',
                lg: 'calc(25% - 16px)',
              },
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          />
        )}
      </Stack>
    </Box>
  );
}
