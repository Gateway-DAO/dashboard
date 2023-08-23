'use client';
import { AvatarFile } from '@/components/avatar-file/avatar-file';
import CardCell from '@/components/card-cell/card-cell';

import { Stack, Typography } from '@mui/material';

type Props = {
  label: string;
  name: string;
  picture: any;
  alignRight?: boolean;
  id?: string;
  margin?: boolean;
  active: boolean;
  onClick: () => void;
};

export default function CardUserCell({
  label,
  name,
  picture,
  alignRight = false,
  id,
  active = false,
  onClick,
}: Props) {
  return (
    <Stack
      sx={{
        flexDirection: {
          xs: 'row',
          md: alignRight ? 'row-reverse' : 'row',
        },
        alignItems: 'center',
        flexBasis: '100%',
        cursor: 'pointer',
        textDecoration: 'none',
        borderRadius: {
          xs: '8px 8px 0 0',
          md: alignRight ? '0 8px 0 0' : '8px 0 0 0',
        },
        transition: 'opacity .3s ease',
        opacity: active ? 0.5 : 'inherit',
        '&:hover': {
          opacity: 0.5,
        },
      }}
      id={id}
      onClick={onClick}
    >
      <AvatarFile
        file={picture}
        fallback={'/avatar.png'}
        sx={{
          ml: { xs: 2, md: alignRight ? 0 : 2 },
          mr: { xs: 0, md: alignRight ? 2 : 0 },
        }}
      >
        {name}
      </AvatarFile>
      <CardCell label={label} alignRight={alignRight} margin={false}>
        <Typography fontWeight={600} sx={{ color: 'text.primary' }}>
          {name}
        </Typography>
      </CardCell>
    </Stack>
  );
}
