'use client';
import { useParams, useRouter } from 'next/navigation';

import IssuanceSuccess from '@/app/(light)/app/(dashboard)/components/issue-pda/success/success';
import ModalTitle from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import useMyWallet from '@/hooks/use-my-wallet';
import useOrganization from '@/hooks/use-organization';
import { errorMessages } from '@/locale/en/errors';
import { OrganizationIdentifierType } from '@/services/protocol/types';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { IssuePdaSchema } from '../schema';
import PreviewContent from './preview-content';
import { PreviewModalProps } from './type';

export default function Preview({
  isOpen,
  onClose,
  ...props
}: PreviewModalProps) {
  const { id } = useParams();
  const { privateApi } = useGtwSession();
  const { organization } = useOrganization();
  const router = useRouter();
  const { mutateAsync, isLoading, isSuccess, data } = useMutation({
    mutationKey: ['issue-pda', props.data],
    mutationFn: async (pda: IssuePdaSchema) =>
      privateApi.issue_pda({
        input: {
          dataModelId: id as string,
          organization: !!organization
            ? {
                type: OrganizationIdentifierType.OrgId,
                value: organization.id!,
              }
            : undefined,
          ...pda,
        },
      }),
  });

  const { enqueueSnackbar } = useSnackbar();
  const { onRefresh } = useMyWallet();

  const onSubmit = async () => {
    try {
      await mutateAsync(props.data);
      onRefresh();
    } catch (error: any) {
      enqueueSnackbar(
        error?.response?.data?.message ?? errorMessages.UNEXPECTED_ERROR,
        { variant: 'error' }
      );
    }
  };

  const close = () => {
    if (isSuccess) {
      const target = organization
        ? routes.dashboard.org.issuedAssets(organization.gatewayId)
        : routes.dashboard.user.issuedAssets;
      router.push(target);
    } else if (!isLoading) {
      onClose();
    }
  };

  return (
    <ModalRight open={isOpen} onClose={close}>
      <ModalTitle onClose={close} />
      {isSuccess ? (
        <IssuanceSuccess pdas={[data.createPDA]} />
      ) : (
        <PreviewContent
          {...props}
          isLoading={isLoading}
          onSubmit={onSubmit}
          onClose={close}
        />
      )}
    </ModalRight>
  );
}
