import Link from 'next/link';

import { AvatarFile } from '@/components/avatar-file/avatar-file';
import CardCell from '@/components/card-cell/card-cell';

import { Stack, Typography } from '@mui/material';

type Props = {
  label: string;
  name: string;
  picture: any; // TODO: Add types
  fallback?: string;
  hasLink?: boolean;
  alignRight?: boolean;
  unique?: boolean;
  id?: string;
};

export default function CardUserCell({
  label,
  name,
  picture,
  fallback,
  alignRight = false,
  hasLink = false,
  unique = false,
  id,
}: Props) {
  return (
    <Stack
      sx={{
        flexDirection: alignRight ? 'row-reverse' : 'row',
        alignItems: 'center',
        flexBasis: '100%',
        cursor: hasLink ? 'pointer' : 'default',
        borderRadius: unique
          ? '16px 16px 0 0'
          : alignRight
          ? '0 16px 0 0'
          : '16px 0 0 0',
        transition: 'background .3s ease',
        '&:hover': {
          background: hasLink ? 'primary' : 'inherit',
        },
      }}
      id={id}
    >
      <AvatarFile
        file={picture}
        fallback={fallback || '/avatar.png'}
        sx={{ ml: alignRight ? 0 : 2, mr: alignRight ? 2 : 0 }}
      >
        {name}
      </AvatarFile>
      <CardCell label={label} alignRight={alignRight}>
        {hasLink ? (
          <Stack
            title={`${label} ${name}`}
            sx={{ color: 'primary', textDecoration: 'none' }}
          >
            {name}
          </Stack>
        ) : (
          <Typography variant="body2">{name}</Typography>
        )}
      </CardCell>
    </Stack>
  );
}
