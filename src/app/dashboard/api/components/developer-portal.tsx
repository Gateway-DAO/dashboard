'use client';

import CopyButton from '@/components/copy-button/copy-button';
import ToggleVisibilityButton from '@/components/toggle-visibility-button/toggle-visibility-button';
import { useToggle } from '@react-hookz/web';

import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';

import AuthenticationTokenSection from './authentication-token';


export default function DeveloperPortal() {
  const [isVisible, toggleVisible] = useToggle(false);

  const API_KEY = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  return (
    <Stack spacing={3} alignItems="flex-start">
      <Stack direction="column" gap={2}>
        <Card sx={{ width: '100%' }} variant="outlined">
          <CardHeader
            titleTypographyProps={{
              variant: 'subtitle1',
              fontWeight: 'bold',
            }}
            title={'API Key'}
            action={
              <>
                <ToggleVisibilityButton
                  isVisible={isVisible}
                  onToggle={toggleVisible}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <CopyButton text={API_KEY} />
              </>
            }
          />
          <CardContent>
            <Typography>{isVisible ? API_KEY : '••••'}</Typography>
          </CardContent>
        </Card>
        <AuthenticationTokenSection />
      </Stack>
    </Stack>
  );
}
