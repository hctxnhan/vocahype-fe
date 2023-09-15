import { AxiosResponse } from 'axios';

interface APIData {
  id: string;
  type: string;
  attributes?: {
    id?: string;
    type?: string;
    [key: string]: any;
  };
  relationships?: {
    [key: string]: APIData[];
  };
}

export type APIResponse = {
  data: APIData[];
  included?: APIData[];
};

export class VHAPI<D extends AxiosResponse<APIResponse, any>> {
  constructor(private response: D) {}

  getData() {
    return this.response.data;
  }

  getSingleData() {
    return this.response.data.data[0];
  }

  getIncluded() {
    return this.response.data.included;
  }

  findIncludedByType(type: keyof APIResponse['included']) {
    return this.response.data.included?.filter(
      included => included.type === type
    );
  }

  findIncludedByTypeAndId(type: keyof APIResponse['included'], id: string) {
    return this.findIncludedByType(type)?.find(included => included.id === id);
  }
}