import { axiosInstance } from '@/lib/configs/axios';
import { WordLevel } from '@/lib/interfaces/word';
import { APIResponse, Params, Response } from '../api-definition/get-word-list';

export function learnWord(wordId: string, level: WordLevel) {
  return axiosInstance.post(`/words/${wordId}/${level}`);
}

export async function getLearnWordList(params: Params) {
  const reponse = await axiosInstance.get<Response>(
    `/words/learn?page%5Boffset%5D=${params.offset || 0}&page%5Blimit%5D=10`
  );
  return new APIResponse(reponse.data);
}
