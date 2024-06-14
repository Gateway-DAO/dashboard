import Tags from '@/components/tags/tags';
import { DATE_FORMAT } from '@/constants/date';
import { errorMessages } from '@/locale/en/errors';
import { PrivateDataAsset } from '@/services/protocol-v3/types';
import { formatBytes } from '@/utils/bytes';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';

import { Stack } from '@mui/material';
import { Divider } from '@mui/material';

import { IndividualDetailRow, RowSecondaryText, RowText } from './components';
import { UserDetails } from './components';

type Props = {
  pda: PrivateDataAsset;
};

export default function PDADetailsTab({ pda }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar('Copied Successfully!');
    } catch (err) {
      enqueueSnackbar(errorMessages.UNEXPECTED_ERROR, { variant: 'error' });
    }
  };

  return (
    <Stack pt={3} divider={<Divider />}>
      <IndividualDetailRow>
        <RowText title="Uploaded By" />
        <UserDetails
          did={pda.issuer.did}
          username={pda.issuer.username}
          copy={copy}
        />
      </IndividualDetailRow>
      <IndividualDetailRow>
        <RowText title="Owner" />
        <UserDetails
          did={pda.owner.did}
          username={pda.owner.username}
          copy={copy}
        />
      </IndividualDetailRow>
      <IndividualDetailRow>
        <RowText title="Created At" />
        <RowSecondaryText text={dayjs(pda.issuanceDate).format(DATE_FORMAT)} />
      </IndividualDetailRow>

      <IndividualDetailRow>
        <RowText title="Last Modified" />
        <RowSecondaryText text={dayjs(pda.lastUpdated).format(DATE_FORMAT)} />
      </IndividualDetailRow>
      {!pda.structured && (
        <>
          <IndividualDetailRow>
            <RowText title="Type" />
            <RowSecondaryText text={pda.mimeType!} />
          </IndividualDetailRow>
          <IndividualDetailRow>
            <RowText title="Size" />
            <RowSecondaryText text={pda.size ? formatBytes(pda.size) : ''} />
          </IndividualDetailRow>
        </>
      )}
      {pda?.tags.length && (
        <IndividualDetailRow>
          <RowText title="Tags" />
          <Tags tags={pda?.tags} />
        </IndividualDetailRow>
      )}
    </Stack>
  );
}
