import { SessionProvider } from 'next-auth/react';

import { data_model_default } from '@/mocks/dataModel';
import { session } from '@/mocks/session';
import { render, screen } from '@testing-library/react';

import DataModelDetailHeader from '../header';

describe('Data model header', () => {
  const params = {
    id: data_model_default.id,
    title: data_model_default.title,
    description: data_model_default.description,
    tags: data_model_default.tags!,
    isLoading: false,
  };
  test('renders the component', () => {
    render(
      <SessionProvider session={session}>
        <DataModelDetailHeader {...params} />
      </SessionProvider>
    );

    const component = screen.getByTestId('data_model__header');
    expect(component).toBeInTheDocument();
  });
  test('Display data model header: title', async () => {
    render(
      <SessionProvider session={session}>
        <DataModelDetailHeader {...params} />
      </SessionProvider>
    );
    const element = screen.getByTestId('data_model__header__title');
    expect(element).toBeInTheDocument();
    const elementText = element.textContent;
    expect(elementText).toEqual('City Names');
  });
  test('Display data model header: description', async () => {
    render(
      <SessionProvider session={session}>
        <DataModelDetailHeader {...params} />
      </SessionProvider>
    );
    const element = screen.getByTestId('data_model__header__description');
    expect(element).toBeInTheDocument();
    const elementText = element.textContent;
    expect(elementText).toEqual('Dolor sit');
  });
  test('Display data model header: tag', async () => {
    render(
      <SessionProvider session={session}>
        <DataModelDetailHeader {...params} />
      </SessionProvider>
    );
    const element = screen.getByTestId('data_model__header__tag__0');
    expect(element).toBeInTheDocument();
    const elementText = element.textContent;
    expect(elementText).toEqual('Earn');
  });

  test.todo('Empty states');
});
