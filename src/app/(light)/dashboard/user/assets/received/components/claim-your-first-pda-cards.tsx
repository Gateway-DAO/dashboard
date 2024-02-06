'use client';

import { FC } from 'react';

import { Card, Stack, SvgIconProps, Typography, alpha } from '@mui/material';

type Props = {
  cards: { title: string; icon: FC<SvgIconProps> }[];
};

export default function ClaimYourFirstPdaCards({ cards }: Props) {
  return (
    <>
      {cards?.map((card, i) => {
        const Icon = card.icon;
        return (
          <Stack
            key={i}
            component={Card}
            alignItems="center"
            justifyContent="center"
            gap={2}
            sx={(theme) => ({
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
              textAlign: 'center',
              p: 3,
              minHeight: 162,
              width: '100%',
              boxShadow: 'none',
            })}
          >
            <Icon sx={{ height: 49, width: 'auto', maxWidth: 90 }} />
            <Typography>{card.title}</Typography>
          </Stack>
        );
      })}
    </>
  );
}
