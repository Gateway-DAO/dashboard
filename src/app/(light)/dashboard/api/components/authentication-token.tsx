'use client';
import CopyButton from '@/components/copy-button/copy-button';
import ToggleVisibilityButton from '@/components/toggle-visibility-button/toggle-visibility-button';
import { useToggle } from '@react-hookz/web';

import { Warning } from '@mui/icons-material';
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

export default function AuthenticationToken() {
  const [isVisible, toggleVisible] = useToggle(false);

  const TOKEN =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper sapien sed mi bibendum imperdiet. Duis maximus tincidunt ullamcorper. Nam viverra dolor eget justo consequat semper. Integer quis aliquam odio. Nam scelerisque bibendum quam ac fermentum. Curabitur eu laoreet dui, a cursus felis. Morbi neque nisi, tincidunt nec pellentesque quis, consequat ut purus. Pellentesque ultrices quam dignissim ligula rhoncus, ut.';

  return (
    <Card sx={{ width: '100%' }} variant="outlined">
      <CardHeader
        title={'Authentication Token'}
        titleTypographyProps={{
          variant: 'subtitle1',
          fontWeight: 'bold',
        }}
        action={
          <>
            <ToggleVisibilityButton
              isVisible={isVisible}
              onToggle={toggleVisible}
              size="small"
              sx={{ mr: 1 }}
            />
            <CopyButton text={TOKEN} size="small" />
          </>
        }
      />
      <CardContent>
        <Typography sx={{ mb: 2, wordBreak: 'break-all' }}>
          {isVisible ? TOKEN : '••••'}
        </Typography>
        <Alert color="warning" icon={<Warning />}>
          By sharing your authentication token, you assume all responsibility
          for any actions performed using your token, whether authorized or
          unauthorized.
        </Alert>
      </CardContent>
    </Card>
  );
}
