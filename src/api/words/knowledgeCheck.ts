import { deserialize } from 'deserialize-json-api';

import { axiosInstance } from '@/lib/configs/axios';
import { APIResponse } from '@/lib/interfaces/type';

import { WordKnowledgeCheck } from '../model/WordKnowledgeCheck';

type KnowledgeCheckBody = Array<{
  wordId: string;
  status: boolean;
}>;

export async function getKnowledgeCheck() {
  const response = await axiosInstance.get('/words/knowledge-test');
  return deserialize<APIResponse<WordKnowledgeCheck>>(response.data as string);
}

export function postKnowledgeCheck(
  url: string,
  { arg }: { arg: KnowledgeCheckBody }
) {
  return axiosInstance.post<{
    estimate: number;
  }>(url, arg);
}
