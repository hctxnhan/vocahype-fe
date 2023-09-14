import { axiosInstance } from '@/lib/configs/axios';

import { APIResponse, Params, Response } from '../api-definition/search-word';

export async function searchWord(params: Params) {
  const response = await axiosInstance.get<Response>(
    `/words?search=${params.word}`
  );

  return new APIResponse(response.data);
}
