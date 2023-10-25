import { SpeakerLoudIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import useSWR from 'swr';
import { useLocation } from 'wouter';

import { searchWord } from '@/api/words/searchWord';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationState } from '@/components/ui/pagination';
import { useSearchParams } from '@/lib/hooks/useSearchParams';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

export function SearchResult() {
  const params = useSearchParams<{
    search: string;
    exact: string;
    'page[offset]': string;
    'page[limit]': string;
  }>();
  
  const [totalPage, setTotalPage] = useState(1);
  const [, navigate, ] = useLocation();

  const word = params?.search;
  const { data: searchResult, isLoading } = useSWR(
    [
      'search',
      word,
      params?.exact ?? 'false',
      params?.['page[offset]'] ?? '1',
      params?.['page[limit]'] ?? '10',
    ],
    ([, word]) => {
      if(!word) return Promise.resolve(null);

      return searchWord({
        word,
        exact: params?.exact ?? 'false',
        'page[limit]': params?.['page[limit]'] ?? '10',
        'page[offset]': params?.['page[offset]'] ?? '1',
      });
    },
    {
      onSuccess: data => {
        setTotalPage(data?.meta?.pagination.last ?? 1);
      },
    }
  );

  useSetBreadcrumb(['Search', word ?? '']);

  function selectWord(wordId: string) {
    navigate(`/words/${wordId}`);
  }

  function onChangePagination(state: PaginationState) {
    const searchParams = new URLSearchParams({
      search: word ?? '',
      exact: params.exact ?? 'false',
      'page[offset]': String(state.page),
      'page[limit]': String(state.limit),
    });
    navigate(`/search?${searchParams.toString()}`);
  }

  function playPronunciation(word: string) {
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      const utterance = new SpeechSynthesisUtterance(word);
      speechSynthesis.speak(utterance);
    };
  }

  const wordList = searchResult?.data;

  if (!wordList?.length && !isLoading)
    return (
      <div>
        <p className="mb-2 text-lg">
          Search suggestion for <b>"{word}"</b>
        </p>
        <div>Not found</div>
      </div>
    );

  return (
    <div className="flex h-full flex-col">
      <p className="mb-6 text-lg">
        Search suggestion for <b>"{word}"</b>
      </p>
      <div className="relative h-full flex-1 basis-0 pb-12">
        {!isLoading && wordList?.length ? (
          <div className="flex w-full flex-col">
            {wordList.map(word => (
              <Button
                variant={'ghost'}
                onClick={() => selectWord(word.id)}
                className="my-1 ml-1 mr-2 flex h-fit cursor-pointer flex-col gap-2 rounded-md bg-accent px-8 py-4 transition hover:bg-primary hover:text-primary-foreground"
                key={word.id}
              >
                <div className="center gap-4">
                  <p className="text-2xl font-semibold">
                    {word.attributes.word}
                  </p>
                  {
                    searchResult?.getIncludedByTypeAndId(
                      'pos',
                      word.relationships.pos?.data.id
                    )?.attributes.description
                  }
                </div>
                <div className="center gap-2">
                  {word.attributes.phonetic ? (
                    <p>[{word.attributes.phonetic}]</p>
                  ) : null}
                  <Button
                    onClick={playPronunciation(word.attributes.word)}
                    size={'icon'}
                    variant={'ghost'}
                    className="flex items-center gap-4 transition-none"
                  >
                    <SpeakerLoudIcon width={16} height={16} />
                  </Button>
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <FillParent>
            <Loading />
          </FillParent>
        )}
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <Pagination
          key={word?.concat(params?.exact ?? 'false')}
          defaultValue={{
            page: Number(params?.['page[offset]'] ?? '1'),
            limit: Number(params?.['page[limit]'] ?? '10'),
            total: 1,
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
