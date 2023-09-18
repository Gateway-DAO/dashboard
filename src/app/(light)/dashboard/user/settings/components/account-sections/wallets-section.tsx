import { Chain } from "@/services/protocol/types";

import { AddOutlined } from "@mui/icons-material";
import { Button, ListItem, ListItemText } from "@mui/material";

import AliasMenuButton from "../alias-menu-button";
import AccountSection from "./account-section";

const wallet = [{
  address: "0x1234567890",
  chain: Chain.Evm,
}, {
  address: "0x1234567890",
  chain: Chain.Sol,
}];

export default function WalletsSection() {
  return <AccountSection title="Wallet" button={<Button variant="text" startIcon={<AddOutlined />}>Add wallet</Button>}>

    {wallet.map(({ address, chain }) => (<ListItem
      key={address}
      secondaryAction={<AliasMenuButton />}
    >
      <ListItemText
        primary={address}
        secondary={chain} />
    </ListItem>))}
  </AccountSection>;
}
