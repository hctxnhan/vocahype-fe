import { Word } from '@/api/model/Word';
import { Definition } from '@/api/model/Definition';
import { Example } from '@/api/model/Example';
import { PartOfSpeech } from '@/api/model/PartOfSpeech';
import { Synonym } from '@/api/model/Synonym';

export interface Params {
  offset: number;
  limit: number;
}

export interface Metadata {
  pagination: {
    first: number;
    last: number;
    next: number;
    page: number;
    size: number;
    total: number;
  };
}

export interface Response {
  data: {
    type: 'word';
    id: string;
    attributes: Word;
    relationships: {
      definitions: {
        data: {
          type: 'definition';
          id: string;
        }[];
      };
      pos: {
        data: {
          type: 'pos';
          id: string;
        };
      };
      synonyms: {
        data: {
          type: 'synonym';
          id: string;
        }[];
      };
    };
  }[];
  meta?: Metadata;
  included: [
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
    | {
        type: 'pos';
        id: string;
        attributes: PartOfSpeech;
      }
    | {
        type: 'synonym';
        id: string;
        attributes: Synonym;
      },
  ];
}

export type Included = Response['included'][0];
export type Relationships = Response['data'][0]['relationships'];
export type Data = Response['data'][0];

export class APIResponse {
  constructor(private response: Response) {}

  get data(): Data[] {
    return this.response.data;
  }

  get relationships(): Relationships {
    return this.response.data[0].relationships;
  }

  get attributes(): Data['attributes'] {
    return this.response.data[0].attributes;
  }

  get included(): Included[] {
    return this.response.included;
  }

  includedByType<T extends Included['type']>(
    type: T
  ): Extract<Included, { type: T }>[] {
    return this.included.filter(item => item.type === type) as any;
  }

  firstIncludedByType<T extends Included['type']>(
    type: T
  ): Extract<Included, { type: T }> | undefined {
    return this.includedByType(type)[0];
  }

  getIncludedByTypeAndId<T extends Included['type']>(
    type: T,
    id: string
  ): Extract<Included, { type: T; id: string }> | undefined {
    return this.included.find(
      item => item.type === type && item.id === id
    ) as any;
  }
}
