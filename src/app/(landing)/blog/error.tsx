'use client';

import DefaultError from '@/components/default-error/default-error';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <DefaultError />;
}
