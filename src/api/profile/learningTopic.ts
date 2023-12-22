import { axiosInstance } from "@/lib/configs/axios";

export async function postTargetTopic(topicId: string) {
  const result = axiosInstance.post(`/profile/topic`, {
    topicId,
  });

  return result;
}