import { axiosInstance } from '@/lib/configs/axios';
import { APIData, APIResponse } from '@/models/APIResponse';
import { Definition, Example, PartOfSpeech, Word } from '@/models/Word';

type ExampleRes = APIResponse<APIData<Example[]>>;
type DefinitionRes = APIResponse<
  APIData<Definition, { examples?: ExampleRes }>
>[];
type PosRes = APIResponse<APIData<PartOfSpeech>>;
type Response = APIResponse<
  APIData<Word, { pos?: PosRes; definition: DefinitionRes }>
>;

export function getWord(wordId: string) {
  return axiosInstance.get<Response>(`/words/${wordId}`);
}
