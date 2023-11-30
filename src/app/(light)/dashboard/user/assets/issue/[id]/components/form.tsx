'use client';

import { useMemo, useState } from 'react';

import {
  UserIdentificationInput,
  UserIdentifierType,
} from '@/services/protocol/types';
import { getClaimDefaultValue } from '@/utils/get-claim-type';
import { numberToMoneyString } from '@/utils/money';
import { FormProvider, useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import Preview from './preview/preview';
import { IssuePdaSchema, issuePdaValidator } from './schema';
import OwnerSection from './sections/owner/owner';
import PropertiesSection from './sections/properties/properties';
import Summary from './sections/summary';
import TitleDescriptionSection from './sections/title-description';

type Props = {
  schema: any;
};

export default function Form({ schema }: Props) {
  const [previewModalState, setPreviewModalState] = useState<{
    isOpen: boolean;
    data?: IssuePdaSchema;
  }>({ isOpen: false });

  const schemaDefaultValues = useMemo(
    () =>
      Object.keys(schema.properties).reduce((acc, key) => {
        const property = schema.properties[key];
        const defaultValue = getClaimDefaultValue(property);
        if (typeof defaultValue !== 'undefined') {
          (acc as any)[key] = defaultValue;
        }
        return acc;
      }, {} as IssuePdaSchema),
    [schema]
  );

  const methods = useForm<IssuePdaSchema>({
    values: {
      owner: {
        type: UserIdentifierType.GatewayId,
        value: '',
      },
      title: '',
      description: '',
      claim: schemaDefaultValues,
    },
    resolver: async (value, context, options) =>
      issuePdaValidator(value, schema, context, options),
    mode: 'onSubmit',
  });

  const owner = methods.watch('owner');
  const { error: ownerError } = methods.getFieldState('owner');
  const setOwner = (values: UserIdentificationInput) => {
    methods.setValue('owner', values);
  };
  const resetOwner = () => {
    methods.setValue('owner', {
      type: UserIdentifierType.GatewayId,
      value: '',
    });
  };

  const amount = 1;
  const price = 0.05;
  const total = numberToMoneyString(amount * price);

  const onSubmit = async (data: IssuePdaSchema) => {
    setPreviewModalState({ isOpen: true, data });
  };

  const onClosePreview = () => {
    setPreviewModalState((oldState) => ({ ...oldState, isOpen: false }));
  };

  return (
    <>
      <Stack
        gap={2}
        mb={14}
        onSubmit={methods.handleSubmit(onSubmit, (error) => {
          console.log('error', error);
        })}
      >
        <OwnerSection
          owner={owner}
          ownerError={ownerError?.message}
          setOwner={setOwner}
          resetOwner={resetOwner}
        />
        <FormProvider {...methods}>
          <Stack component="form" gap={2}>
            <TitleDescriptionSection />
            <PropertiesSection schema={schema} />
            <Summary amount={amount} total={total} />
          </Stack>
        </FormProvider>
      </Stack>
      {!!previewModalState.data && (
        <Preview
          amount={amount}
          price={price}
          total={total}
          onClose={onClosePreview}
          schema={schema}
          isOpen={previewModalState.isOpen}
          data={previewModalState.data}
        />
      )}
    </>
  );
}
