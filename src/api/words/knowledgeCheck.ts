import { axiosInstance } from '@/lib/configs/axios';

type KnowledgeCheckBody = Array<{
  wordId: number;
  status: boolean;
}>;

export function getKnowledgeCheck() {
  return axiosInstance.get('/words/knowledge-check');
}

export function postKnowledgeCheck(
  url: string,
  { arg }: { arg: KnowledgeCheckBody }
) {
  return axiosInstance.post(url, {
    arg,
  });
}
