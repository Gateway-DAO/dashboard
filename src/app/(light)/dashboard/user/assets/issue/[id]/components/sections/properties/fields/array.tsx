import { useEffect, useState } from 'react';

import ErrorMessage from '@/components/form/error-message/error-message';
import { common } from '@/locale/en/common';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';

import { PropertyField } from './type';

export default function ArrayProperty({ id, subType }: PropertyField) {
  const { trigger, getValues, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `claim.${id}`,
    control,
  });

  useEffect(() => {
    append('');
  }, []);

  const addFieldIsVisible = true;

  return (
    <Stack direction="column" gap={2}>
      {fields.map((item, index: number) => (
        <Controller
          key={index}
          name={`claim.${id}.${index}`}
          control={control}
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }) => {
            return (
              <Box>
                <Stack direction="row" alignItems="center" key={item.id}>
                  <TextField
                    fullWidth
                    value={(value as number)?.toString()}
                    autoFocus={addFieldIsVisible}
                    inputProps={
                      subType == 'number'
                        ? {
                            step: '0.01',
                            valueAsNumber: true,
                            required: true,
                            minLength: 2,
                          }
                        : {
                            required: true,
                            minLength: 2,
                          }
                    }
                    type={subType}
                    onChange={(_e) => {
                      const value = _e.target.value;
                      value.length ? onChange(Number(value)) : onChange('');
                    }}
                    error={!!error}
                    {...field}
                  />
                  {fields.length > 1 && (
                    <IconButton
                      sx={{
                        ml: { xs: 0.5, md: 1 },
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </Stack>
                {error && <ErrorMessage ml={1}>{error.message}</ErrorMessage>}
              </Box>
            );
          }}
        />
      ))}
      {addFieldIsVisible && (
        <>
          <Divider sx={{ mx: -3, mt: 1, mb: 3 }} />
          <Button variant="text" onClick={async () => append(' ')}>
            {common.actions.add_field}
          </Button>
        </>
      )}
    </Stack>
  );
}
