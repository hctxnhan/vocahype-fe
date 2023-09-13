import { AxiosResponse } from 'axios';

export class VHAPI<D extends AxiosResponse<unknown | unknown[]>> {
  constructor(private response: D) {}

  getData() {
    return this.response.data;
  }

  getSingleData() {
    return (this.response.data as unknown[])[0];
  }
}
