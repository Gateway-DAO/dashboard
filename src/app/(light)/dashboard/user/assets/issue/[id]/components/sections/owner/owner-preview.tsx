import { useEffect, useMemo } from 'react';

import { useIdentifierTypes } from '@/components/form/user-identification-field/use-identifier-types';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { queries } from '@/constants/queries';
import { apiPublic } from '@/services/protocol/api';
import {
  UserIdentificationInput,
  UserIdentifierType,
} from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import { useDebouncedState } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import CancelIcon from '@mui/icons-material/Cancel';
import { Chip, IconButton, Stack, Typography } from '@mui/material';

export default function OwnerPreview() {
  const { watch, setError, clearErrors, resetField } = useFormContext();
  const owner: UserIdentificationInput = watch('owner');
  const [debouncedOwner, setDebouncedOwner] = useDebouncedState(owner, 1000);
  const identifierTypes = useIdentifierTypes();

  useEffect(() => {
    setDebouncedOwner({
      type: owner?.type,
      value: owner?.value,
    });
  }, [owner?.type, owner?.value]);

  const { data, isSuccess, isError } = useQuery({
    queryKey: [queries.user_info, debouncedOwner?.type, debouncedOwner?.value],
    queryFn: () =>
      apiPublic.get_user_info({
        identification: {
          type: debouncedOwner?.type,
          value: debouncedOwner?.value,
        },
      }),
    enabled:
      !!debouncedOwner?.type &&
      !!debouncedOwner?.value &&
      !!debouncedOwner.value.length,
  });

  useEffect(() => {
    if (
      isSuccess &&
      !data?.user &&
      debouncedOwner.type === UserIdentifierType.GatewayId
    ) {
      setError('owner', {
        type: 'manual',
        message: 'User not found',
      });
    } else if (isSuccess) {
      clearErrors('owner');
    }
  }, [isSuccess, data]);

  const name = useMemo(
    () =>
      data?.user?.displayName ??
      data?.user?.gatewayId ??
      limitCharsCentered(data?.user?.id as string, 10),
    [data]
  );

  const gatewayId = useMemo(
    () =>
      data?.user?.gatewayId ?? limitCharsCentered(data?.user?.id as string, 10),
    [data]
  );

  const identifier = useMemo(
    () => identifierTypes.find((type: any) => type.value === owner.type),
    [owner]
  );

  return (
    <>
      {owner && data?.user && (
        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          justifyContent="space-between"
        >
          <GTWAvatar
            src={data?.user?.profilePicture ?? null}
            size={40}
            name={name}
            alt={gatewayId}
          />
          <Stack flexGrow={1}>
            <Typography variant="body1" fontWeight={700}>
              {name}
            </Typography>
            <Typography variant="caption">@{gatewayId}</Typography>
          </Stack>
          <Chip icon={identifier?.icon} label={identifier?.name} />
          <IconButton
            onClick={() => resetField('owner')}
            size="small"
            sx={{ width: 24, height: 24 }}
          >
            <CancelIcon />
          </IconButton>
        </Stack>
      )}
    </>
  );
}
