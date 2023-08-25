'use client';
import { pda } from '@/locale/en/pda';
import { useFormContext } from 'react-hook-form';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WalletIcon from '@mui/icons-material/Wallet';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { SendPdaSchema, SendPdaSchemaError } from './schema';
import { SharingCost } from './sharing-cost';

export default function SendPdaFormField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SendPdaSchema>();

  const mockAccountsTypes: Record<string, any>[] = [
    {
      value: 0,
      name: 'Gateway ID',
      icon: <MailOutlineIcon sx={{ color: 'text.secondary' }} />,
    },
    {
      value: 1,
      name: 'Email',
      icon: <MailOutlineIcon sx={{ color: 'text.secondary' }} />,
    },
    {
      value: 2,
      name: 'EVM Wallet',
      icon: <WalletIcon sx={{ color: 'text.secondary' }} />,
    },
    {
      value: 3,
      name: 'Solana Wallet',
      icon: <WalletIcon sx={{ color: 'text.secondary' }} />,
    },
  ];

  return (
    <Stack gap={3}>
      <Stack direction="row" gap={1}>
        <FormControl sx={{ width: 220 }}>
          <InputLabel htmlFor="type">{pda.share.account_type}</InputLabel>
          <Select
            label={pda.share.account_type}
            error={!!(errors.account_type as SendPdaSchemaError)}
            id="id-account-type"
            {...register(`account_type`)}
          >
            {mockAccountsTypes.map((type) => (
              <MenuItem
                key={type?.value}
                value={type?.name}
                sx={{ width: '100%', py: 2 }}
              >
                <Stack direction="row" gap={1}>
                  {type.icon}
                  <Typography
                    sx={{ display: 'block', color: 'text.secondary' }}
                  >
                    {type?.name}
                  </Typography>
                </Stack>
              </MenuItem>
            ))}
          </Select>
          {!!(errors.account_type as SendPdaSchemaError) && (
            <FormHelperText sx={{ color: 'error' }}>
              {errors.account_type?.message}
            </FormHelperText>
          )}
        </FormControl>
        <TextField
          required
          label={pda.share.address}
          id="id-field-address"
          {...register('address')}
          error={!!errors.address}
          helperText={errors.address?.message}
          sx={{ flexGrow: 1 }}
        />
      </Stack>
      <SharingCost
        label={pda.share.sharing_cost}
        prefix="$"
        value="0.02"
        chip={pda.share.free}
        helperText={pda.share.sharing_cost_helper}
      />
    </Stack>
  );
}
