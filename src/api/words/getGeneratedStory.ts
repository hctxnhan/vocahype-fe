import { axiosInstance } from '@/lib/configs/axios';

export function getLearnedWords(numberOfDays: number) {
  return axiosInstance.get<string[]>(`story/list-word?days=${numberOfDays}`);
}

export async function getGeneratedStory(numberOfDays: number) {
  const response = await axiosInstance.get<{ story: string }>(
    `story?days=${numberOfDays}`
  );

  return response.data;
}
