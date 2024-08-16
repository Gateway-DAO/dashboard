import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import useOrganization from '@/hooks/use-organization';
import { common } from '@/locale/en/common';

import {
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
} from '@mui/material';

export default function DisplayFieldsView() {
  const { organization } = useOrganization();

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="avatar" sx={{ fontSize: 14, mb: 1 }}>
          {common.general.avatar}
        </FormLabel>
        <GTWAvatar
          name={organization?.id}
          src={organization?.image}
          alt={organization?.name ?? organization?.gatewayId}
          size={80}
        />
      </FormControl>
      <TextField
        id="displayName"
        label="Display Name"
        fullWidth
        sx={{ maxWidth: 478 }}
        disabled
        value={organization?.name}
      />
      <TextField
        id="username"
        label={common.general.username}
        disabled
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
        value={organization?.gatewayId}
        sx={{ alignSelf: 'flex-start' }}
      />
    </>
  );
}
