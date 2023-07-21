import { AxiosResponse } from 'axios';

type PartialPick<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type AllRequiredResponse<D, E, M> = {
  data: D;
  error: E;
  meta: M;
};

export type APIData<D, R = unknown> = {
  id: D extends Array<unknown> ? string[] : string;
  attributes: D extends Array<infer T> ? T[] : D;
  relationships?: R;
};

type APIResponseSuccess<D, M> = AxiosResponse<
  PartialPick<AllRequiredResponse<D, null, M>, 'error' | 'meta'>
>;

type APIResponseError<E, M> = AxiosResponse<
  PartialPick<AllRequiredResponse<null, E, M>, 'data' | 'meta'>
>;

export type APIResponse<
  D extends APIData<any, any>,
  E = unknown,
  M = unknown,
> = APIResponseSuccess<D, M> | APIResponseError<E, M>;
