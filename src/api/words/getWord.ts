
import { axiosInstance } from '@/lib/configs/axios';

import { Word } from '../model/Word';

export async function getWord({ wordId }: { wordId: string }) {
  const response = await axiosInstance.get(`/words/by/${wordId}`);

  return response.data as Word;
}
