import axios from 'axios';

import { environment } from './environment';
import { auth } from './firebase';

const axiosInstance = axios.create({
  baseURL: environment.api.baseURL,
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = (await auth.currentUser?.getIdToken()) ?? '';
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const axiosPexels = axios.create({
  baseURL: environment.api.pexels.baseURL,
  headers: {
    Authorization: environment.api.pexels.APIKey,
  },
});

export { axiosInstance, axiosPexels };
