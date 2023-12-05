'use client';
import { useParams, useRouter } from 'next/navigation';

import IssuanceSuccess from '@/app/(light)/dashboard/components/issue-pda/success/success';
import ModalTitle from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { queries } from '@/constants/queries';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const { privateApi, session } = useGtwSession();
  const queryClient = useQueryClient();
  const { organization } = useOrganization();
  const router = useRouter();
  const { mutateAsync, isLoading, isSuccess, data } = useMutation({
    mutationKey: ['issue-pda', props.data],
    mutationFn: async (pda: IssuePdaSchema) =>
      privateApi.issue_pda({
        input: {
          dataModelId: id as string,
          ...pda,
        },
      }),
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async () => {
    try {
      await mutateAsync(props.data);
      await queryClient.invalidateQueries([
        queries.my_wallet,
        organization ? organization.id : session?.user.id,
      ]);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
    }
  };

  const close = () => {
    if (isSuccess) {
      const target = organization
        ? routes.dashboard.org.issuedAssets(organization.id)
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
