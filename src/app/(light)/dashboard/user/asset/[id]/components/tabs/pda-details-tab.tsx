import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import Tags from '@/components/tags/tags';
import { DATE_FORMAT } from '@/constants/date';
import { ContentCopy } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import dayjs from 'dayjs';
import { IndividualDetailRow, RowText } from './pda-tabs';
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
        <Stack direction={'row'} sx={{ mt: 1, mb: 2 }}>
          <GTWAvatar name={pda.issuer.username} size={45} />
          <Stack
            direction={'column'}
            onClick={() => copy(pda.issuer.did)}
            sx={{ mx: 2, mt: 1 }}
          >
            <Typography variant="subtitle1" sx={{ mt: -1, mx: 1 }}>
              {pda.issuer.username}
            </Typography>
            <Stack direction={'row'} sx={{ mt: -0.5 }}>
              <Typography variant="caption" fontWeight={400} fontSize={12}>
                {pda.issuer.did}
              </Typography>
              <ContentCopy
                sx={{
                  fontSize: 16,
                  color: 'text.disabled',
                  mt: 0.5,
                  mx: 1.2,
                  cursor: 'pointer',
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </IndividualDetailRow>
      <IndividualDetailRow>
        <RowText title="Owner" />
        <Stack direction={'row'} sx={{ mt: 1, mb: 2 }}>
          <GTWAvatar name={pda.owner.username} size={45} />
          <Stack
            direction={'column'}
            onClick={() => copy(pda.owner.did)}
            sx={{ mx: 2, mt: 1 }}
          >
            <Typography variant="subtitle1" sx={{ mt: -1, mx: 1 }}>
              {pda.owner.username}
            </Typography>
            <Stack direction={'row'} sx={{ mt: -0.5 }}>
              <Typography variant="caption" fontWeight={400} fontSize={12}>
                {pda.owner.did.length > 10
                  ? pda.owner.did.substring(0, 10) + '...'
                  : pda.owner.did}
              </Typography>
              <ContentCopy
                sx={{
                  fontSize: 16,
                  color: 'text.disabled',
                  mt: 0.5,
                  mx: 1.2,
                  cursor: 'pointer',
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </IndividualDetailRow>
      <IndividualDetailRow>
        <RowText title="Created At" />
        <Typography variant="body2" sx={{ mt: 1, mb: 1.5 }}>
          {dayjs(pda.issuanceDate).format(DATE_FORMAT)}
        </Typography>
      </IndividualDetailRow>

      <IndividualDetailRow>
        <RowText title="Last Modified" />
        <Typography variant="body2" sx={{ mt: 1, mb: 1.5 }}>
          {dayjs(pda.lastUpdated).format(DATE_FORMAT)}
        </Typography>
      </IndividualDetailRow>
      {!pda.structured && (
        <>
          <IndividualDetailRow>
            <RowText title="Type" />
            <Typography variant="body2" sx={{ mt: 1, mb: 1.5 }}>
              {pda.mimeType}
            </Typography>
          </IndividualDetailRow>
          <IndividualDetailRow>
            <RowText title="Size" />
            <Typography variant="body2" sx={{ mt: 1, mb: 1.5 }}>
              {pda.size}
            </Typography>
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
