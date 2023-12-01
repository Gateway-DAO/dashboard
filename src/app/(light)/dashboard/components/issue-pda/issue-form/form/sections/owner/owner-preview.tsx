import { useMemo } from 'react';

import { useIdentifierTypes } from '@/components/form/user-identification-field/use-identifier-types';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { UserIdentificationInput } from '@/services/protocol/types';

import CancelIcon from '@mui/icons-material/Cancel';
import { Chip, IconButton, Stack, Typography } from '@mui/material';

type Props = {
  name: string;
  gatewayId?: string;
  picture?: string;
  onRemove: () => void;
  owner: UserIdentificationInput;
};

export default function OwnerPreview({
  name,
  gatewayId,
  picture,
  onRemove,
  owner,
}: Props) {
  const identifierTypes = useIdentifierTypes();
  const identifier = useMemo(
    () => identifierTypes.find((type: any) => type.value === owner.type),
    [owner]
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={2}
      justifyContent="space-between"
    >
      <GTWAvatar src={picture} size={40} name={name} alt={gatewayId} />
      <Stack flexGrow={1}>
        <Typography variant="body1" fontWeight={700}>
          {name}
        </Typography>
        {gatewayId && <Typography variant="caption">@{gatewayId}</Typography>}
      </Stack>
      <Chip icon={identifier?.icon} label={identifier?.name} />
      <IconButton onClick={onRemove} sx={{ width: 24, height: 24 }}>
        <CancelIcon />
      </IconButton>
    </Stack>
  );
}
