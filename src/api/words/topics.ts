
import { axiosInstance } from '@/lib/configs/axios';

import { Topic } from '../model/Topic';

export async function getTopicsList() {
  const response = await axiosInstance.get('/topics');

  return response.data.data as Topic[];
}

export async function getTopic(topicId: number) {
  const response = await axiosInstance.get(`/topics/${topicId}`);

  return response.data as Topic;
}
