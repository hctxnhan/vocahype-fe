import { axiosInstance } from '@/lib/configs/axios';

export function learnWord(
  wordId: string,
  level: 'easy' | 'hard' | 'normal' | 'mastered' | 'ignore'
) {
  return axiosInstance.post(`/words/${wordId}/${level}`);
}
