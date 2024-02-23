'use client';

import Link from 'next/link';

import DataSquaredIcon from '@/components/icons/data-squared';
import useGaEvent from '@/hooks/use-ga-event';

import { Box, Button, Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  desc: string;
  btnLink: string;
  btnText: string;
};

export default function IssueNowCard({ title, desc, btnLink, btnText }: Props) {
  const { sendEvent } = useGaEvent();

  return (
    <Stack
      component={Link}
      href={btnLink}
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
        <DataSquaredIcon sx={{ width: 40, height: 40, mb: 3 }} />
        <Typography variant="h5" color="common.white" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="common.white" sx={{ flexGrow: 1 }}>
          {desc}
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
        {btnText}
      </Button>
    </Stack>
  );
}
