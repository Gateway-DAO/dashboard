import Link from 'next/link';

import routes from '@/constants/routes';

import { OpenInNew } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardProps,
  Stack,
  Typography,
} from '@mui/material';

type Props = CardProps;

export default function InfoCard(props: Props) {
  return (
    <Card
      variant="outlined"
      {...props}
      sx={{
        backgroundColor: 'transparent',
        ...props.sx,
      }}
    >
      <CardActionArea
        component={Link}
        href={routes.build}
        sx={{ height: '100%', p: 2 }}
      >
        <Stack
          direction="column"
          alignItems="stretch"
          justifyContent="space-between"
          gap={1}
          height="100%"
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <Typography variant="subtitle1">
              Start building with Gateway
            </Typography>
            <OpenInNew fontSize="small" />
          </Stack>
          <Typography variant="body2">
            Gateway is the foundation to securely create, own, manage, and
            verify personal data assets (PDAs) across the digital world.
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
