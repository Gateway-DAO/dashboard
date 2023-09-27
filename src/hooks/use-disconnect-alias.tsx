import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

import { mutations } from '@/constants/queries';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import { errorMessages } from '@/locale/en/errors';
import { settings } from '@/locale/en/settings';
import { Exact } from '@/services/protocol/types';
import { useToggle } from '@react-hookz/web';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

export type AliasType =
  | 'email'
  | 'wallet'
  | 'Google'
  | 'Discord'
  | 'Github'
  | 'Twitter';

type Alias = {
  type: AliasType;
  address?: string;
};

export function useDisconnectAlias() {
  const { privateApi, session } = useGtwSession();
  const [modalDeactivateGatewayId, setModalDeactivateGatewayId] =
    useToggle(false);
  const [dataToDisconnect, setDataToDisconnect] = useState<Alias | null>(null);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const disconnectEmailMutation = useMutation({
    mutationKey: [mutations.disconnect_email],
    mutationFn: ({
      email,
    }: Exact<{
      email: string;
    }>) => {
      return privateApi.protocol_remove_email({
        email,
      });
    },
    onError: () => {
      enqueueSnackbar(errorMessages.SOMETHING_WENT_WRONG, {
        variant: 'error',
      });
    },
  });

  const disconnectWalletMutation = useMutation({
    mutationKey: [mutations.disconnect_wallet],
    mutationFn: ({
      id,
    }: Exact<{
      id: string;
    }>) => {
      return privateApi.protocol_remove_auth_method({
        id,
      });
    },
    onError: () => {
      enqueueSnackbar(errorMessages.SOMETHING_WENT_WRONG, {
        variant: 'error',
      });
    },
  });

  const handleDisconnectAlias = ({ type, address }: Alias) => {
    if (
      (type === 'wallet' || type === 'email') &&
      session?.user?.authentications?.length === 1
    ) {
      router.push(`#deactivate-gateway-id`, { scroll: false });
      setModalDeactivateGatewayId(true);
      setDataToDisconnect({ type, address });
    } else {
      disconnect({ type, address });
    }
  };

  const disconnect = async ({ type, address }: Alias) => {
    switch (type) {
      case 'email':
        await disconnectEmailMutation.mutateAsync({ email: address as string });
        break;
      case 'Discord':
        disconnectDiscord();
        break;
      case 'Twitter':
        disconnectTwitter();
        break;
      default:
        const authToRemove = session?.user?.authentications?.find(
          (auth) => auth.data?.address === address
        );
        await disconnectWalletMutation.mutateAsync({
          id: authToRemove?.id as string,
        });
    }
  };

  const disconnectDiscord = () => {
    console.log('Discord disconnected!');
  };

  const disconnectTwitter = () => {
    console.log('Twitter disconnected!');
  };

  const deactivateGatewayId = () => {
    disconnect({
      type: dataToDisconnect?.type as AliasType,
      address: dataToDisconnect?.address,
    });
    setDataToDisconnect(null);
    closeModal();
  };

  const closeModal = () => {
    router.push(routes.dashboardUserSettings, { scroll: false });
    setModalDeactivateGatewayId(false);
    setDataToDisconnect(null);
  };

  return {
    handleDisconnectAlias,
    deactivateGatewayId,
    closeModal,
    modalDeactivateGatewayId,
    isLoading:
      disconnectEmailMutation.isLoading || disconnectWalletMutation.isLoading,
  };
}
