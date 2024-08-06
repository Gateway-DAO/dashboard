import UserData from '@/app/(light)/dashboard/components/user-data/user-data';
import Tags from '@/components/tags/tags';
import { DATE_FORMAT } from '@/constants/date';

import { formatBytes } from '@/utils/bytes';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';

import { Stack } from '@mui/material';
import { Divider } from '@mui/material';

import { IndividualDetailRow, RowSecondaryText, RowText } from './components';
import { PrivateDataAsset } from '@/services/server/mock-types';

type Props = {
  pda: PrivateDataAsset;
};

export default function PDADetailsTab({ pda }: Props) {
  return (
    <Stack pt={3} divider={<Divider />}>
      <IndividualDetailRow>
        <RowText title="Uploaded By" />
        <UserData did={pda.createdBy.did} username={pda.createdBy.username} />
      </IndividualDetailRow>
      <IndividualDetailRow>
        <RowText title="Owner" />
        <UserData did={pda.owner.did} username={pda.owner.username} />
      </IndividualDetailRow>
      <IndividualDetailRow>
        <RowText title="Created At" />
        <RowSecondaryText text={dayjs(pda.createdAt).format(DATE_FORMAT)} />
      </IndividualDetailRow>

      <IndividualDetailRow>
        <RowText title="Last Modified" />
        <RowSecondaryText text={dayjs(pda.updatedAt).format(DATE_FORMAT)} />
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
