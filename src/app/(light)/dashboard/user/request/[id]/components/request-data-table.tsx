import { Stack } from '@mui/material';

import RequestedData from './requested-data';

type Props = {
  dataModels: any[];
};

export default function RequestDataTable({ dataModels }: Props) {
  return (
    <Stack direction="column" gap={2} mt={2}>
      {dataModels.map((dataModel) => (
        <RequestedData key={dataModel.id} dataModel={dataModel} />
      ))}
    </Stack>
  );
}
