import { axiosInstance } from '@/lib/configs/axios';
import { Quiz } from '@/pages/Quiz/components/type';

type QuizResponse = Quiz;

export const getQuiz = async (word: string, difficulty: string) =>
  axiosInstance.get<QuizResponse>(`/words/quiz`, {
    params: {
      word,
      level: difficulty,
    },
  });

export const getDailyQuiz = async (numOfDays: number) =>
  axiosInstance.get<QuizResponse[]>('/words/quiz/multi', {
    params: {
      days: numOfDays,
    },
  });
