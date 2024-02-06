'use client';

import Link from 'next/link';
import { FC } from 'react';

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
  icon: FC<SvgIconProps>;
  image: FC<SvgIconProps>;
  title: string;
  desc?: string;
  onClick: () => void;
  onCloseCard: () => void;
  btnText: string;
  color?: 'purple' | 'blue';
};

export default function InstructionGuideCard({
  icon,
  title,
  desc,
  image,
  onClick,
  onCloseCard,
  btnText,
  color = 'blue',
}: Props) {
  const ImageCard = image;
  const IconCard = icon;

  return (
    <Stack
      component={Link}
      href="#guide"
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        textDecoration: 'none',
        width: '100%',
        mb: 3,
      }}
    >
      <Stack
        component={Card}
        position={'relative'}
        sx={(theme) => ({
          p: 2,
          height: '100%',
          boxShadow: 'none',
          justifyContent: 'space-between',
          backgroundColor:
            color === 'purple'
              ? alpha(
                  theme.palette.primary.main,
                  theme.palette.action.focusOpacity
                )
              : '#69DCED26',
        })}
      >
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCloseCard();
          }}
          sx={{ position: 'absolute', top: 20, right: 20 }}
        >
          <CloseIcon />
        </IconButton>
        <IconCard sx={{ width: 40, height: 40, mb: 1 }} />
        <Stack
          alignItems="stretch"
          gap={2}
          flexGrow={1}
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
    </Stack>
  );
}
