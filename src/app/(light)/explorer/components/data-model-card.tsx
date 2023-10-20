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
    gap: 3,
    p: 2,
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
}: Props) {
  return (
    <Card variant="outlined">
      <CardContainer withLink={withLink} id={dataModel?.id}>
        <Stack direction="row" gap={1} alignItems="center">
          <GTWAvatar />
          <Typography variant="body2">Gateway Network</Typography>
        </Stack>
        <Stack direction="column" gap={0.5}>
          <Typography variant="subtitle1" fontWeight="bold">
            Credit Card Transactions
          </Typography>
          <Typography color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor...
          </Typography>
        </Stack>
        <Stack direction="row" gap={1} justifyContent="space-between">
          <Typography variant="subtitle2" fontWeight="400">
            <b>$0.01</b> per consumption
          </Typography>
          <Typography variant="subtitle2" fontWeight="400">
            <b>90.5k</b> issuances
          </Typography>
        </Stack>
      </CardContainer>
    </Card>
  );
}
