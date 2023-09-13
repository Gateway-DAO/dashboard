import { Skeleton, Stack } from '@mui/material';

type Props = {
  columns?: number;
};

export default function LoadingTable({ columns = 5 }: Props) {
  const arrayColumns = Array.from({ length: columns }, () => 1);

  return (
    <Stack gap={1} sx={{ pt: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={1}
        sx={{ mb: 2 }}
      >
        {arrayColumns.map((item) => (
          <Skeleton key={item} variant="text" height={30} width={100} />
        ))}
      </Stack>
      <Stack gap={1}>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
      </Stack>
    </Stack>
  );
}
