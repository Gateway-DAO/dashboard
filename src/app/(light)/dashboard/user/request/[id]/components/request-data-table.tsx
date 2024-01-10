import { DataModel } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

import { Stack } from '@mui/material';

import RequestedData from './requested-data';
import { addDataModelDataToSchema } from './utils';

type Props = {
  schema: any[];
  validData: any[] | null;
  dataModels: PartialDeep<DataModel>[];
};

export default function RequestDataTable({
  schema,
  validData,
  dataModels,
}: Props) {
  const schemaJoin =
    schema && schema.length > 0
      ? addDataModelDataToSchema(schema, dataModels)
      : schema;

  return (
    <Stack direction="column" gap={2} mt={2}>
      {schemaJoin.map((dataModel: any, index: number) => (
        <RequestedData
          key={dataModel.id}
          dataModel={dataModel}
          validDataProvided={validData?.[index]}
        />
      ))}
    </Stack>
  );
}
