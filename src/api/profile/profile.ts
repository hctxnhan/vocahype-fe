import { deserialize } from 'deserialize-json-api';

import { axiosInstance } from '@/lib/configs/axios';
import { APIResponse } from '@/lib/interfaces/type';

import { User } from '../model/User';

export async function getUserprofile() {
  const response = await axiosInstance.get(`/profile`);
  return deserialize<APIResponse<User>>(response.data as string);
}
