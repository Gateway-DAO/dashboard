import Link from 'next/link';

import routes from '@/constants/routes';

import { Link as MuiLink, Typography } from '@mui/material';

import { PropertyField } from './type';

export default function SchemaErrorProperty({
  id,
  ...property
}: PropertyField) {
  return (
    <Typography variant="body2">
      There is a problem with the schema of the selected data model. Please use
      the{' '}
      <MuiLink component={Link} href={routes.dashboard.user.developerAccess}>
        API
      </MuiLink>{' '}
      to check this data model.
    </Typography>
  );
}
