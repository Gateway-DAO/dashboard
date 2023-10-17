import Link from 'next/link';

import GatewayIcon from '@/components/icons/gateway-squared';
import { brandColors } from '@/theme/config/brand';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';

import { LinkedIn } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';

const socials = [
  {
    icon: FaTwitter,
    href: '/',
    name: 'Twitter',
  },
  {
    icon: FaDiscord,
    href: '/',
    name: 'Discord',
  },
  {
    icon: LinkedIn,
    href: '/',
    name: 'LinkedIn',
  },
  {
    icon: SiSubstack,
    href: '/',
    name: 'Substack',
  },
  {
    icon: FaGithub,
    href: '/',
    name: 'Github',
  },
];

export default function ExplorerFooter() {
  return (
    <Stack
      component="footer"
      direction="column"
      sx={{
        backgroundColor: 'primary.light',
        py: 5,
        px: 4,
        borderRadius: 1,
      }}
    >
      <GatewayIcon
        sx={{ width: 74, height: 74 }}
        backgroundProps={{
          fill: brandColors.primary,
          fillOpacity: 1,
        }}
        shapeProps={{
          fill: brandColors.primaryLight,
        }}
      />
      <Stack
        justifyContent="space-between"
        sx={{
          mt: 3,
          flexDirection: {
            xs: 'column',
            lg: 'row',
          },
          gap: {
            xs: 3,
            lg: 2,
          },
        }}
      >
        <Stack direction="column" gap={3}>
          <Typography>© 2023 Gateway Inc. All rights reserved.</Typography>
          <Stack
            component="ul"
            direction="row"
            gap={1}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {socials.map(({ icon: Icon, href, name }) => (
              <li key={name}>
                <Avatar
                  component={Link}
                  href={href}
                  title={name}
                  target="_blank"
                  variant="rounded"
                  sx={{ background: 'white', color: 'primary.main' }}
                >
                  <Icon />
                </Avatar>
              </li>
            ))}
          </Stack>
        </Stack>
        <Box
          component="ul"
          sx={{
            display: 'grid',
            gridTemplateRows: 'repeat(5, 1fr)',
            gridAutoFlow: 'column',
            listStyle: 'none',
            columnGap: 5,
            p: 0,
            m: 0,
          }}
        >
          {[
            {
              title: 'Home',
              href: '/',
            },
            {
              title: 'Learn',
              href: '/',
            },
            {
              title: 'Build',
              href: '/',
            },
            {
              title: 'Explorer',
              href: '/',
            },
            {
              title: 'Dashboard',
              href: '/',
            },
            {
              title: 'Privacy',
              href: '/',
            },
            {
              title: 'Terms & Conditions',
              href: '/',
            },
            {
              title: 'Brand Kit',
              href: '/',
            },
            {
              title: 'Contact',
              href: '/',
            },
          ].map(({ title, href }) => (
            <Box key={title} component="li">
              <MuiLink
                component={Link}
                href={href}
                color="black"
                underline="hover"
              >
                {title}
              </MuiLink>
            </Box>
          ))}
        </Box>
        <Stack direction="column" gap={1}>
          <Typography variant="body1" fontWeight="700" sx={{ mb: 1 }}>
            Subscribe to our newsletter
          </Typography>
          <Typography>Receive news about developments and updates.</Typography>
          <TextField placeholder="Email" label="Email"></TextField>
          <Button
            type="button"
            variant="contained"
            sx={{ alignSelf: 'flex-start' }}
            size="large"
          >
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
