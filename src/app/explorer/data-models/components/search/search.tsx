'use client';
import { useState } from 'react';

import DataModelCard from '@/components/data-model-card/data-model-card';
import ClearFiltersButton from '@/components/search-filters/clear-filters-button';
import SortByField, {
  SortByOption,
} from '@/components/search-filters/sort-by-field';
import TagsField from '@/components/search-filters/tags-field';
import SearchSection from '@/components/search-section/search-section';
import {
  DataModelType,
  mockDataModels,
  mockDataModelsMetadata,
  DataModelsMetadataType,
} from '@/services/api/mock-types';
import { useDebouncedState } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';

// import AmountOfIssuancesField from './fields/amount-of-issuances-field';

import ConsumpitonPriceField from './fields/consumpiton-price-field';

const sortOptions: SortByOption<any>[] = [
  {
    key: 'newest',
    label: 'Newest',
    value: undefined,
  },
  { key: 'oldest', label: 'Oldest', value: { createdAt: 'ASC' } },
  {
    key: 'price-high-to-low',
    label: 'Price high to low',
    value: { consumptionPrice: 'DESC' },
  },
  {
    key: 'price-low-to-high',
    label: 'Price low to high',
    value: { consumptionPrice: 'ASC' },
  },
  // {
  //   key: 'issuances-high-to-low',
  //   label: 'Issuances high to low',
  //   value: { pdasIssuedCount: 'DESC' },
  // },
  // {
  //   key: 'issuances-low-to-high',
  //   label: 'Issuances low to high',
  //   value: { pdasIssuedCount: 'ASC' },
  // },
];

export default function DataModelsExplorerSearch() {
  const [search, setSearch] = useDebouncedState('', 500);
  const [selectedSort, setSort] = useState<SortByOption<DataModelType>>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedConsumptionPrice, setSelectedConsumptionPrice] = useState<
    number[]
  >([]);
  const [selectedAmountOfIssuances, setSelectedAmountOfIssuances] = useState<
    number[]
  >([]);

  const metadata = useQuery({
    queryKey: ['data-models-metadata'],
    queryFn: async (): Promise<DataModelsMetadataType> => {
      const mockPromise = new Promise<DataModelsMetadataType>((resolve) => {
        setTimeout(() => {
          resolve({
            ...mockDataModelsMetadata,
          });
        }, 1000);
      });
      return mockPromise;
    },
  });

  const tags = metadata.data?.tags ?? [];
  const consumptionPrice = metadata.data?.consumptionPrice;

  const dataModelsQuery = useQuery({
    queryKey: [
      'data-models',
      selectedTags,
      selectedConsumptionPrice,
      selectedConsumptionPrice[0],
      selectedConsumptionPrice[1],
      selectedAmountOfIssuances,
      selectedAmountOfIssuances[0],
      selectedAmountOfIssuances[1],
      selectedSort?.value,
      search,
    ],
    queryFn: async (): Promise<DataModelType[]> => {
      const mockPromise = new Promise<DataModelType[]>((resolve) => {
        setTimeout(() => {
          resolve(mockDataModels);
        }, 1000);
      });

      return mockPromise;
    },
  });

  const isFiltering =
    selectedTags.length > 0 ||
    selectedConsumptionPrice.length > 0 ||
    selectedAmountOfIssuances.length > 0;

  const onClearFilters = () => {
    setSelectedTags([]);
    setSelectedConsumptionPrice([]);
    setSelectedAmountOfIssuances([]);
    setSort(undefined);
  };

  const filters = (
    <>
      <TagsField
        tags={tags}
        selectedTags={selectedTags}
        setTags={setSelectedTags}
        isLoading={metadata.isLoading}
      />
      <ConsumpitonPriceField
        min={consumptionPrice?.min || 0}
        max={consumptionPrice?.max || 0}
        selectedConsumptionPrice={selectedConsumptionPrice}
        setConsumptionPrice={setSelectedConsumptionPrice}
        isLoading={metadata.isLoading}
      />
      {/* <AmountOfIssuancesField
        min={issuedCount.min}
        max={issuedCount.max}
        selectedAmountOfIssuances={selectedAmountOfIssuances}
        setAmountOfIssuances={setSelectedAmountOfIssuances}
        isLoading={metadata.isLoading}
      /> */}
      {isFiltering && <ClearFiltersButton onClear={onClearFilters} />}
      <SortByField
        selectedSort={selectedSort}
        onSort={setSort}
        options={sortOptions}
      />
    </>
  );

  return (
    <SearchSection
      title={'All data models'}
      emptyText={'No data models found'}
      errorMessage="Error on searching for data models"
      isEmpty={dataModelsQuery.isSuccess && dataModelsQuery.data.length === 0}
      isError={dataModelsQuery.isError}
      isLoading={dataModelsQuery.isLoading}
      isFetchingMore={false}
      hasMore={false}
      onSearch={setSearch}
      fetchMore={() => console.log('next page')}
      filters={filters}
      cards={
        dataModelsQuery.isSuccess &&
        dataModelsQuery.data.length > 0 &&
        dataModelsQuery.data.map((dataModel) => (
          <DataModelCard dataModel={dataModel} key={dataModel.id} />
        ))
      }
    />
  );
}
