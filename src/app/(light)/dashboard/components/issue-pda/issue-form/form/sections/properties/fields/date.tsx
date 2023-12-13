import ErrorMessage from '@/components/form/error-message/error-message';
import { issuePdaForm } from '@/locale/en/pda';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Controller, useFormContext } from 'react-hook-form';

import { FormHelperText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { PropertyField } from './type';
import { getStringHelperText } from './utils';

dayjs.extend(utc);

export default function DateProperty({
  id,
  hideHelperText,
  ...property
}: PropertyField) {
  const { control } = useFormContext();

  const helper = !hideHelperText ? getStringHelperText(property) : undefined;

  return (
    <Controller
      name={`claim.${id}`}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <>
            <DatePicker
              {...field}
              sx={{
                ...(!!error && {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red',
                  },
                }),
              }}
            />
            <FormHelperText>{issuePdaForm.helpers.date}</FormHelperText>
            {helper && <FormHelperText>{helper}</FormHelperText>}
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </>
        </LocalizationProvider>
      )}
    />
  );
}
