import GatewayIcon from '@/components/icons/gateway';
import { common } from '@/locale/en/common';
import { IdentifierType } from '@/services/protocol/types';
import { FaEthereum } from 'react-icons/fa';
import { TbCurrencySolana } from 'react-icons/tb';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useTheme } from '@mui/material';

export const useIdentifierTypes = () => {
  const theme = useTheme();

  const identifierTypes = [
    {
      value: IdentifierType.GatewayId,
      name: common.identifier.types.gateway_id,
      icon: (
        <GatewayIcon
          colored={false}
          sx={{ color: 'text.secondary', width: 22, height: 22 }}
        />
      ),
    },
    {
      value: IdentifierType.Email,
      name: common.identifier.types.email,
      icon: (
        <MailOutlineIcon
          sx={{ color: 'text.secondary', width: 22, height: 22 }}
        />
      ),
    },
    {
      value: IdentifierType.Evm,
      name: common.identifier.types.evm_wallet,
      icon: <FaEthereum color={theme.palette.text.secondary} fontSize="22" />,
    },
    {
      value: IdentifierType.Solana,
      name: common.identifier.types.solana_wallet,
      icon: (
        <TbCurrencySolana color={theme.palette.text.secondary} fontSize="22" />
      ),
    },
  ];
  return identifierTypes;
};
