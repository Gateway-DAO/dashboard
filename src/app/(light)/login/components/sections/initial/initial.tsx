import { TitleSubtitleField } from '@/components/title-field/title-field';
import documentationRoutes from '@/constants/documentationRoutes';
import EvmProvider from '@/context/evm-provider/evm-provider';
import SolanaProvider from '@/context/solana-provider';
import { auth } from '@/locale/en/auth';

import { Link, Stack, Typography } from '@mui/material';

import { AuthenticationOptions } from './authentication-options';
import { LoginEmail } from './login-email';

export function AuthenticationInitial() {
  return (
    <Stack gap={2} direction={'column'}>
      <Typography id="title-login" component="h2" variant="h4" sx={{ mb: 3 }}>
        {auth.steps.initial.title}
      </Typography>
      <TitleSubtitleField
        title={auth.steps.initial.title_email}
        subtitle={auth.steps.initial.caption_email}
      />
      <LoginEmail />
      <EvmProvider>
        <SolanaProvider>
          <AuthenticationOptions />
        </SolanaProvider>
      </EvmProvider>
      <Typography color="text.secondary" variant="caption">
        {auth.steps.initial.terms_info}{' '}
        <Link
          href={documentationRoutes.termsOfService}
          target="_blank"
          underline="none"
        >
          {auth.steps.initial.terms_of_service}{' '}
        </Link>
      </Typography>
      <Typography color="text.secondary" variant="caption">
        {auth.steps.initial.term_email}
      </Typography>
    </Stack>
  );
}
