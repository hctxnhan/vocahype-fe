import { axiosInstance } from '@/lib/configs/axios';
import { APIResponse, Response, WordListParams } from '../api-definition/get-word';
import { WordLevel } from '@/lib/interfaces/word';

export function learnWord(
  wordId: string,
  level: WordLevel
) {
  return axiosInstance.post(`/words/${wordId}/${level}`);
}

export async function getLearnWordList(params: WordListParams) {
	const reponse = await axiosInstance.get<Response>(`/words/learn?page%5Boffset%5D=${params.page || 0}&page%5Blimit%5D=10`);
	return new APIResponse(reponse.data);
  }