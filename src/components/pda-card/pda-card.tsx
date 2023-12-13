import Link from 'next/link';

import { Card, CardActionArea, Stack, Typography } from '@mui/material';

import GTWAvatar from '../gtw-avatar/gtw-avatar';
import { TextStatusChip } from '../text-status-chip/text-status-chip';
import { PdaCardProps } from './type';

export default function PdaCard({
  name,
  userId,
  userImage,
  userName,
  dashed,
  href,
  onClick,
  status,
}: PdaCardProps) {
  return (
    <Stack
      component={Card}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      variant="outlined"
      gap={1}
      sx={{
        ...(dashed && { borderStyle: 'dashed' }),
        width: '100%',
      }}
    >
      <CardActionArea
        className="pda-card"
        {...(href && {
          component: Link,
          href: href,
        })}
        onClick={onClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          px: 2,
          pt: 2,
          pb: 3,
          height: '100%',
          gap: 2,
        }}
        title={name}
      >
        <Stack alignItems="flex-start">
          <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 3 }}>
            <GTWAvatar src={userImage} size={32} name={userId} alt={userName} />
            <Typography variant="body2" sx={{ flexGrow: 1 }} noWrap>
              {userName}
            </Typography>
          </Stack>
          <Typography fontWeight={700} className="pda-card-name">
            {name}
          </Typography>
        </Stack>
        <TextStatusChip variant="outlined" status={status} size="small" />
      </CardActionArea>
    </Stack>
  );
}
