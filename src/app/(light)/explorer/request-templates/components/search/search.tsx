'use client';

import { explorerRequestTemplates } from '@/locale/en/request-template';
import { apiPublic } from '@/services/protocol/api';
import { DataRequestTemplate } from '@/services/protocol/types';
import { useDebouncedState } from '@react-hookz/web';
import { useInfiniteQuery } from '@tanstack/react-query';

import RequestTemplateExplorerCard from '../../../components/request-template-card/request-template-card';
import SortByField, {
  SortByOption,
} from '../../../components/search-filters/sort-by-field';
import TagsField from '../../../components/search-filters/tags-field';
import ExplorerSearchSection from '../../../components/search-section/search-section';
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

  const requestTemplatesQuery = useInfiniteQuery({
    queryKey: ['data-model-templates', search],
    queryFn: ({ pageParam = 0 }) =>
      apiPublic.explorer_request_templates_list({
        filter: {},
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

  const filters = (
    <>
      <TagsField tags={[]} setTags={() => {}} />
      <AverageCostField
        selectedAverageCost={[]}
        setAverageCost={() => {}}
        min={0}
        max={100}
      />
      <AmountOfDataRequestsField
        selectedAmountOfDataRequests={[]}
        setAmountOfDataRequests={() => {}}
        min={0}
        max={100}
      />
      <SortByField
        selectedSort={undefined}
        onSort={() => {}}
        options={sortOptions}
      />
    </>
  );

  return (
    <ExplorerSearchSection
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
