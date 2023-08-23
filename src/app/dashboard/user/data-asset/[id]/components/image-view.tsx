import { Maybe } from 'graphql/jsutils/Maybe';

import { Stack } from '@mui/material';

type Props = {
  src: string;
  alt: Maybe<string>;
};

export function ImageView({ src, alt }: Props) {
  return (
    <Stack
      justifyContent="center"
      direction="row"
      sx={{
        background: 'rgba(0,0,0, 0.25)',
        mt: 1.5,
        borderRadius: 1,
        '& > img': {
          maxWidth: 350,
        },
      }}
    >
      <img src={src} alt={alt ?? ''} width="100%" />
    </Stack>
  );
}
