
import { deserialize } from 'deserialize-json-api';

import { axiosInstance } from '@/lib/configs/axios';
import { APIResponse } from '@/lib/interfaces/type';

import { Topic } from '../model/Topic';

export async function getTopicsList() {
  const response = await axiosInstance.get('/topics');

  return deserialize<APIResponse<Topic>>(response.data as string);
}

export async function getTopic(topicId: number) {
  const response = await axiosInstance.get(`/topics/${topicId}`);

  return deserialize<APIResponse<Topic>>(response.data as string);
}
