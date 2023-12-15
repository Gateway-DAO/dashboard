import { ClaimField } from '@/utils/get-claim-type';

import ArrayProperty from './fields/array';
import BooleanProperty from './fields/boolean';
import CurrencyProperty from './fields/currency';
import DateProperty from './fields/date';
import DateTimeProperty from './fields/datetime';
import NumberProperty from './fields/number';
import SchemaErrorProperty from './fields/schema-error';
import SelectProperty from './fields/select';
import TextProperty from './fields/text';
import TimeProperty from './fields/time';
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
      return <NumberProperty {...props} />;
    case ClaimField.Date:
      return <DateProperty {...props} />;
    case ClaimField.DateTime:
      return <DateTimeProperty {...props} />;
    case ClaimField.Time:
      return <TimeProperty {...props} />;
    case ClaimField.Array:
      return <ArrayProperty {...props} />;
    case ClaimField.Select:
      return <SelectProperty {...props} />;
    case ClaimField.Currency:
      return <CurrencyProperty {...props} />;
    case ClaimField.Unknown:
      return <UnknownProperty {...props} />;
    case ClaimField.SchemaError:
      return <SchemaErrorProperty {...props} />;
    default:
      return null;
  }
}
