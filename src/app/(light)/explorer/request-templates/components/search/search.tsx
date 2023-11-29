'use client';

import { useState } from 'react';

import ClearFiltersButton from '@/components/search-filters/clear-filters-button';
import SortByField, {
  SortByOption,
} from '@/components/search-filters/sort-by-field';
import TagsField from '@/components/search-filters/tags-field';
import SearchSection from '@/components/search-section/search-section';
import { explorerRequestTemplates } from '@/locale/en/request-template';
import { apiPublic } from '@/services/protocol/api';
import { DataRequestTemplate } from '@/services/protocol/types';
import { useDebouncedState } from '@react-hookz/web';
import { useInfiniteQuery } from '@tanstack/react-query';

import RequestTemplateExplorerCard from '../../../components/request-template-card/request-template-card';
import AmountOfDataRequestsField from './filters/amount-of-data-requests-field';
import AverageCostField from './filters/average-cost-field';

const sortOptions: SortByOption<DataRequestTemplate>[] = [
  {
    key: 'newest',
    label: 'Newest',
    value: undefined,
  },
  { key: 'oldest', label: 'Oldest', value: { createdAt: 'ASC' } },
  {
    key: 'requests-high-to-low',
    label: 'Requests high to low',
    value: { dataRequestsCount: 'DESC' },
  },
  {
    key: 'requests-low-to-high',
    label: 'Requests low to high',
    value: { dataRequestsCount: 'ASC' },
  },
];

export default function DataModelsRequestExplorerSearch() {
  const [search, setSearch] = useDebouncedState('', 500);

  const [selectedSort, setSort] = useState<SortByOption<DataRequestTemplate>>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAverageCost, setSelectedAverageCost] = useState<number[]>([]);
  const [selectedAmountOfRequests, setSelectedAmountOfRequests] = useState<
    number[]
  >([]);

  const requestTemplatesQuery = useInfiniteQuery({
    queryKey: ['data-model-templates', search, selectedSort?.value],
    queryFn: ({ pageParam = 0 }) =>
      apiPublic.explorer_request_templates_list({
        filter: {
          // tags: selectedTags.length > 0 ? selectedTags : undefined,
          // averageCost:
          //   selectedAverageCost.length > 0
          //     ? {
          //         min: selectedAverageCost[0],
          //         max: selectedAverageCost[1],
          //       }
          //     : undefined,
          // amountOfDataRequests:
          //   selectedAmountOfRequests.length > 0
          //     ? {
          //         min: selectedAmountOfRequests[0],
          //         max: selectedAmountOfRequests[1],
          //       }
          //     : undefined,
          search: search.length > 0 ? search : undefined,
        },
        order: selectedSort?.value,
        skip: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.dataRequestTemplates.length === 12
        ? allPages.length * 12
        : undefined,
  });

  const dataRequestTemplates =
    requestTemplatesQuery.data?.pages?.flatMap(
      ({ dataRequestTemplates }) => dataRequestTemplates
    ) ?? [];

  const isFiltering =
    selectedTags.length > 0 ||
    selectedAverageCost.length > 0 ||
    selectedAmountOfRequests.length > 0 ||
    !!selectedSort;

  const onClearFilters = () => {
    setSelectedTags([]);
    setSelectedAverageCost([]);
    setSelectedAmountOfRequests([]);
    setSort(undefined);
  };

  const filters = (
    <>
      <TagsField tags={selectedTags} setTags={setSelectedTags} />
      <AverageCostField
        selectedAverageCost={selectedAverageCost}
        setAverageCost={setSelectedAverageCost}
        min={0}
        max={100}
      />
      <AmountOfDataRequestsField
        selectedAmountOfDataRequests={selectedAmountOfRequests}
        setAmountOfDataRequests={setSelectedAmountOfRequests}
        min={0}
        max={100}
      />
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
      title={explorerRequestTemplates.listTitle}
      emptyText={explorerRequestTemplates.empty}
      errorMessage="Error on searching for data model request templates"
      isEmpty={
        requestTemplatesQuery.isSuccess && dataRequestTemplates.length === 0
      }
      isError={requestTemplatesQuery.isError}
      isLoading={requestTemplatesQuery.isLoading}
      isFetchingMore={requestTemplatesQuery.isFetchingNextPage}
      hasMore={requestTemplatesQuery.hasNextPage}
      onSearch={setSearch}
      fetchMore={() => requestTemplatesQuery.fetchNextPage()}
      filters={filters}
      cards={
        requestTemplatesQuery.isSuccess &&
        dataRequestTemplates.length > 0 &&
        dataRequestTemplates.map((requestTemplate) => (
          <RequestTemplateExplorerCard
            key={requestTemplate.id}
            requestTemplate={requestTemplate}
          />
        ))
      }
    />
  );
}
