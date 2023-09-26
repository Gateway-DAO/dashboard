import { AuthType, Chain } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { AddOutlined } from '@mui/icons-material';
import { Button, ListItem, ListItemText } from '@mui/material';

import AliasMenuButton from '../alias-menu-button';
import AccountSection from './account-section';

type Wallet = {
  id: string;
  type: AuthType;
  data: {
    address: string;
    chain: Chain | null;
  } | null;
};

type Props = {
  wallets: PartialDeep<Wallet>[];
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
      {wallets?.map(({ data }) => (
        <ListItem key={data?.address} secondaryAction={<AliasMenuButton />}>
          <ListItemText primary={data?.address} secondary={data?.chain} />
        </ListItem>
      ))}
    </AccountSection>
  );
}
