import { axiosInstance } from '@/lib/configs/axios';

import {
  APIResponse,
  Response,
} from '../api-definition/knowledge-check';

type KnowledgeCheckBody = Array<{
  wordId: string;
  status: boolean;
}>;

export async function getKnowledgeCheck() {
  const reponse = await axiosInstance.get<Response>('/words/knowledge-test');
  return new APIResponse(reponse.data);
}

export function postKnowledgeCheck(
  url: string,
  { arg }: { arg: KnowledgeCheckBody }
) {
  return axiosInstance.post(url, arg);
}
