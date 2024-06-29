import { axiosInstance } from '@/lib/configs/axios';

export type SerializedWordFormValues = {
  data: {
    attributes: {
      id: string;
      word: string;
      phonetic: string;
      syllable: number;
    };
  }[];
  included: {
    type: 'meaning';
    attributes: {
      definitions: {
        definition: string;
        examples: string[];
      }[];
    };
    relationships: {
      pos: {
        data: {
          type: 'pos';
          id: string;
        };
      };
    };
  }[];
};

export async function updateWord(
  _: string,
  {
    arg: { wordId, body },
  }: { arg: { wordId: string; body: SerializedWordFormValues } }
) {
  return await axiosInstance.put(`/words/${wordId}`, body);
}

export async function createWord(
  _: string,
  { arg: { body } }: { arg: { body: SerializedWordFormValues } }
) {
  return await axiosInstance.post(`/words`, body);
}


export async function deleteWord(
  _: string,
  { arg: { wordId } }: { arg: { wordId: number } }
) {
  return await axiosInstance.delete(`/words/${wordId}`);
}
