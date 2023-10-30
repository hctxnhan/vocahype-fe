import { deserialize } from 'deserialize-json-api';

import { axiosInstance } from '@/lib/configs/axios';
import { APIResponse } from '@/lib/interfaces/type';

import { LearningGoalTracking } from '../model/LearningGoalTracking';

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

export async function getTrackLearningTime() {
  const response = await axiosInstance.get(`/learning-time`);
  return deserialize<APIResponse<LearningGoalTracking>>(
    response.data as string
  );
}
