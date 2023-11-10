import CopyButton from '@/components/copy-button/copy-button';
import { explorerDataModelDetailOverview } from '@/locale/en/datamodel';
import { pda } from '@/locale/en/pda';

import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

import TableSchema from './table-schema';

type Props = {
  schema: any;
};

export default function DataModelClaims({ schema }: Props) {
  return (
    <>
      <Stack
        alignItems="center"
        gap={2}
        justifyContent="space-between"
        direction="row"
        mb={4}
      >
        <Typography variant="h5">{pda.claim}</Typography>
        <CopyButton
          size="small"
          variant="text"
          customButtonText={
            explorerDataModelDetailOverview.actions.copy_claim_structure
          }
          text={JSON.stringify(schema, null, 2)}
        />
      </Stack>
      <TableSchema properties={schema.properties} />
    </>
  );
}
