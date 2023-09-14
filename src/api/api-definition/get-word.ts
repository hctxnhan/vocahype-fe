import { Word } from '@/api/model/Word';
import { Definition } from '@/api/model/Definition';
import { Example } from '@/api/model/Example';

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
    };
  }[];
  included: Array<
    | {
        type: 'definition';
        id: string;
        attributes: Definition;
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
        attributes: Example;
      }
  >;
}
