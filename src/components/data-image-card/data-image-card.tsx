import Image from 'next/image';
import { ReactNode } from 'react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { GatewayProfile } from '@/utils/get-organization-or-user-data';

import { Stack, Card, Typography, CardProps } from '@mui/material';

import CardContainer from '../data-card/data-card-container';

type Props = {
  href?: string;
  profile: GatewayProfile;
  image: string;
  title: string;
  description: string;
  bottom?: ReactNode;
};

export default function DataImageCard({
  href,
  profile,
  title,
  description,
  bottom,
  image,
  ...props
}: Props & CardProps) {
  const { image: avatar, name, gatewayId } = profile;

  return (
    <Card variant="outlined" {...props}>
      <CardContainer href={href} sx={{ p: 0, gap: 2 }}>
        <Image
          src={image}
          alt={title}
          width={343}
          height={230}
          style={{ width: '100%', height: 230 }}
        />
        <Stack sx={{ px: 2, pb: 2, height: '100%' }}>
          <Stack direction="column" gap={3} sx={{ height: '100%' }}>
            <Stack direction="row" gap={1} alignItems="center">
              <GTWAvatar src={avatar} name={name ?? gatewayId} size={32} />
              <Typography variant="body2">{name ?? gatewayId}</Typography>
            </Stack>
            <Stack direction="column" gap={0.5}>
              <Typography variant="subtitle1" fontWeight="bold">
                {title}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
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
        </Stack>
      </CardContainer>
    </Card>
  );
}
