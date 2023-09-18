'use client';
import GatewayIcon from '@/components/icons/gateway';
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

import { IssuePdaSchema, IssuePdaSchemaError } from './schema';
import { SharingCost } from './sharing-cost';

export default function IssuePdaFormField() {
  const {
    register,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext<IssuePdaSchema>();

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
      <Stack direction="row" gap={1}>
        <FormControl sx={{ width: 220 }}>
          <InputLabel htmlFor="type">{pda.share.account_type}</InputLabel>
          <Select
            label={pda.share.account_type}
            error={!!(errors.identifier_type as IssuePdaSchemaError)}
            id="id-account-type"
            defaultValue={IdentifierType.GatewayId}
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
          {!!(errors.identifier_type as IssuePdaSchemaError) && (
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
