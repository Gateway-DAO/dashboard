import { AddOutlined, NotificationsOutlined } from '@mui/icons-material';
import {
  Button,
  Chip,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';

import AliasMenuButton from '../alias-menu-button';
import AccountSection from './account-section';

type Props = {
  emails: any[];
  userEmail: string;
};

export default function EmailsSection({ emails, userEmail }: Props) {
  return (
    <AccountSection
      title="Email"
      button={
        <Button variant="text" startIcon={<AddOutlined />}>
          Add email address
        </Button>
      }
    >
      {emails &&
        emails.length > 0 &&
        emails.map(({ data }) => {
          const primary = data.email === userEmail;

          return (
            <ListItem key={data.address} secondaryAction={<AliasMenuButton />}>
              <ListItemText
                {...(primary
                  ? {
                      primary: (
                        <>
                          <Typography component="p">{data.address}</Typography>
                          <Chip
                            label="Receiving notifications"
                            size="small"
                            icon={<NotificationsOutlined />}
                            sx={{
                              '.MuiChip-icon': {
                                marginRight: {
                                  xs: 0.5,
                                  md: -0.5,
                                },
                              },
                              '.MuiChip-label': {
                                display: {
                                  xs: 'none',
                                  md: 'block',
                                },
                              },
                            }}
                          />
                        </>
                      ),
                      primaryTypographyProps: {
                        component: Stack,
                        direction: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1,
                        sx: {
                          display: 'flex',
                          pr: 1,
                        },
                      },
                    }
                  : {
                      primary: data.address,
                    })}
              />
            </ListItem>
          );
        })}
    </AccountSection>
  );
}
