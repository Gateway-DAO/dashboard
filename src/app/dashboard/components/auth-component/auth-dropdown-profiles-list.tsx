'use client';
import { useSession } from 'next-auth/react';

import { Divider } from '@mui/material';

type Props = {
  onClose: () => void;
};

export default function AuthDropdownProfilesList({}: Props) {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <>
      <Divider />
    </>
  );
}
