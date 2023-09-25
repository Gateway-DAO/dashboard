import { DataModel } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

import { Stack } from '@mui/system';

import RequestDataVerifierView from './request-data-verifier';
import { addDataModelDataToSchema } from './utils';

type Props = {
  schema: any[];
  dataModels: PartialDeep<DataModel>[];
};

export default function RequestDataTableVerifierView({
  schema,
  dataModels,
}: Props) {
  const schemaJoin =
    schema && schema.length > 0
      ? addDataModelDataToSchema(schema, dataModels)
      : schema;
  return (
    <Stack direction="column" gap={2} mt={2}>
      {schemaJoin.map((dataModel: any) => (
        <RequestDataVerifierView key={dataModel.id} dataModel={dataModel} />
      ))}
    </Stack>
  );
}
