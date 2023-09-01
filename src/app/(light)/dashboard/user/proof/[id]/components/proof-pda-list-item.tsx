import Link from 'next/link';

import { AvatarFile } from '@/components/avatar-file/avatar-file';

import { CardActionArea, Stack, Typography } from '@mui/material';

type Props = {
  href?: string;
  onClick?: () => void;
  issuerName: string;
  issuerImage?: string | null;
  name: string;
};

export default function ProofPdaListItem({
  name,
  issuerImage,
  issuerName,
  href,
  onClick,
}: Props) {
  return (
    <Stack
      sx={{
        width: '100%',
      }}
    >
      <CardActionArea
        {...(href && {
          component: Link,
          href: href,
        })}
        onClick={onClick}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 2,
          height: '100%',
          gap: 2,
        }}
        title={name}
      >
        <Typography fontWeight={700} sx={{ flexGrow: 1 }}>
          {name}
        </Typography>

        <Stack direction="row" alignItems="center" gap={1.5}>
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {issuerName}
          </Typography>
          <AvatarFile file={issuerImage} sx={{ width: 32, height: 32 }} />
        </Stack>
      </CardActionArea>
    </Stack>
  );
}
