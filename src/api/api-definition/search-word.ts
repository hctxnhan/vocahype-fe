import { Word } from '@/api/model/Word';
import { PartOfSpeech } from '@/api/model/PartOfSpeech';

export interface Params {
  word: string;
}

export interface Response {
  data: {
    type: 'word';
    id: string;
    attributes: Word;
    relationships: {
      pos: {
        data: {
          type: 'pos';
          id: string;
        };
      };
    };
  }[];

  included: [
    {
      type: 'pos';
      id: string;
      attributes: PartOfSpeech;
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
