import { AddOutlined, NotificationsOutlined } from "@mui/icons-material";
import { Button, Chip, ListItem, ListItemText, Typography } from "@mui/material";
import { Stack } from "@mui/system";

import AliasMenuButton from "../alias-menu-button";
import AccountSection from "./account-section";

const email = [{
  email: "sanket@gmail.com",
  primary: true,
}, {
  email: "s.jain@gmail.com"
}];
export default function EmailsSection() {
  return <AccountSection title="Email" button={<Button variant="text" startIcon={<AddOutlined />}>Add email address</Button>}>
    {email.map(({ email, primary }) => (<ListItem
      key={email}
      secondaryAction={<AliasMenuButton />}
    >
      <ListItemText
        {...(primary ? {
          primary: <>
            <Typography component="p">{email}</Typography>
            <Chip label="Receiving notifications" size="small" icon={<NotificationsOutlined />} sx={{
              ".MuiChip-icon": {
                marginRight: {
                  xs: 0.5,
                  md: -0.5
                }
              },
              ".MuiChip-label": {
                display: {
                  xs: "none",
                  md: "block"
                }
              }
            }} />
          </>,
          primaryTypographyProps: {
            component: Stack,
            direction: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            sx: {
              display: "flex",
              pr: 1,
            }
          }
        } : {
          primary: email
        })}
      />
    </ListItem>))}
  </AccountSection>;
}
