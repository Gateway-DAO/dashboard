import { ReactNode } from 'react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { Account } from '@/services/api/models';

import { Stack, Card, Typography, CardProps } from '@mui/material';

import CardContainer from './data-card-container';

type Props = {
  href?: string;
  profile: Account;
  title: string;
  description: string;
  bottom?: ReactNode;
};

export default function DataCard({
  href,
  profile,
  title,
  description,
  bottom,
  ...props
}: Props & CardProps) {
  const { profile_picture, did, username } = profile;

  return (
    <Card variant="outlined" {...props}>
      <CardContainer href={href}>
        <Stack direction="column" gap={3}>
          <Stack direction="row" gap={1} alignItems="center">
            <GTWAvatar src={profile_picture} name={did} alt={username ?? did} />
            <Typography variant="body2">{username ?? did}</Typography>
          </Stack>
          <Stack direction="column" gap={0.5}>
            <Typography variant="subtitle1" fontWeight="bold">
              {title}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                lineClamp: '2',
                boxOrientation: 'vertical',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {description}
            </Typography>
          </Stack>
        </Stack>
        {bottom}
      </CardContainer>
    </Card>
  );
}
