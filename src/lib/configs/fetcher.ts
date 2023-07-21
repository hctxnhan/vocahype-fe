import { axiosInstance } from './axios';
import { AxiosResponse } from 'axios';

export const fetcher = (url: string) =>
  axiosInstance
    .get<unknown>(url)
    .then((res: AxiosResponse<unknown>) => res.data);
