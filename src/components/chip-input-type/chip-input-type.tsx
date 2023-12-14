import { ClaimField } from '@/utils/get-claim-type';

import { CheckBox, List, QuestionMarkRounded } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DataArrayIcon from '@mui/icons-material/DataArray';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import PhotoIcon from '@mui/icons-material/Photo';
import PinIcon from '@mui/icons-material/Pin';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { Chip, Stack, Typography, SvgIcon, ChipProps } from '@mui/material';
type Props = {
  type: string;
};

const FieldsIcon: Partial<Record<ClaimField, typeof SvgIcon>> = {
  text: TextFieldsIcon,
  number: PinIcon,
  image: PhotoIcon,
  link: InsertLinkIcon,
  array: DataArrayIcon,
  boolean: CheckBox,
  unknown: QuestionMarkRounded,
  select: List,
  date: CalendarMonthIcon,
  datetime: ScheduleIcon,
};

const typeTranslator: Partial<Record<ClaimField, string>> = {
  datetime: 'Date Time',
};

type FieldType = keyof typeof FieldsIcon;

export default function ChipInputType({ type, ...props }: Props & ChipProps) {
  const FieldIcon = FieldsIcon[type as FieldType] ?? TextFieldsIcon;
  return (
    <Chip
      variant="filled"
      label={
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={0.5}
        >
          <FieldIcon sx={{ fontSize: '16px' }} />
          <Typography fontSize={12} sx={{ textTransform: 'capitalize' }}>
            {typeTranslator?.[type as FieldType] ?? type}
          </Typography>
        </Stack>
      }
      {...props}
    />
  );
}
