'use client';

import { useMemo, useState } from 'react';

import { UserIdentifierType } from '@/services/protocol/types';
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
        const defaultValue = property.default;
        if (typeof defaultValue !== 'undefined') {
          (acc as any)[key] = defaultValue;
        }
        return acc;
      }, {} as IssuePdaSchema),
    [schema]
  );

  const methods = useForm<IssuePdaSchema>({
    values: {
      ownerDraft: {
        type: UserIdentifierType.GatewayId,
        value: '',
      },
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
  });

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
      <FormProvider {...methods}>
        <Stack
          gap={2}
          mb={14}
          onSubmit={methods.handleSubmit(onSubmit, (error) => {
            console.log('error', error);
          })}
        >
          <OwnerSection />
          <Stack component="form" gap={2}>
            <TitleDescriptionSection />
            <PropertiesSection schema={schema} />
            <Summary amount={amount} total={total} />
          </Stack>
        </Stack>
      </FormProvider>
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
