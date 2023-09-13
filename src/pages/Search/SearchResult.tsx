import { SpeakerLoudIcon } from '@radix-ui/react-icons';
import useSWR from 'swr';
import { useLocation } from 'wouter';

import { searchWord } from '@/api/words/searchWord';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { useRoute } from '@/lib/hooks/useSearchParams';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

export function SearchResult() {
  const { params } = useRoute<{
    search: string;
  }>('/words');
  const word = params?.search;

  const [, navigate] = useLocation();
  const { data: searchResult, isLoading } = useSWR(
    ['words/knowledge-test', word],
    ([, word]) => searchWord(word ?? '')
  );

  useSetBreadcrumb(['Search', word ?? '']);

  function selectWord(wordId: number) {
    navigate(`/words/${wordId}`);
  }

  if (isLoading)
    return (
      <FillParent>
        <Loading />
      </FillParent>
    );

  if (!searchResult?.data.data?.attributes?.length)
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
      <p className="mb-2 text-lg">
        Search suggestion for <b>"{word}"</b>
      </p>
      <div className="flex flex-1 basis-0 flex-col gap-2 overflow-auto">
        {searchResult?.data.data?.attributes?.map(word => (
          <div
            onClick={() => selectWord(word.id)}
            className="flex cursor-pointer flex-col gap-2 rounded-md border-b-[6px] border-b-transparent px-8 py-4 transition hover:border-b-brand-600 hover:bg-brand-500 hover:text-sky-50"
            key={word.id}
          >
            <div className="flex items-baseline gap-4">
              <p className="text-2xl font-semibold">{word.word}</p>
              <p>adjective</p>
            </div>
            <div className="flex items-center gap-4">
              <p>[{word.phonetic}]</p>
              <SpeakerLoudIcon width={16} height={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
