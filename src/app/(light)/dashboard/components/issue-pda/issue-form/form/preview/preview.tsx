'use client';
import { useParams } from 'next/navigation';

import IssuanceSuccess from '@/app/(light)/dashboard/components/issue-pda/success/success';
import ModalTitle from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
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

  const onSubmit = async () => {
    try {
      await mutateAsync(props.data);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
    }
  };

  const close = !isLoading ? onClose : () => {};

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
