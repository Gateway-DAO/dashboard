import { useEffect, useState } from 'react';

import ErrorMessage from '@/components/form/error-message/error-message';
import { common } from '@/locale/en/common';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { Add } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { PropertyField } from './type';
import { getArrayHelperText } from './utils';

export default function ArrayProperty({
  id,
  subType,
  ...property
}: PropertyField) {
  const {
    trigger,
    getValues,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `claim.${id}`,
    control,
    rules: {
      minLength: property.minItems || 1,
      maxLength: property.maxItems,
      required: property.required,
    },
  });

  const minAmountOfFields = property.minItems || 1;
  const maxAmountOfFields = property.maxItems || 1;

  const addFieldIsVisible = fields.length < maxAmountOfFields;

  const removeFieldIsVisible = fields.length > minAmountOfFields;
  const error = (errors?.claim as any)?.[id]?.message;
  const helper = getArrayHelperText(property);

  return (
    <Stack direction="column" gap={2}>
      <Typography variant="body2" color="text.secondary">
        {helper}
      </Typography>
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
                  {removeFieldIsVisible && (
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
          <Button
            variant="text"
            onClick={async () => append(' ')}
            startIcon={<Add />}
            sx={{ alignSelf: 'flex-start' }}
          >
            {common.actions.add_row}
          </Button>
        </>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Stack>
  );
}
