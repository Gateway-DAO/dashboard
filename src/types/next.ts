import { PartialDeep } from 'type-fest';

export type PageWithsearchParams<SearchParams = any> = {
  searchParams?: PartialDeep<SearchParams>;
};
export type PageWithParams<Params = any> = { params: Params };
export type PageProps<
  Params = any,
  SearchParams = any
> = PageWithsearchParams<SearchParams> & PageWithParams<Params>;
