import { useSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

import routes from '@/constants/routes';
import { useToggle } from '@react-hookz/web';

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
  const { data: session } = useSession();
  const [modalDeactivateGatewayId, setModalDeactivateGatewayId] =
    useToggle(false);
  const [dataToDisconnect, setDataToDisconnect] = useState<Alias | null>(null);
  const router = useRouter();

  // const { privateApi } = useGtwSession();

  // const deleteEmailMutation = useMutation({
  //   mutationKey: [mutations.remove_email],
  //   mutationFn: ({
  //     email,
  //   }: Exact<{
  //     email: string;
  //   }>) => {
  //     return privateApi.protocol_remove_email({
  //       email,
  //     });
  //   },
  //   onSuccess,
  // });

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

  const disconnect = ({ type, address }: Alias) => {
    switch (type) {
      case 'email':
        disconnectEmail(address as string);
        break;
      case 'Discord':
        disconnectDiscord();
        break;
      case 'Twitter':
        disconnectTwitter();
        break;
      default:
        disconnectWallet(address as string);
    }
  };

  const disconnectEmail = (address: string) => {
    console.log('Email disconnected!', address);
  };

  const disconnectWallet = (address: string) => {
    console.log('Wallet disconnected!', address);
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
    console.log('Gateway ID deactivated!');
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
  };
}
