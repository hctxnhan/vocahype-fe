import { deserialize } from 'deserialize-json-api';

import { axiosInstance } from '@/lib/configs/axios';
import { paginationSchema } from '@/lib/formScheme/paginationSchema';
import { APIResponse, PaginationMeta } from '@/lib/interfaces/type';

import { Comprehension } from '../model/Comprehension';
import { Word } from '../model/Word';

export async function searchWord({
  word,
  exact,
  status,
  page = { offset: 0, limit: 10 },
}: {
  word: string;
  exact?: boolean;
  status?: string;
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
    status: status ?? 'to_learn',
    'page[offset]': parsedParams.page.toString(),
    'page[limit]': parsedParams.size.toString(),
  });

  const response = await axiosInstance.get(`/words?${searchParams.toString()}`);

  return deserialize<
    APIResponse<
      Word & {
        comprehension: Comprehension;
      },
      PaginationMeta
    >
  >(response.data as string);
}
