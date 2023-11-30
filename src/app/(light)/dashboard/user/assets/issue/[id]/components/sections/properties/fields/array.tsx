import { useEffect, useState } from 'react';

import ErrorMessage from '@/components/form/error-message/error-message';
import { common } from '@/locale/en/common';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import { Button, Divider, IconButton, Stack, TextField } from '@mui/material';

import { PropertyField } from './type';

export default function ArrayProperty({
  id,
  defaultValue,
  subType,
}: PropertyField) {
  const { trigger, getValues, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `claim.${id}`,
    control,
  });

  const [addFieldIsVisible, setAddFieldIsVisible] = useState(false);
  const checkIfIsEmpty = () => {
    if (
      getValues()?.claim &&
      getValues()?.claim[id] &&
      getValues()?.claim[id][fields.length - 1] !== ''
    ) {
      setAddFieldIsVisible(true);
    } else {
      setAddFieldIsVisible(false);
    }
  };

  useEffect(() => {
    append('');
  }, []);

  return (
    <>
      {fields.map((field, index: number) => (
        <Stack
          direction="row"
          alignItems="center"
          key={field.id}
          sx={{ mb: 2 }}
        >
          <Controller
            key={index}
            name={`claim.${id}.${index}`}
            control={control}
            render={({
              field: { onChange, value, ...field },
              fieldState: { error },
            }) => {
              return (
                <>
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
                      checkIfIsEmpty();
                      const value = _e.target.value;
                      value.length ? onChange(Number(value)) : onChange('');
                    }}
                    error={!!error}
                    {...field}
                  />
                  {error && <ErrorMessage>{error.message}</ErrorMessage>}
                </>
              );
            }}
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
      ))}
      {addFieldIsVisible && (
        <>
          <Divider sx={{ mx: -3, mt: 1, mb: 3 }} />
          <Button
            variant="text"
            onClick={async () => {
              const isValid = await trigger(`claim.${id}.${fields.length - 1}`);
              if (isValid) {
                return append(' ');
              }
            }}
          >
            {common.actions.add_field}
          </Button>
        </>
      )}
    </>
  );
}
