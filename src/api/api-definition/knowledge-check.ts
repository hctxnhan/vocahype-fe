import { WordKnowledgeCheck } from '@/api/model/WordKnowledgeCheck';

export interface Params {}

export interface Response {
  data: {
    type: 'wordknowledgecheck';
    id: string;
    attributes: WordKnowledgeCheck;
    relationships: {};
  }[];
  meta?: Metadata;
  included: [];
}

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
}
