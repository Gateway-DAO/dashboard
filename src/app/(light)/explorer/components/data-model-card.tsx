import Link from 'next/link';
import { PropsWithChildren } from 'react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import routes from '@/constants/routes';
import { DataModel } from '@/services/protocol/types';
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
  dataModel?: PartialDeep<DataModel>;
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
        href={routes.explorerDataModel(id)}
        sx={style}
      >
        {children}
      </CardActionArea>
    );
  }

  return <Stack sx={style}>{children}</Stack>;
}

export default function DataModelExplorerCard({
  withLink = true,
  dataModel,
  ...props
}: Props & CardProps) {
  let ownerImage = dataModel?.createdBy?.profilePicture;
  let ownerName =
    dataModel?.createdBy?.displayName ?? dataModel?.createdBy?.gatewayId;

  if (dataModel?.organization) {
    ownerImage = dataModel.organization.image;
    ownerName = dataModel.organization.name ?? dataModel.organization.gatewayId;
  }

  return (
    <Card variant="outlined" {...props}>
      <CardContainer withLink={withLink} id={dataModel?.id}>
        <Stack direction="column" gap={3}>
          <Stack direction="row" gap={1} alignItems="center">
            <GTWAvatar src={ownerImage} name={ownerName} />
            <Typography variant="body2">{ownerName}</Typography>
          </Stack>
          <Stack direction="column" gap={0.5}>
            <Typography variant="subtitle1" fontWeight="bold">
              {dataModel?.title}
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
              {dataModel?.description}
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
          {dataModel?.consumptionPrice ? (
            <Typography variant="subtitle2" fontWeight="400">
              <b>
                {dataModel?.consumptionPrice?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </b>{' '}
              per consumption
            </Typography>
          ) : (
            <span />
          )}
          <Typography
            variant="subtitle2"
            fontWeight="400"
            justifySelf="flex-end"
          >
            <b>
              {dataModel?.pdasIssuedCount
                ? Intl.NumberFormat('en-US', { notation: 'compact' }).format(
                    dataModel.pdasIssuedCount
                  )
                : 0}
            </b>{' '}
            issuances
          </Typography>
        </Box>
      </CardContainer>
    </Card>
  );
}
