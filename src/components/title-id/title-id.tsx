import { Stack, Typography } from '@mui/material';

import CopyTextButton from '../copy-text-button/copy-text-button';

type Props = {
  title: string;
  id: string;
};

export function TitleId({ title, id }: Props) {
  return (
    <>
      <Stack direction="row" alignItems="center" sx={{ mt: 4 }}>
        <Typography variant="body2">ID</Typography>
        <CopyTextButton text={id} limit={6} size={14} />
      </Stack>
      <Typography variant="h3" component="h2" sx={{ mb: 5 }}>
        {title}
      </Typography>
    </>
  );
}
