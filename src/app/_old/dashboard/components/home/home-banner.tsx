'use client';

import Link from 'next/link';

import DataSquaredIcon from '@/components/icons/data-squared';
import useGaEvent from '@/hooks/use-ga-event';

import { Box, Button, Stack, Typography } from '@mui/material';

import { HomeBannerProps } from './types';

export default function HomeBanner({
  icon: Icon,
  title,
  subtitle,
  btn_link,
  btn_text,
}: HomeBannerProps) {
  const { sendEvent } = useGaEvent();

  return (
    <Stack
      component={Link}
      href={btn_link}
      direction={{
        xs: 'column',
        lg: 'row',
      }}
      justifyContent="space-between"
      sx={{
        p: 2,
        boxShadow: 'none',
        backgroundColor: 'primary.main',
        width: '100%',
        textDecoration: 'none',
        borderRadius: 1,
        gap: 2,
      }}
    >
      <Box>
        <Icon sx={{ width: 40, height: 40, mb: 3 }} />
        <Typography variant="h5" color="common.white" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="common.white" sx={{ flexGrow: 1 }}>
          {subtitle}
        </Typography>
      </Box>
      <Button
        component="span"
        variant="contained"
        onClick={() => sendEvent('click_issue_now_home')}
        sx={{
          backgroundColor: 'common.white',
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'common.white',
            color: 'primary.dark',
          },
          alignSelf: 'flex-end',
        }}
      >
        {btn_text}
      </Button>
    </Stack>
  );
}
