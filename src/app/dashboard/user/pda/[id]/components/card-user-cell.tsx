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
  margin?: boolean;
};

export default function CardUserCell({
  label,
  name,
  picture,
  fallback,
  alignRight = false,
  hasLink = false,
  id,
}: Props) {
  return (
    <Stack
      sx={{
        flexDirection: { xs: 'row', md: alignRight ? 'row-reverse' : 'row' },
        alignItems: 'center',
        flexBasis: '100%',
        cursor: hasLink ? 'pointer' : 'default',
        borderRadius: {
          xs: '8px 8px 0 0',
          md: alignRight ? '0 8px 0 0' : '8px 0 0 0',
        },
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
        sx={{
          ml: { xs: 2, md: alignRight ? 0 : 2 },
          mr: { xs: 0, md: alignRight ? 2 : 0 },
        }}
      >
        {name}
      </AvatarFile>
      <CardCell label={label} alignRight={alignRight} margin={false}>
        {hasLink ? (
          <Stack
            title={`${label} ${name}`}
            sx={{ color: 'primary', textDecoration: 'none' }}
          >
            {name}
          </Stack>
        ) : (
          <Typography fontWeight={600}>{name}</Typography>
        )}
      </CardCell>
    </Stack>
  );
}
