export const environment = {
  meta: {
    production: import.meta.env.MODE === 'production',
  },
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    pexels: {
      APIKey: import.meta.env.VITE_PEXELS_API_KEY as string,
      baseURL: import.meta.env.VITE_PEXELS_API_BASE_URL as string,
    },
  },
};
