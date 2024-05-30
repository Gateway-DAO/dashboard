import { ReactNode } from 'react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { GatewayProfile } from '@/utils/get-organization-or-user-data';

import { Stack, Card, Typography, CardProps } from '@mui/material';

import CardContainer from './data-card-container';

type Props = {
  href?: string;
  profile: GatewayProfile;
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
  const { image, name, username: gatewayId } = profile;

  return (
    <Card variant="outlined" {...props}>
      <CardContainer href={href}>
        <Stack direction="column" gap={3}>
          <Stack direction="row" gap={1} alignItems="center">
            <GTWAvatar src={image} name={name ?? gatewayId} />
            <Typography variant="body2">{name ?? gatewayId}</Typography>
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
