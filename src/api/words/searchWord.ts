import { axiosInstance } from '@/lib/configs/axios';

import { APIResponse, Params, Response } from '../api-definition/search-word';

export async function searchWord(params: Params) {
  const searchParams = new URLSearchParams({
    search: params.word,
    exact: params.exact,
    'page[offset]': params['page[offset]'],
    'page[limit]': params['page[limit]'],
  });

  const response = await axiosInstance.get<Response>(
    `/words?${searchParams.toString()}`
  );

  return new APIResponse(response.data);
}
