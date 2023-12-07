import ErrorMessage from '@/components/form/error-message/error-message';
import { common } from '@/locale/en/common';
import getClaimType, { ClaimField } from '@/utils/get-claim-type';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Add } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

import PropertyItem from '../property-item';
import { PropertyField } from './type';
import { getClaimHelperText, getNumberHelperText } from './utils';

export default function ArrayProperty({
  id,
  hideHelperText,
  ...property
}: PropertyField) {
  const minAmountOfFields = property.minItems || 1;
  const maxAmountOfFields = property.maxItems;

  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `claim.${id}`,
    control,
    rules: {
      minLength: minAmountOfFields,
      maxLength: maxAmountOfFields,
      required: property.required,
    },
  });

  const addFieldIsVisible =
    typeof maxAmountOfFields !== 'undefined'
      ? fields.length < maxAmountOfFields
      : true;

  const removeFieldIsVisible = fields.length > minAmountOfFields;
  const error = (errors?.claim as any)?.[id]?.message;
  const helper = !hideHelperText ? getNumberHelperText(property) : undefined;

  const subType = property!.items
    ? getClaimType({ type: property!.items!.type! })
    : ClaimField.SchemaError;
  const subTypeHelper = subType
    ? getClaimHelperText(subType, property.items!)
    : undefined;

  return (
    <Stack direction="column" gap={2}>
      {fields.map((item, index: number) => (
        <Stack direction="row" alignItems="center" key={item.id}>
          <Box sx={{ flexGrow: 1 }}>
            <PropertyItem
              id={`${id}.${index}`}
              type={subType}
              property={property.items!}
              hideHelperText
            />
          </Box>
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
      ))}
      {!!subTypeHelper?.length && (
        <Typography variant="body2" color="text.secondary">
          {subTypeHelper}
        </Typography>
      )}
      {!!helper?.length && (
        <Typography variant="body2" color="text.secondary" mt={-1}>
          {helper}
        </Typography>
      )}
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
