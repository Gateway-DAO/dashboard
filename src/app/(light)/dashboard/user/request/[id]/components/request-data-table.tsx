import { Stack } from '@mui/material';

import RequestedData from './requested-data';

type Props = {
  dataModels: any[];
  validData: any[] | null;
};

export default function RequestDataTable({ dataModels, validData }: Props) {
  return (
    <Stack direction="column" gap={2} mt={2}>
      {dataModels.map((dataModel: any, index: number) => (
        <RequestedData
          key={dataModel.id}
          dataModel={dataModel}
          validDataProvided={validData?.[index]}
        />
      ))}
    </Stack>
  );
}
