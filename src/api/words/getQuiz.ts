import { axiosInstance } from '@/lib/configs/axios';
import { Quiz } from '@/pages/Quiz/components/type';

interface QuizResponse extends Quiz {}

export const getQuiz = async (word: string, difficulty: string) =>
  axiosInstance.get<QuizResponse>(`/words/quiz`, {
    params: {
      word,
      level: difficulty,
    },
  });
