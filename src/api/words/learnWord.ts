import { deserialize } from 'deserialize-json-api';

import { axiosInstance } from '@/lib/configs/axios';
import { APIResponse, PaginationMeta, WordLevel } from '@/lib/interfaces/type';

import { Comprehension } from '../model/Comprehension';
import { Word } from '../model/Word';

export function learnWord(wordId: string, level: WordLevel) {
  return axiosInstance.post(`/words/${wordId}/${level}`);
}

export function delayLearnWord(wordId: string, day: number) {
  return axiosInstance.put(`/words/${wordId}/delay?day=${day}`);
}

export async function getLearnWordList(url: string) {
  const response = await axiosInstance.get(url);
  return response.data as APIResponse<Word, PaginationMeta>;
}

export function resetLearnWord(wordId: string) {
  return axiosInstance.delete(`/reset-learning-progression/word/${wordId}`);
}
