'use client';
import GatewayIcon from '@/components/icons/gateway';
import { SharingCost } from '@/components/sharing-cost/sharing-cost';
import { pda } from '@/locale/en/pda';
import { IdentifierType } from '@/services/protocol/types';
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

import { ShareCopySchema, ShareCopySchemaError } from './schema';

export default function ShareCopyFormField() {
  const {
    register,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext<ShareCopySchema>();

  const theme = useTheme();

  const identifierTypes: Record<string, any>[] = [
    {
      value: IdentifierType.GatewayId,
      name: pda.share.identifier_type.gateway_id,
      icon: (
        <GatewayIcon
          colored={false}
          sx={{ color: 'text.secondary', width: 22, height: 22 }}
        />
      ),
    },
    {
      value: IdentifierType.Email,
      name: pda.share.identifier_type.email,
      icon: (
        <MailOutlineIcon
          sx={{ color: 'text.secondary', width: 22, height: 22 }}
        />
      ),
    },
    {
      value: IdentifierType.Evm,
      name: pda.share.identifier_type.evm_wallet,
      icon: <FaEthereum color={theme.palette.text.secondary} fontSize="22" />,
    },
    {
      value: IdentifierType.Solana,
      name: pda.share.identifier_type.solana_wallet,
      icon: (
        <TbCurrencySolana color={theme.palette.text.secondary} fontSize="22" />
      ),
    },
  ];

  return (
    <Stack gap={3}>
      <Stack gap={1} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        <FormControl sx={{ width: { xs: '100%', md: 220 } }}>
          <InputLabel htmlFor="type">{pda.share.account_type}</InputLabel>
          <Select
            label={pda.share.account_type}
            error={!!(errors.identifier_type as ShareCopySchemaError)}
            id="id-account-type"
            sx={{ mb: { xs: 1, md: 0 } }}
            inputProps={{ defaultValue: IdentifierType.GatewayId }}
            {...register(`identifier_type`, {
              onChange: () => {
                setValue('address', '');
                clearErrors();
              },
            })}
          >
            {identifierTypes.map((type) => (
              <MenuItem
                key={type?.value}
                value={type?.value}
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
          {!!(errors.identifier_type as ShareCopySchemaError) && (
            <FormHelperText sx={{ color: 'error' }}>
              {errors.identifier_type?.message}
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
