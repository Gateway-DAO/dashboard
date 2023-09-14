import { common } from "@/locale/en/common";
import { FaDiscord, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";

import { Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

import AccountSection from "../account-section";
import AliasMenuButton from "../alias-menu-button";

const socials = [
  { icon: FaGoogle, name: "Google" },
  { icon: FaGithub, name: "Github" },
  { icon: FaDiscord, name: "Discord", signed: true },
  { icon: FaTwitter, name: "Twitter", signed: true },
]

export default function SocialsSection() {
  return (<AccountSection title="Other accounts">
    {socials.map(({ icon: Icon, name, signed }) => (
      <ListItem
        key={name}
        secondaryAction={
          signed ? <AliasMenuButton /> : <Button variant="outlined">{common.actions.connect}</Button>
        }
      >
        <ListItemAvatar sx={{ display: "flex", alignItems: "center", mr: 2, minWidth: "unset", fontSize: 24 }}>
          <Icon />
        </ListItemAvatar>
        <ListItemText
          primary={name}
        />
      </ListItem>
    ))}

  </AccountSection>);
}
