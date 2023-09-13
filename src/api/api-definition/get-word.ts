import { Word } from '@/api/model/Word';
import { Definition } from '@/api/model/Definition';

export interface Params {
  wordId: string;
}

export interface Response {
  data: {
    type: 'word';
    id: string;
    attributes: Word;
    relationships: {
      definitions: {
        type: 'definition';
        id: string;
      }[];
      synonyms: {
        type: 'synonym';
        id: string;
      }[];
    };
  }[];
  included: Array<
    | {
        type: 'definition';
        id: string;
        attributes: Word;
        relationships: {
          examples: {
            type: 'example';
            id: string;
          }[];
        };
      }
    | {
        type: 'example';
        id: string;
        attributes: Definition;
        relationships: {};
      }
    | {
        type: 'synonym';
        id: string;
        attributes: Word;
        relationships: {};
      }
  >;
}
