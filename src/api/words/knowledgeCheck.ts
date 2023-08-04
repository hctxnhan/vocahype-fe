import { axiosInstance } from '@/lib/configs/axios';

type KnowledgeCheckBody = Array<{
  wordId: number;
  status: boolean;
}>;

export function getKnowledgeCheck() {
  return axiosInstance.get('/words/knowledge-test');
}

export function postKnowledgeCheck(
  url: string,
  { arg }: { arg: KnowledgeCheckBody }
) {
  return axiosInstance.post(url, {
    arg,
  });
}
