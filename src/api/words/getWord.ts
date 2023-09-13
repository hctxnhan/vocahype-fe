import { axiosInstance } from '@/lib/configs/axios';

import { Params, Response } from '../api-definition/get-word';

export async function getWord({ wordId }: Params) {
  const response = await axiosInstance.get<Response>(`/words/${wordId}`);
  return response;
}
