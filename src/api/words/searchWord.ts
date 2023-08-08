import { axiosInstance } from '@/lib/configs/axios';
import { APIData, APIResponse } from '@/models/APIResponse';
import { Word } from '@/models/Word';

export function searchWord(word: string) {
  return axiosInstance.get<APIResponse<APIData<Word[]>>>(
    `/words?search=${word}`
  );
}
