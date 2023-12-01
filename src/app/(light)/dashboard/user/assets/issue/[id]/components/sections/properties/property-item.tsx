import { ClaimField } from '@/utils/get-claim-type';

import ArrayProperty from './fields/array';
import BooleanProperty from './fields/boolean';
import CurrencyProperty from './fields/currency';
import NumberProperty from './fields/number';
import TextProperty from './fields/text';
import UnknownProperty from './fields/unknown';
import { PropertyProps } from './type';

type Props = { type: ClaimField; hideHelperText?: boolean } & PropertyProps;

export default function PropertyItem({
  id,
  property,
  type,
  hideHelperText,
}: Props) {
  const props = { id, hideHelperText, ...property };
  switch (type) {
    case ClaimField.Image:
    case ClaimField.Text:
      return <TextProperty {...props} />;
    case ClaimField.Boolean:
      return <BooleanProperty {...props} />;
    case ClaimField.Number:
    case ClaimField.Integer:
      return <NumberProperty {...props} />;
    case ClaimField.Array:
      return <ArrayProperty {...props} />;
    case ClaimField.Currency:
      return <CurrencyProperty {...props} />;
    case ClaimField.Unknown:
      return <UnknownProperty {...props} />;
    default:
      return null;
  }
}
