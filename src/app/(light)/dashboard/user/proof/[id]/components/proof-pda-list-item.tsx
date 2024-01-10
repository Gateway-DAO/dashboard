import Link from 'next/link';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';

import { CardActionArea, Stack, Typography } from '@mui/material';

type Props = {
  href?: string;
  onClick?: () => void;
  issuerName: string;
  issuerId: string;
  issuerImage?: string | null;
  name: string;
};

export default function ProofPdaListItem({
  name,
  issuerImage,
  issuerId,
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
          <GTWAvatar
            src={issuerImage}
            alt={issuerName}
            name={issuerId}
            size={32}
          />
        </Stack>
      </CardActionArea>
    </Stack>
  );
}
