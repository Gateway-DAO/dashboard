import { settings } from '@/locale/en/settings';
import { Auth } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { AddOutlined } from '@mui/icons-material';
import { Button, ListItem, ListItemText } from '@mui/material';

import AliasMenuButton from '../alias-menu-button';
import AccountSection from './account-section';

type Props = {
  wallets: PartialDeep<Auth>[];
  onDisconnect: (address: string) => void;
};

export default function WalletsSection({ wallets, onDisconnect }: Props) {
  return (
    <AccountSection
      title={settings.connected_accounts.wallet}
      button={
        <Button variant="text" startIcon={<AddOutlined />}>
          {settings.actions.add_wallet}
        </Button>
      }
    >
      {wallets?.map(({ data }) => (
        <ListItem
          key={data?.address}
          secondaryAction={
            <AliasMenuButton
              onDisconnect={() => onDisconnect(data?.address as string)}
            />
          }
        >
          <ListItemText primary={data?.address} secondary={data?.chain} />
        </ListItem>
      ))}
    </AccountSection>
  );
}
