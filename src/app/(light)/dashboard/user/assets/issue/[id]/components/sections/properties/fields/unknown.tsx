import Link from 'next/link';

import routes from '@/constants/routes';

import { Link as MuiLink, Typography } from '@mui/material';

import { PropertyField } from './type';

export default function UnknownProperty({ id, ...property }: PropertyField) {
  return (
    <Typography variant="body2">
      We currently don't support the field type "{property.type}" on the no-code
      issuance. Please use the{' '}
      <MuiLink component={Link} href={routes.dashboard.user.developerAccess}>
        API
      </MuiLink>{' '}
      to issue using this data model.
    </Typography>
  );
}
