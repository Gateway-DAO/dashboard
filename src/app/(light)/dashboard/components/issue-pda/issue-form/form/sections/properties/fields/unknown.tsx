/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

import ErrorMessage from '@/components/form/error-message/error-message';
import routes from '@/constants/routes';
import { useController, useFormContext } from 'react-hook-form';

import { Link as MuiLink, Typography } from '@mui/material';

import { PropertyField } from './type';

export default function UnknownProperty({ id, ...property }: PropertyField) {
  const { control } = useFormContext();
  const {
    fieldState: { error },
  } = useController({
    name: `claim.${id}`,
    control,
  });

  return (
    <>
      <Typography variant="body2">
        We currently don't support the field type{' '}
        <b>"{property.type ?? 'empty'}"</b> for the field <b>"{id}"</b> on the
        no-code issuance. Please use the{' '}
        <MuiLink component={Link} href={routes.dashboard.user.developerAccess}>
          API
        </MuiLink>{' '}
        to issue using this data model.
      </Typography>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </>
  );
}
