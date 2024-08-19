import dynamic from 'next/dynamic';
import Link from 'next/link';

import GTWLink from '@/components/gtw-link';
import GatewaySquaredThemedIcon from '@/components/icons/gateway-squared-themed';
import documentationRoutes from '@/constants/documentationRoutes';
import externalLinks from '@/constants/externalLinks';
import routes from '@/constants/routes';
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';

const EmailSubscription = dynamic(() => import('./email-subscription'));

const socialLinks = [
  {
    name: 'Twitter',
    href: externalLinks.gateway_twitter,
    icon: FaTwitter,
  },
  {
    name: 'Discord',
    href: externalLinks.gateway_discord,
    icon: FaDiscord,
  },
  {
    name: 'LinkedIn',
    href: externalLinks.gateway_linkedin,
    icon: FaLinkedin,
  },
  {
    name: 'GitHub',
    href: externalLinks.gateway_github,
    icon: FaGithub,
  },
];

const links = [
  {
    name: 'Docs',
    href: documentationRoutes.home,
    target: '_blank',
  },
  {
    name: 'Blog',
    href: routes.blog,
  },
  {
    name: 'Ecosystem',
    href: routes.ecosystem,
  },
  {
    name: 'Explorer',
    href: routes.explorer.root,
  },
  {
    name: 'Dashboard',
    href: routes.dashboard.user.home,
  },
  {
    name: 'Privacy Policy',
    href: routes.privacyPolicy,
  },
  {
    name: 'Terms of Service',
    href: routes.termsOfService,
  },
  {
    name: 'Brand Kit',
    href: externalLinks.gateway_brandkit,
  },
  {
    name: 'Contact',
    href: externalLinks.join_testnet,
  },
];

export default function FooterContent() {
  return (
    <Stack
      component={Paper}
      elevation={0}
      sx={{
        backgroundColor: 'primary.100',
        p: {
          xs: 3,
          md: 4,
        },
        gap: 3,
      }}
    >
      <GatewaySquaredThemedIcon
        theme="light"
        sx={{
          height: {
            xs: 48,
            md: 72,
          },
          width: {
            xs: 48,
            md: 72,
          },
        }}
      />
      <Stack
        flexDirection={{
          xs: 'column',
          md: 'row',
        }}
        gap={4}
      >
        <Stack
          gap={{
            xs: 3,
            md: 4,
          }}
        >
          <Typography variant="body2">
            © 2024 Gateway Inc. All rights reserved.
          </Typography>
          <Stack direction="row" gap={1}>
            {socialLinks.map((link) => (
              <IconButton
                component={Link}
                key={link.name}
                href={link.href}
                target="_blank"
                sx={{
                  backgroundColor: 'white.main',
                  borderRadius: 0.5,
                  color: 'primary.main',
                }}
              >
                <link.icon />
              </IconButton>
            ))}
          </Stack>
        </Stack>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateRows: 'repeat(5, 1fr)',
              gridAutoFlow: 'column',
              gap: 1,
              width: {
                xs: 'unset',
                md: 'max-content',
              },
            }}
          >
            {links.map((link) => (
              <GTWLink
                key={link.name}
                component={Link}
                href={link.href}
                target={link.target}
                color="inherit"
                underline="hover"
              >
                {link.name}
              </GTWLink>
            ))}
          </Box>
        </Box>
        {process.env.NODE_ENV !== 'development' && <EmailSubscription />}
      </Stack>
    </Stack>
  );
}
