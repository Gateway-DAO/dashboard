import { Box, Typography } from '@mui/material';

import GTWAvatar from '../gtw-avatar/gtw-avatar';

type Props = {
  name: string;
};

export default function AvatarTextCell({ name }: Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <GTWAvatar src={null} size={32} name={name} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Typography variant="body1">{name}</Typography>
      </Box>
    </Box>
  );
}
