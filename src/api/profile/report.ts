import { deserialize } from 'deserialize-json-api';

import { axiosInstance } from '@/lib/configs/axios';
import { APIResponse } from '@/lib/interfaces/type';

export async function getReport(dateStart: number, dateEnd: number) {
  const url = new URLSearchParams({
    dateStart: dateStart.toString(),
    dateEnd: dateEnd.toString(),
  });

  const result = await axiosInstance.get(`/report?${url.toString()}`);

  return deserialize<
    APIResponse<{
      datas: number[];
      labels: string[];
      ignored: number;
      learning: number;
      mastered: number;
    }>
  >(result.data as string);
}
