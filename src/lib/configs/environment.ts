export const environment = {
  meta: {
    production: import.meta.env.MODE === 'production',
  },
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
  },
};
