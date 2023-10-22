import { axiosInstance } from '@/lib/configs/axios';

import { APIResponse, Response } from '../api-definition/get-profile';

export async function getUserprofile() {
  const response = await axiosInstance.get<Response>(`/profile`);
  return new APIResponse(response.data);
}

export function postDailyGoal(level: string) {
  return axiosInstance.post(`/profile/daily-goal`, {
    level,
  });
}

export function postTrackLearningTime(time: number) {
  return axiosInstance.post(`/learning-time`, {
    time,
  });
}
