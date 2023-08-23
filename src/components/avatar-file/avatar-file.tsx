import { useFile } from '@/hooks/use-file';
import { PartialDeep } from 'type-fest';

import { Avatar, AvatarProps, SxProps } from '@mui/material';

type AvatarFileProps<
  Component extends React.ElementType = 'div',
  Props = Record<string, unknown>
> = {
  file: PartialDeep<any>;
  fallback?: string;
  sxProps?: SxProps;
} & AvatarProps<Component, Props>;

/* Avatar with File image */
export function AvatarFile<Component extends React.ElementType>({
  file,
  fallback = '/logo.png',
  sxProps,
  ...props
}: AvatarFileProps<Component, { component?: Component }>) {
  const image = useFile(file);
  const src = image?.url ?? fallback;

  return (
    <Avatar
      sx={{
        ...props?.sx,
        ...image?.background,
        ...sxProps,
      }}
      src={src}
    />
  );
}
