'use client';

import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

import { useForm } from 'react-hook-form';

import { Box, Button, Stack, TextField } from '@mui/material';

function InjectToken({ session }: { session: Session }) {
  const { update } = useSession();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      token: session.token,
    },
  });

  const onSubmit = async (data: { token: string }) => {
    update({ token: data.token });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Token" {...register('token')} />
      <Button type="submit">Update</Button>
    </Stack>
  );
}

export default function DeveloperPage() {
  const { data: session } = useSession();

  return <Box p={3}>{session && <InjectToken session={session} />}</Box>;
}
