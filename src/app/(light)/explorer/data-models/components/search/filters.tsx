'use client';

import { PropsWithChildren } from 'react';

import SearchFilters from '../../../components/search-filters/search-filters';
import { SerchFiltersProps } from '../../../components/search-filters/types';

export default function DataModelsExplorerSearchFilters({
  onSearch,
  isSearching,
  children,
}: PropsWithChildren<SerchFiltersProps>) {
  return (
    <SearchFilters onSearch={onSearch} isSearching={isSearching}>
      {children}
    </SearchFilters>
  );
}
