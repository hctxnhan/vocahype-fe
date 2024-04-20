import { axiosInstance } from '@/lib/configs/axios';

interface QuizResponse {
  question: string;
  options: string[];
  answer: string;
}

export const getQuiz = async (word: string, difficulty: string) =>
  axiosInstance.get<QuizResponse>(`/words/quiz`, {
    params: {
      word,
      level: difficulty,
    },
  });
