import ListSection from '@/app/(light)/dashboard/components/list-section';
import { settings } from '@/locale/en/settings';

import { AddOutlined, NotificationsOutlined } from '@mui/icons-material';
import {
  Button,
  Chip,
  Divider,
  ListItem,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';

import AliasMenuButton from '../alias-menu-button';
import SectionSkeleton from './section-skeleton';

type Props = {
  emails: any[];
  userEmail: string;
  onDisconnect: (address: string) => void;
  onAddEmail: () => void;
  isLoading: boolean;
};

export default function EmailsSection({
  emails,
  userEmail,
  onDisconnect,
  onAddEmail,
  isLoading,
}: Props) {
  return (
    <ListSection
      title="Email"
      button={
        <Button onClick={onAddEmail} variant="text" startIcon={<AddOutlined />}>
          {settings.actions.add_email_address}
        </Button>
      }
    >
      {isLoading && <SectionSkeleton />}
      {emails.length === 0 && !isLoading && (
        <ListItemText sx={{ mx: 2 }}>No items to be displayed</ListItemText>
      )}
      {emails &&
        emails.length > 0 &&
        emails.map(({ data }) => {
          const primary = data.email === userEmail;

          return (
            <ListItem
              key={data?.address}
              secondaryAction={
                <AliasMenuButton
                  onDisconnect={() => onDisconnect(data?.address as string)}
                />
              }
            >
              <ListItemText
                {...(primary
                  ? {
                      primary: (
                        <>
                          <Typography component="p">{data.address}</Typography>
                          <Chip
                            label={settings.notifications.receiving_account}
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
    </ListSection>
  );
}
