import { deserialize } from 'deserialize-json-api';

import { axiosInstance } from '@/lib/configs/axios';
import { APIResponse } from '@/lib/interfaces/type';

import { Definition } from '../model/Definition';
import { Example } from '../model/Example';
import { PartOfSpeech } from '../model/PartOfSpeech';
import { Synonym } from '../model/Synonym';
import { Word } from '../model/Word';

export async function getWord({ wordId }: { wordId: string }) {
  const response = await axiosInstance.get(`/words/${wordId}`);
  return deserialize<
    APIResponse<
      Word & {
        meanings: {
          pos: PartOfSpeech;
          definitions?: Partial<
            Definition & {
              examples: Example[];
            }
          >[];
          synonyms?: Synonym[];
        }[];
      }
    >
  >(response.data as string);
}
