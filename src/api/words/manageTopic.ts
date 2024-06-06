import { axiosInstance } from '@/lib/configs/axios';

export type SerializedTopicFormValues = {
  data: [
    {
      type: 'topic';
      attributes: {
        name: string;
        description: string;
        emoji: string;
        wordList: number[];
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
        wordList: number[];
        removedWordIds: number[];
        addedWordIds: number[];
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
  { arg: { body } }: { arg: { body: SerializedTopicFormValues } }
) {
  return await axiosInstance.post(`/topics`, body);
}

export async function deleteTopic(
  _: string,
  { arg: { topicId } }: { arg: { topicId: number } }
) {
  return await axiosInstance.delete(`/topics/${topicId}`);
}

export function importTopicWords(
  _: string,
  { arg: { topicId, file } }: { arg: { topicId: number; file: File } }
) {
  return axiosInstance.post(`/import?topicId=${topicId}/`, {
    file,
  });
}

// export async function createTopicWithImportFile(
//   _: string,
//   { arg: { body, file } }: { arg: { body: SerializedTopicFormValues; file: File } }
// ) {
//   const { data } = await createTopic(_, { arg: { body } });

//   await importTopicWords(_, { arg: { topicId: data.data[0].id, file } });

//   return data;
// }