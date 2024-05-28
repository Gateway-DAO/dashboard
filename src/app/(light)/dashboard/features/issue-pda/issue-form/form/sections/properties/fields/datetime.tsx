import ErrorMessage from '@/components/form/error-message/error-message';
import { issuePdaForm } from '@/locale/en/pda';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Controller, useFormContext } from 'react-hook-form';

import { FormHelperText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { PropertyField } from './type';
import { getStringHelperText } from './utils';

dayjs.extend(utc);

export default function DateTimeProperty({
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
            <DateTimePicker
              {...field}
              sx={{
                width: '100%',
                ...(!!error && {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red',
                  },
                }),
              }}
            />
            <FormHelperText>{issuePdaForm.helpers.datetime}</FormHelperText>
            {helper && <FormHelperText>{helper}</FormHelperText>}
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </>
        </LocalizationProvider>
      )}
    />
  );
}
