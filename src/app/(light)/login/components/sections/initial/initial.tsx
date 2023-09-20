import { auth } from '@/locale/en/auth';

import { Link, Stack, Typography } from '@mui/material';

import { TitleSubtitleField } from '../../title-field';
import { AuthenticationOptions } from './authentication-options';
import { LoginEmail } from './login-email';

export function AuthenticationInitial() {
  return (
    <Stack gap={2} direction={'column'}>
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {auth.steps.initial.title}
      </Typography>
      <TitleSubtitleField
        title={auth.steps.initial.title_email}
        subtitle={auth.steps.initial.caption_email}
      />
      <LoginEmail />
      <AuthenticationOptions />
      <Typography color="text.secondary" variant="caption">
        {auth.steps.initial.terms_info}{' '}
        <Link href="/terms" underline="none">
          {auth.steps.initial.terms_of_service}{' '}
        </Link>
      </Typography>
      <Typography color="text.secondary" variant="caption">
        {auth.steps.initial.term_email}
      </Typography>
    </Stack>
  );
}
