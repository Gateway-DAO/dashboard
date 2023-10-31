'use client';

import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

export default function useMetadata() {
  const metadata = useQuery({
    queryKey: ['data-models-metadata'],
    queryFn: () => apiPublic.explorer_data_models_metadata(),
  });
  return metadata;
}
