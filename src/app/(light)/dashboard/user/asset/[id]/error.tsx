'use client';

import DefaultError from '@/components/default-error/default-error';
import PermissionError from '@/components/permission-error/permission-error';
import { errorMessages } from '@/locale/en/errors';

export default function PDAErrorPage({ error }: { error: Error }) {
  if (error.message.includes(errorMessages.PDA_NO_ACCESS)) {
    return <PermissionError />;
  }
  return <DefaultError />;
}
