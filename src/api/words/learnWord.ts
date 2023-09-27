import { axiosInstance } from '@/lib/configs/axios';
import { WordLevel } from '@/lib/interfaces/word';
import { APIResponse, Response } from '../api-definition/get-word-list';

export function learnWord(wordId: string, level: WordLevel) {
  return axiosInstance.post(`/words/${wordId}/${level}`);
}

export function delayLearnWord(wordId: string, day: number) {
  return axiosInstance.put(`/words/${wordId}/delay?day=${day}`);
}

export async function getLearnWordList(url: string) {
  const reponse = await axiosInstance.get<Response>(url);
  return new APIResponse(reponse.data);
}
