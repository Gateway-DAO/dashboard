'use client';

import { FC, useEffect, useState } from 'react';

import useHelpCard from '@/hooks/use-help-card';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  Card,
  SvgIconProps,
  alpha,
} from '@mui/material';

type Props = {
  storageKey: string;
  icon: FC<SvgIconProps>;
  title: string;
  desc?: string;
  image: FC<SvgIconProps>;
  onClick: () => void;
  btnText: string;
  color?: 'purple' | 'blue';
};

export default function HelpCtaCard({
  storageKey,
  icon,
  title,
  desc,
  image,
  onClick,
  btnText,
  color = 'purple',
}: Props) {
  const { visible, onRemoveStorage } = useHelpCard({ storageKey });

  const ImageCard = image;
  const IconCard = icon;

  return (
    visible && (
      <Stack
        component={Card}
        position={'relative'}
        onClick={onClick}
        sx={(theme) => ({
          mb: 3,
          p: 2,
          boxShadow: 'none',
          width: '100%',
          justifyContent: 'space-between',
          backgroundColor:
            color === 'purple'
              ? alpha(
                  theme.palette.primary.main,
                  theme.palette.action.focusOpacity
                )
              : '#69DCED26',
          cursor: 'pointer',
        })}
      >
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemoveStorage();
          }}
          sx={{ position: 'absolute', top: 20, right: 20 }}
        >
          <CloseIcon />
        </IconButton>
        <IconCard sx={{ width: 40, height: 40, mb: 1 }} />
        <Stack
          alignItems="stretch"
          gap={2}
          sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}
        >
          <Stack width="100%">
            <Typography
              variant="h5"
              gutterBottom
              sx={{ flexGrow: desc ? 0 : 1 }}
            >
              {title}
            </Typography>
            {desc && (
              <Typography variant="body1" sx={{ mb: 3, flexGrow: 1 }}>
                {desc}
              </Typography>
            )}
            <Box>
              <Button
                variant="outlined"
                color={color === 'purple' ? 'primary' : 'info'}
              >
                {btnText}
              </Button>
            </Box>
          </Stack>
          <Box>
            <ImageCard
              sx={{
                width: { xs: '100%', md: 220 },
                height: { xs: 'auto', md: 128 },
              }}
            />
          </Box>
        </Stack>
      </Stack>
    )
  );
}
