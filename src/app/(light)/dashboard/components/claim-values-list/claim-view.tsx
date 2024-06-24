import { pda as pdaLocale } from '@/locale/en/pda';
import getClaimType, { ClaimField } from '@/utils/get-claim-type';

import { CurrencyView } from './currency-view';
import { ImageView } from './image-view';
import { LinkView } from './link-view';
import { ListView } from './list-view';

export default function ClaimView(fieldData: any) {
  const type = getClaimType({
    type: fieldData.type,
    contentMediaType: fieldData.metadata?.contentMediaType,
    currency: fieldData.metadata?.currency,
    format: fieldData.metadata?.format,
  });

  if (
    fieldData.value === undefined ||
    fieldData.value === null ||
    fieldData.value === ''
  )
    return <span>{pdaLocale.unfilled}</span>;

  switch (type) {
    case ClaimField.Image:
      return <ImageView src={fieldData?.value} alt={fieldData?.label} />;
    case ClaimField.Array:
      return <ListView value={fieldData?.value} />;
    case ClaimField.Link:
      return <LinkView href={fieldData?.value} />;
    case ClaimField.Currency:
      return (
        <CurrencyView
          currency={fieldData?.metadata?.currency}
          value={parseFloat(fieldData?.value) as number}
        />
      );
    case ClaimField.Boolean:
      return <span>{`${fieldData.value}`}</span>;
    case ClaimField.Text:
      return <span style={{ whiteSpace: 'normal' }}>{fieldData.value}</span>;
    default: {
      return <span>{fieldData.value}</span>;
    }
  }
}
