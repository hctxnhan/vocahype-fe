import { FileSearch } from 'lucide-react';
import { useState } from 'react';
import useSWR from 'swr';
import { useLocation } from 'wouter';

import { searchWord } from '@/api/words/searchWord';
import { Pagination, PaginationState } from '@/components/ui/pagination';
import { useSearchParams } from '@/lib/hooks/useSearchParams';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

import { SearchFilter } from './SearchFilter';
import { SearchItem } from './SearchItem';

export function SearchResult() {
  const params = useSearchParams<{
    search: string;
    exact: string;
    status: string;
    'page[offset]': string;
    'page[limit]': string;
  }>();

  const [totalPage, setTotalPage] = useState(1);
  const [, navigate] = useLocation();

  const word = params?.search;

  const { data: searchResult, isLoading } = useSWR(
    [
      'search',
      word,
      params?.exact ?? 'false',
      params?.status ?? '',
      params?.['page[offset]'] ?? '1',
      params?.['page[limit]'] ?? '10',
    ],
    ([, word]) => {
      return searchWord({
        word: word ?? '',
        exact: params?.exact === 'true',
        status: params?.status,
        page: {
          offset: params?.['page[offset]'] ?? '1',
          limit: params?.['page[limit]'] ?? '10',
        },
      });
    },
    {
      onSuccess: data => {
        setTotalPage(data?.meta?.pagination?.last ?? 1);
      },
    }
  );

  useSetBreadcrumb(['Search', (word === '' ? params.status : word) ?? '']);

  function selectWord(wordId: string) {
    navigate(`/words/${wordId}`);
  }

  function onChangePagination(state: PaginationState) {
    const searchParams = new URLSearchParams({
      search: word ?? '',
      exact: params.exact ?? 'false',
      status: params.status ?? '',
      'page[offset]': String(state.page),
      'page[limit]': String(state.limit),
    });
    navigate(`/search?${searchParams.toString()}`);
  }

  function onChangeFilter(filter: string) {
    const searchParams = new URLSearchParams({
      search: word ?? '',
      exact: params.exact ?? 'false',
      status: filter,
      'page[offset]': '1',
      'page[limit]': '10',
    });
    navigate(`/search?${searchParams.toString()}`);
  }

  const wordList = searchResult?.data;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex justify-between max-sm:flex-col">
        {word !== '' && (
          <p className="text-lg">
            Search result for <b>"{word}"</b>
          </p>
        )}
        <SearchFilter
          value={params?.status ?? ''}
          onChange={onChangeFilter}
          className="ml-1 mr-2 w-[180px]"
        />
      </div>
      <div className="relative h-full flex-1 basis-0 pb-12">
        {!isLoading && !wordList?.length && (
          <div className="center flex-1 flex-col gap-3">
            <FileSearch width={128} height={128} />
            <p className="text-balance text-center text-2xl">
              Sorry! We can't find any word that match your search{' '}
              <b>"{word}"</b>
            </p>
          </div>
        )}
        {!isLoading && !!wordList?.length && (
          <div className="flex w-full flex-col">
            {wordList.map(word => (
              <SearchItem key={word.id} word={word} selectWord={selectWord} />
            ))}
          </div>
        )}
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <Pagination
          key={word?.concat(params?.exact ?? 'false')}
          defaultValue={{
            page: Number(params?.['page[offset]'] ?? '1'),
            limit: Number(params?.['page[limit]'] ?? '10'),
            total: totalPage,
          }}
          onChange={onChangePagination}
        >
          <div className="center gap-2">
            <Pagination.PageSize />
            <Pagination.Prev />
            <Pagination.PageNumber totalPage={totalPage} />
            <Pagination.Next />
          </div>
        </Pagination>
      </div>
    </div>
  );
}
