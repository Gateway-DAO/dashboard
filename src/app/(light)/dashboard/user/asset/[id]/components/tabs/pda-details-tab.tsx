import Tags from '@/components/tags/tags';
import { DATE_FORMAT } from '@/constants/date';
import dayjs from 'dayjs';
import {
  IndividualDetailRow,
  RowSecondaryText,
  RowText,
  UserDetails,
} from './pda-tabs';
import { errorMessages } from '@/locale/en/errors';
import { useSnackbar } from 'notistack';

export default function PDADetailsTab({ pda }: any) {
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
    <>
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
            <RowSecondaryText text={pda.mimeType} />
          </IndividualDetailRow>
          <IndividualDetailRow>
            <RowText title="Size" />
            <RowSecondaryText text={pda.size} />
          </IndividualDetailRow>
        </>
      )}
      <IndividualDetailRow>
        <RowText title="Tags" />
        <Tags tags={pda?.tags as string[]} />
      </IndividualDetailRow>
    </>
  );
}
