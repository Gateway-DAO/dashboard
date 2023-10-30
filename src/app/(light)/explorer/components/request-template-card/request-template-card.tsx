import Link from 'next/link';
import { PropsWithChildren } from 'react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import routes from '@/constants/routes';
import { explorerDataModelCard } from '@/locale/en/datamodel';
import { DataModel } from '@/services/protocol/types';
import getOrganizationOrUserData from '@/utils/get-organization-or-user-data';
import { PartialDeep } from 'type-fest';

import {
  Stack,
  Card,
  CardActionArea,
  SxProps,
  Typography,
  CardProps,
  Box,
} from '@mui/material';

type Props = {
  withLink?: boolean;
  requestTemplate?: PartialDeep<DataModel>;
};

function CardContainer({
  withLink = true,
  children,
  id,
}: PropsWithChildren<Pick<Props, 'withLink'> & { id?: string }>) {
  const style: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: 3,
    p: 2,
    height: '100%',
  };

  if (withLink) {
    return (
      <CardActionArea
        component={Link}
        href={routes.explorerRequestTemplate(id)}
        sx={style}
      >
        {children}
      </CardActionArea>
    );
  }

  return <Stack sx={style}>{children}</Stack>;
}

export default function RequestTemplateExplorerCard({
  withLink = true,
  requestTemplate,
  ...props
}: Props & CardProps) {
  const { id, image, name, gatewayId } = getOrganizationOrUserData(
    requestTemplate?.createdBy ?? {},
    requestTemplate?.organization
  );

  return (
    <Card variant="outlined" {...props}>
      <CardContainer withLink={withLink} id={requestTemplate?.id}>
        <Stack direction="column" gap={3}>
          <Stack direction="row" gap={1} alignItems="center">
            <GTWAvatar src={image} name={name ?? gatewayId} />
            <Typography variant="body2">{name ?? gatewayId}</Typography>
          </Stack>
          <Stack direction="column" gap={0.5}>
            <Typography variant="subtitle1" fontWeight="bold">
              {requestTemplate?.title}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                '-webkit-line-clamp': '2',
                '-webkit-box-orient': 'vertical',
                lineClamp: '2',
                boxOrientation: 'vertical',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {requestTemplate?.description}
            </Typography>
          </Stack>
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: '1fr 0.8fr',
          }}
        >
          {requestTemplate?.consumptionPrice ? (
            <Typography variant="subtitle2" fontWeight="400">
              <b>
                {requestTemplate?.consumptionPrice?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </b>{' '}
              {explorerDataModelCard.consumption}
            </Typography>
          ) : (
            <span />
          )}
          <Typography
            variant="subtitle2"
            fontWeight="400"
            alignSelf="flex-end"
            justifySelf="flex-end"
          >
            <b>
              {requestTemplate?.pdasIssuedCount
                ? Intl.NumberFormat('en-US', { notation: 'compact' }).format(
                    requestTemplate.pdasIssuedCount
                  )
                : 0}
            </b>{' '}
          </Typography>
        </Box>
      </CardContainer>
    </Card>
  );
}
