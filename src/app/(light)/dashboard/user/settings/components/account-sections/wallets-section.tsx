import { Auth } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { AddOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, ListItem, ListItemButton, ListItemText } from '@mui/material';

import AliasMenuButton from '../alias-menu-button';
import AccountSection from './account-section';

type Props = {
  wallets: PartialDeep<Auth>[];
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
        <ListItem
          key={data?.address}
          secondaryAction={
            <AliasMenuButton
              menuItems={
                <ListItemButton onClick={() => console.log()}>
                  <CloseIcon sx={{ mr: 1 }} />
                  Disconnect
                </ListItemButton>
              }
            />
          }
        >
          <ListItemText primary={data?.address} secondary={data?.chain} />
        </ListItem>
      ))}
    </AccountSection>
  );
}
