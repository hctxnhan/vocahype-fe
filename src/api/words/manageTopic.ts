import { axiosInstance } from '@/lib/configs/axios';

export type SerializedTopicFormValues = {
  data: [
    {
      type: 'topic';
      attributes: {
        name: string;
        description: string;
        emoji: string;
        wordList: string[];
      };
    },
  ];
};

export type UpdateTopicBody = {
  data: [
    {
      type: 'topic';
      attributes: {
        name: string;
        description: string;
        emoji: string;
        wordList: string[];
        removedWordIds: string[];
        addedWordIds: string[];
      };
    },
  ];
};

export async function updateTopic(
  _: string,
  {
    arg: { topicId, body },
  }: { arg: { topicId: number; body: UpdateTopicBody } }
) {
  return await axiosInstance.put(`/topics/${topicId}`, body);
}

export async function createTopic(
  _: string,
  {
    arg: { body, file },
  }: { arg: { body: SerializedTopicFormValues; file?: File } }
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  formData.append('topic', JSON.stringify(body));

  return await axiosInstance.post(`/topics`, formData);
}

export async function deleteTopic(
  _: string,
  { arg: { topicId } }: { arg: { topicId: number } }
) {
  return await axiosInstance.delete(`/topics/${topicId}`);
}
