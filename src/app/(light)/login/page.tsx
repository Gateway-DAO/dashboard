import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

import { Authentication } from './components/authentication';
import LoginStepProvider from './providers/step-provider/step-provider';

export default async function AuthPage() {
  const session = await getGtwServerSession();
  return (
    <LoginStepProvider session={session}>
      <Authentication />
    </LoginStepProvider>
  );
}
