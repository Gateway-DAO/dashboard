import GTWLink from '@/components/gtw-link';
import routes from '@/constants/routes';

import { Stack, Typography } from '@mui/material';

type Props = {
  paths: { route?: string; label: string }[];
};

export default function ExplorerBreadcrumb({ paths }: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      divider={<Typography color="text.secondary">/</Typography>}
    >
      <GTWLink
        underline="hover"
        variant="body1"
        href={`${routes.explorer.root}/`}
        color="text.secondary"
      >
        Home
      </GTWLink>
      {paths.map(({ route, label }) =>
        route ? (
          <GTWLink
            underline="hover"
            variant="body1"
            href={route}
            key={label}
            color="text.secondary"
          >
            {label}
          </GTWLink>
        ) : (
          <Typography key={label}>{label}</Typography>
        )
      )}
    </Stack>
  );
}
