'use client';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import GatewaySquaredIcon from '@/components/icons/gateway-squared';
import { common } from '@/locale/en/common';

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Stack, Typography, alpha } from '@mui/material';

import Background from './background';
import CloseButton, { CloseButtonProps } from './close-button';

type Props = {
  closeButonProps: CloseButtonProps
}

export default function AuthenticationLayout({ children, closeButonProps }: PropsWithChildren<Props>) {


  return (
    <Stack
      sx={{
        height: '100%',
      }}
      direction="row"
    >
      <Box sx={{
        pt: 6,
        px: { xs: 2, lg: 6 },
        display: 'flex',
        flexDirection: 'column',
        maxWidth: { xs: '100%', lg: '582px' },
        width: '100%',
        height: '100%',
        borderRightWidth: {
          xs: 0,
          lg: 1
        },
        borderRightStyle: {
          xs: "none",
          lg: 'solid'
        },
        borderRightColor: 'divider',
      }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{
          mb: {
            xs: 8,
            lg: 6
          }
        }}>
          <Stack alignItems="center" direction="row" justifySelf="flex-start">
            <GatewaySquaredIcon sx={{ fontSize: 40 }} />
            <Typography component="h1" ml={1} color="black" fontWeight="bold">
              {common.general.gateway}
            </Typography>
          </Stack>
          <CloseButton
            {...closeButonProps}
            sx={{
              display: {
                xs: "flex",
                lg: "none"
              },
            }} />
        </Stack>
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          {children}
        </Box>

      </Box>
      <Box sx={{
        display: {
          xs: "none",
          lg: "flex"
        },
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: theme => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
        p: { xs: 2, lg: 6 },
        alignItems: "stretch",
        justifyContent: "stretch",
        position: "relative",
      }}>
        <CloseButton
          {...closeButonProps}
          sx={{
            position: 'absolute',
            top: { xs: 10, lg: 48 },
            right: { xs: 20, lg: 48 },
            zIndex: 1,
          }} />
        <Background sx={{ flex: 1, height: "100%" }} />
      </Box>
    </Stack>
  );
}
