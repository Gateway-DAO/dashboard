import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

import { Authentication } from './components/authentication';
import StepProvider from './providers/step-provider';

export default async function AuthPage() {
  const session = await getGtwServerSession();
  return (
    <StepProvider session={session}>
      <Authentication />
    </StepProvider>
  );
}
