import axios from 'axios';
import { environment } from './environment';

const axiosInstance = axios.create({
  baseURL: environment.api.baseURL,
  headers: { 'X-Custom-Header': 'foobar' },
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

export { axiosInstance, fetcher };
