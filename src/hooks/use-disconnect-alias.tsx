import { useSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

import { mutations } from '@/constants/queries';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import { errorMessages } from '@/locale/en/errors';
import { AuthType, Chain, Exact, Scalars } from '@/services/protocol/types';
import { useToggle } from '@react-hookz/web';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

type Alias = {
  type: AuthType;
  address?: string;
  chain?: Chain;
};

export function useDisconnectAlias() {
  const { privateApi } = useGtwSession();
  const { data: session, update } = useSession();
  const [modalDeactivateGatewayId, setModalDeactivateGatewayId] =
    useToggle(false);
  const [dataToDisconnect, setDataToDisconnect] = useState<Alias | null>(null);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const disconnectMutation = useMutation({
    mutationKey: [mutations.disconnect_wallet],
    mutationFn: ({
      data,
      type,
    }: Exact<{
      data: Scalars['JSON'];
      type: AuthType;
    }>) => {
      return privateApi.protocol_unregister_auth_method({
        data,
        type,
      });
    },
    onError: () => {
      enqueueSnackbar(errorMessages.SOMETHING_WENT_WRONG, {
        variant: 'error',
      });
    },
    onSuccess: update,
  });

  const handleDisconnectAlias = ({ type, address, chain }: Alias) => {
    if (
      (type === AuthType.Wallet || type === AuthType.Email) &&
      session?.user?.authentications?.length === 1
    ) {
      router.push(`#deactivate-gateway-id`, { scroll: false });
      setModalDeactivateGatewayId(true);
      setDataToDisconnect({ type, address, chain });
    } else {
      disconnect({ type, address, chain });
    }
  };

  const disconnect = async ({ type, address, chain }: Alias) => {
    switch (type) {
      case 'GOOGLE':
        disconnectGoogle();
        break;
      case AuthType.Wallet:
        await disconnectMutation.mutateAsync({
          type,
          data: { address: address as string, chain },
        });
        break;
      default:
        await disconnectMutation.mutateAsync({
          type,
          data: { address: address as string },
        });
    }
  };

  const disconnectGoogle = () => {
    console.log('Google disconnected!');
  };

  const deactivateGatewayId = () => {
    disconnect({
      type: dataToDisconnect?.type as AuthType,
      address: dataToDisconnect?.address,
    });
    setDataToDisconnect(null);
    closeModal();
  };

  const closeModal = () => {
    router.push(routes.dashboard.user.settings, { scroll: false });
    setModalDeactivateGatewayId(false);
    setDataToDisconnect(null);
  };

  return {
    handleDisconnectAlias,
    deactivateGatewayId,
    closeModal,
    modalDeactivateGatewayId,
    isLoading: disconnectMutation.isLoading,
  };
}
