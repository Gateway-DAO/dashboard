import { PartialDeep } from 'type-fest';

export type PageWithSearchParams<SearchParams = any> = {
  searchParams?: PartialDeep<SearchParams>;
};
export type PageWithParams<Params = any> = { params: Params };
export type PageProps<
  Params = any,
  SearchParams = any
> = PageWithSearchParams<SearchParams> & PageWithParams<Params>;
