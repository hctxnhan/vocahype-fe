import { axiosInstance } from '@/lib/configs/axios';
import { APIData, APIResponse } from '@/models/APIResponse';
import { Word } from '@/models/Word';

type KnowledgeCheckBody = Array<{
  wordId: number;
  status: boolean;
}>;

export function getKnowledgeCheck() {
  return axiosInstance.get<APIResponse<APIData<Word[]>>>(
    '/words/knowledge-test'
  );
}

export function postKnowledgeCheck(
  url: string,
  { arg }: { arg: KnowledgeCheckBody }
) {
  return axiosInstance.post(url, arg);
}
