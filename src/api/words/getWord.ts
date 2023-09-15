import { axiosInstance } from '@/lib/configs/axios';

import { APIResponse, Params, Response } from '../api-definition/get-word';

export async function getWord({ wordId }: Params) {
  const response = await axiosInstance.get<Response>(`/words/${wordId}`);
  return new APIResponse(response.data);
}
