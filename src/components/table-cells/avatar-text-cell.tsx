import { Box, Typography } from '@mui/material';

import GTWAvatar from '../gtw-avatar/gtw-avatar';

type Props = {
  name: string;
  picture?: string;
  bold?: boolean;
  userId: string;
};

export default function AvatarTextCell({
  name,
  userId,
  picture,
  bold = false,
}: Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <GTWAvatar src={picture ?? null} size={32} name={userId} alt={name} />
      <Typography variant="body1" fontWeight={bold ? 700 : 400}>
        {name}
      </Typography>
    </Box>
  );
}
