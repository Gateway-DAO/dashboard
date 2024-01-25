'use client';

import CopyButton from '@/components/copy-button/copy-button';
import externalLinks from '@/constants/externalLinks';
import { queries } from '@/constants/queries';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { settings } from '@/locale/en/settings';
import { MonthlyUserUsageQuery } from '@/services/protocol/types';
import { currentEnv } from '@/utils/env';
import { useQuery } from '@tanstack/react-query';

import {
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
  Skeleton,
} from '@mui/material';

import AuthenticationTokenSection from './authentication-token-section';
import MainnetAlert from './mainnet-alert';
import WidgetKey from './widget-key';

export default function DeveloperPortal() {
  const { privateApi } = useGtwSession();
  const { organization, isOrg } = useOrganization();

  const usageLimits = useQuery({
    queryKey: [queries.usage_limit],
    queryFn: () => privateApi.monthlyUserUsage(),
    select: (data: MonthlyUserUsageQuery) =>
      data.getMonthlyUserUsage as MonthlyUserUsageQuery['getMonthlyUserUsage'],
  });

  const isTestnet = currentEnv === 'testnet';
  return (
    <Stack spacing={3} alignItems="flex-start">
      <Stack direction="column" gap={2}>
        {currentEnv === 'testnet' && <MainnetAlert />}
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
        {isOrg && <WidgetKey orgId={organization?.id as string} />}
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
                  <Button
                    variant="outlined"
                    size="small"
                    href={externalLinks.requestMoreAPIUsage}
                    target="_blank"
                  >
                    Request More
                  </Button>
                }
              >
                {usageLimits.isLoading ? (
                  <Stack direction="column">
                    <Skeleton width={130} height={30} />
                    <Skeleton width={120} height={30} />
                  </Stack>
                ) : (
                  <ListItemText
                    primary={
                      settings.developer_portal.usage_limit.issued_credentials
                    }
                    secondary={settings.developer_portal.usage_limit.rate(
                      usageLimits?.data?.monthlyCredentials as number,
                      usageLimits?.data
                        ?.credentialsUsageAllowedByMonth as number
                    )}
                  />
                )}
              </ListItem>
              <Divider sx={{ mx: -2 }} />
              <ListItem
                sx={{ px: 0 }}
                secondaryAction={
                  <Button
                    variant="outlined"
                    size="small"
                    href={externalLinks.requestMoreAPIUsage}
                    target="_blank"
                  >
                    Request More
                  </Button>
                }
              >
                {usageLimits.isLoading ? (
                  <Stack direction="column">
                    <Skeleton width={160} height={30} />
                    <Skeleton width={120} height={30} />
                  </Stack>
                ) : (
                  <ListItemText
                    primary={
                      settings.developer_portal.usage_limit.data_model_created
                    }
                    secondary={settings.developer_portal.usage_limit.rate(
                      usageLimits?.data?.monthlyDatamodels as number,
                      usageLimits?.data?.datamodelsUsageAllowedByMonth as number
                    )}
                  />
                )}
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}
