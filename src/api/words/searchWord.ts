import { deserialize } from 'deserialize-json-api';

import { axiosInstance } from '@/lib/configs/axios';
import { paginationSchema } from '@/lib/formScheme/paginationSchema';
import { APIResponse, PaginationMeta } from '@/lib/interfaces/type';

import { Word } from '../model/Word';

export async function searchWord({
  word,
  exact,
  page = { offset: 0, limit: 10 },
}: {
  word: string;
  exact?: boolean;
  page?: {
    offset: number | string;
    limit: number | string;
  };
}) {
  const parsedParams = paginationSchema.parse({
    page: page.offset,
    size: page.limit,
  });

  const searchParams = new URLSearchParams({
    search: word.trim(),
    exact: exact ? 'true' : 'false',
    'page[offset]': parsedParams.page.toString(),
    'page[limit]': parsedParams.size.toString(),
  });

  const response = await axiosInstance.get(`/words?${searchParams.toString()}`);

  return deserialize<APIResponse<Word, PaginationMeta>>(
    response.data as string
  );
}
