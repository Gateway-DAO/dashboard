import { DataModel } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

import { Stack } from '@mui/material';

import RequestedData from './requested-data';

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
  if (schema && schema.length > 0) {
    console.log('entrei no if');
    for (const schemaItem of schema) {
      const matchingDataModel = dataModels?.find(
        (dataModel) => dataModel.id === schemaItem.id
      );
      console.log('tô no for', matchingDataModel);
      if (matchingDataModel) {
        schemaItem.title = matchingDataModel.title;
        schemaItem.schema = matchingDataModel.schema;
      }
    }
  }

  console.log(schema);

  return (
    <Stack direction="column" gap={2} mt={2}>
      {schema.map((dataModel: any, index: number) => (
        <RequestedData
          key={dataModel.id}
          dataModel={dataModel}
          validDataProvided={validData?.[index]}
        />
      ))}
    </Stack>
  );
}
