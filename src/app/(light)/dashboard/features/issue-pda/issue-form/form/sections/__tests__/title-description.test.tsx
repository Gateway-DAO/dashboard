import { PropsWithChildren } from 'react';

import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import TitleDescriptionSection from '../title-description';

const Wrapper = ({
  title,
  description,
  children,
}: PropsWithChildren<{ title?: string; description?: string }>) => {
  const form = useForm({
    defaultValues: {
      title,
      description,
    },
  });

  return (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  );
};

describe('Issue Fom Title and Description Fields', () => {
  it('should render title and description fields', async () => {
    const title = 'Test Title';
    const description = 'Test Description';

    render(
      <Wrapper title={title} description={description}>
        <TitleDescriptionSection />
      </Wrapper>
    );

    expect(screen.getByTestId('title')).toHaveValue(title);
    expect(screen.getByTestId('description')).toHaveValue(description);
  });
});
