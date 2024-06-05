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
  const { image: avatar, name, username: gatewayId } = profile;

  return (
    <Card variant="outlined" sx={{ height: 500, p: 0 }} {...props}>
      <CardContainer href={href} sx={{ p: 0, gap: 2 }}>
        <Stack
          sx={{
            width: '100%',
            height: 230,
            overflow: 'hidden',
            background: image
              ? `url(${image}) no-repeat`
              : 'linear-gradient(242deg, rgba(35,34,157,1) 0%, rgba(83,18,140,1) 54%, rgba(141,77,181,1) 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Stack sx={{ px: 2, pb: 2, height: 270 }}>
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
