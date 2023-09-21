'use client';
import CardCell from '@/components/card-cell/card-cell';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';

import { Verified } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

type Props = {
  label: string;
  name: string;
  picture: any;
  alignRight?: boolean;
  id?: string;
  margin?: boolean;
  active: boolean;
  verified?: boolean;
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
  verified = false,
}: Props) {
  console.log(name, label);
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
      <Box
        sx={{
          ml: { xs: 2, md: alignRight ? 0 : 2 },
          mr: { xs: 0, md: alignRight ? 2 : 0 },
        }}
      >
        <GTWAvatar src={picture} name={name} />
      </Box>
      <CardCell label={label} alignRight={alignRight} margin={false}>
        <Box display="flex" gap={1} alignItems="center">
          <Typography fontWeight={600} sx={{ color: 'text.primary' }}>
            {name}
          </Typography>
          {verified && (
            <Verified
              sx={{
                fontSize: 16,
                color: 'primary.main',
              }}
            />
          )}
        </Box>
      </CardCell>
    </Stack>
  );
}
