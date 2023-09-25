import { Chain } from '@/services/protocol/types';

import { AddOutlined } from '@mui/icons-material';
import { Button, ListItem, ListItemText } from '@mui/material';

import AliasMenuButton from '../alias-menu-button';
import AccountSection from './account-section';

type Wallet = {
  id: string;
  type: 'WALLET';
  data: {
    address: string;
    chain: Chain;
  };
};

type Props = {
  wallets: Wallet[];
};

export default function WalletsSection({ wallets }: Props) {
  return (
    <AccountSection
      title="Wallet"
      button={
        <Button variant="text" startIcon={<AddOutlined />}>
          Add wallet
        </Button>
      }
    >
      {wallets.map(({ data }) => (
        <ListItem key={data.address} secondaryAction={<AliasMenuButton />}>
          <ListItemText primary={data.address} secondary={data.chain} />
        </ListItem>
      ))}
    </AccountSection>
  );
}
