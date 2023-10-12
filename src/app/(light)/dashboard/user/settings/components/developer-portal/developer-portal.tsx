import CopyButton from '@/components/copy-button/copy-button';
import { settings } from '@/locale/en/settings';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';

import AuthenticationTokenSection from './authentication-token-section';

export default function DeveloperPortal() {
  return (
    <Stack spacing={3} alignItems="flex-start">
      <Stack direction="column" gap={2}>
        <Card sx={{ width: '100%' }} variant="outlined">
          <CardHeader
            titleTypographyProps={{
              variant: 'subtitle1',
              fontWeight: 'bold',
            }}
            title={settings.developer_portal.api_key}
            action={
              <CopyButton text={process.env.NEXT_PUBLIC_API_PLAYGROUND_KEY!} />
            }
          />
          <CardContent>
            <Typography>
              {process.env.NEXT_PUBLIC_API_PLAYGROUND_KEY!}
            </Typography>
          </CardContent>
        </Card>
        <AuthenticationTokenSection />
        <Card sx={{ width: '100%' }} variant="outlined">
          <CardHeader
            titleTypographyProps={{
              variant: 'subtitle1',
              fontWeight: 'bold',
            }}
            title={settings.developer_portal.usage_limit.title}
          />
          <CardContent sx={{ pb: 0 }}>
            <List sx={{ p: 0 }}>
              <ListItem
                sx={{ px: 0 }}
                secondaryAction={
                  <Button variant="outlined" size="small">
                    Request More
                  </Button>
                }
              >
                <ListItemText
                  primary={
                    settings.developer_portal.usage_limit.issued_credentials
                  }
                  secondary={settings.developer_portal.usage_limit.rate(
                    0,
                    10000
                  )}
                />
              </ListItem>
              <Divider sx={{ mx: -2 }} />
              <ListItem
                sx={{ px: 0 }}
                secondaryAction={
                  <Button variant="outlined" size="small">
                    Request More
                  </Button>
                }
              >
                <ListItemText
                  primary={
                    settings.developer_portal.usage_limit.data_model_created
                  }
                  secondary={settings.developer_portal.usage_limit.rate(
                    0,
                    10000
                  )}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}
