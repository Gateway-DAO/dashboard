import { data_model_default } from '@/mocks/dataModel';
import { render, screen } from '@testing-library/react';

import DataModelDetails from '../details';

describe('Data model details', () => {
  test('renders the component', () => {
    render(<DataModelDetails dataModel={data_model_default} />);

    const component = screen.getByTestId('data_model__details');
    expect(component).toBeInTheDocument();
  });
  test('Display data model detail: createdBy', async () => {
    render(<DataModelDetails dataModel={data_model_default} />);
    const element = screen.getByTestId('created_by');
    expect(element).toBeInTheDocument();
    const elementText = element.textContent;
    expect(elementText).toEqual('joaquim');
  });
  test('Display data model detail: consumption price', async () => {
    render(<DataModelDetails dataModel={data_model_default} />);
    const element = screen.getByTestId('consumption_price');
    expect(element).toBeInTheDocument();
    const elementText = element.textContent;
    expect(elementText).toEqual('$0.00');
  });
  test('Display data model detail: creation date', async () => {
    render(<DataModelDetails dataModel={data_model_default} />);
    const element = screen.getByTestId('creation_date');
    expect(element).toBeInTheDocument();
    const elementText = element.textContent;
    expect(elementText).toEqual('11/29/2023, 5:10 PM');
  });

  test.todo('Empty states');
});
