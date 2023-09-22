import { Stack } from '@mui/material';

import RequestedData from './requested-data';

type Props = {
  schema: any[];
  validData: any[] | null;
};

export default function RequestDataTable({ schema, validData }: Props) {
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
