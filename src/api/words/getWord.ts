import { axiosInstance } from '@/lib/configs/axios';

import { Word } from '../model/Word';
import { Comprehension } from '../model/Comprehension';

export async function getWord({ wordId }: { wordId: string }) {
  const response = await axiosInstance.get(`/words/by/${wordId}`);

  return response.data as Word & { comprehension?: Comprehension };
}
