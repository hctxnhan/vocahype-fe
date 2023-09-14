import { axiosInstance } from '@/lib/configs/axios';

import { Params, Response } from '../api-definition/get-word';
import { VHAPI } from '../model/VHAPI';

export async function getWord({ wordId }: Params) {
  const response = await axiosInstance.get<Response>(`/words/${wordId}`);
  return new VHAPI(response);
}
