import BoringAvatar from 'boring-avatars';

import { Avatar } from '@mui/material';

type Props = {
  src?: string | undefined | null;
  name: string;
  alt?: string;
  size?: number;
  hasBorder?: boolean;
};

export default function GTWAvatar({ src, name, alt, hasBorder, size }: Props) {
  if (!src) {
    return <BoringAvatar variant="marble" name={name} size={size} />;
  }

  return (
    <Avatar
      src={src}
      alt={alt}
      sx={{
        ...(hasBorder && {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'divider',
        }),
        ...(size && {
          width: size,
          height: size,
        }),
      }}
    >
      {name}
    </Avatar>
  );
}
