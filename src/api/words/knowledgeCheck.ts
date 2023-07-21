import { axiosInstance } from '@/lib/configs/axios';

export function getKnowledgeCheck() {
  return axiosInstance.get('/words/knowledge-check');
}
