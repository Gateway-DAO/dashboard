'use client';
import GatewayIcon from '@/components/icons/gateway';
import { pda } from '@/locale/en/pda';
import { useFormContext } from 'react-hook-form';
import { FaEthereum } from 'react-icons/fa';
import { TbCurrencySolana } from 'react-icons/tb';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { IssuePdaSchema, IssuePdaSchemaError } from './schema';
import { SharingCost } from './sharing-cost';

export default function IssuePdaFormField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IssuePdaSchema>();


  const theme = useTheme()

  const mockAccountsTypes: Record<string, any>[] = [
    {
      value: 0,
      name: 'Gateway ID',
      icon: (
        <GatewayIcon sx={{ color: 'text.secondary', width: 22, height: 22 }} />
      ),
    },
    {
      value: 1,
      name: 'Email',
      icon: (
        <MailOutlineIcon
          sx={{ color: 'text.secondary', width: 22, height: 22 }}
        />
      ),
    },
    {
      value: 2,
      name: 'EVM Wallet',
      icon: <FaEthereum color={theme.palette.text.secondary} fontSize="22" />,
    },
    {
      value: 3,
      name: 'Solana Wallet',
      icon: (
        <TbCurrencySolana color={theme.palette.text.secondary} fontSize="22" />
      ),
    },
  ];

  return (
    <Stack gap={3}>
      <Stack direction="row" gap={1}>
        <FormControl sx={{ width: 220 }}>
          <InputLabel htmlFor="type">{pda.share.account_type}</InputLabel>
          <Select
            label={pda.share.account_type}
            error={!!(errors.account_type as IssuePdaSchemaError)}
            id="id-account-type"
            {...register(`account_type`)}
          >
            {mockAccountsTypes.map((type) => (
              <MenuItem
                key={type?.value}
                value={type?.name}
                sx={{ width: '100%', py: 2 }}
              >
                <Stack direction="row" alignItems="center" gap={1}>
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
          {!!(errors.account_type as IssuePdaSchemaError) && (
            <FormHelperText sx={{ color: 'error' }}>
              {errors.account_type?.message}
            </FormHelperText>
          )}
        </FormControl>
        <TextField
          required
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
