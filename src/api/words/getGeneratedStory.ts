import { axiosInstance } from '@/lib/configs/axios';

export function getLearnedWords(numberOfDays: number) {
  return axiosInstance.get<string[]>(`story/list-word?days=${numberOfDays}`);
}

export function getGeneratedStory(numberOfDays: number) {
  return axiosInstance.get<{ story: string }>(`story?days=${numberOfDays}`);
}
