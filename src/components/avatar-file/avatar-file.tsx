import { useFile } from '@/hooks/use-file';
import { PartialDeep } from 'type-fest';

import { Avatar, AvatarProps } from '@mui/material';

type AvatarFileProps<
  Component extends React.ElementType = 'div',
  Props = Record<string, unknown>
> = {
  file: PartialDeep<any>; // TODO: Add types
  fallback?: string;
} & AvatarProps<Component, Props>;

/* Avatar with File image */
export function AvatarFile<Component extends React.ElementType>({
  file,
  fallback = '/logo.png',
  ...props
}: AvatarFileProps<Component, { component?: Component }>) {
  const image = useFile(file);
  console.log(file, image);
  const src = image?.url ?? fallback;

  return (
    <Avatar
      {...props}
      sx={{
        ...props?.sx,
        ...image?.background,
      }}
      src={src}
    />
  );
}
