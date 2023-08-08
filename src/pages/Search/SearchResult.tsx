import { searchWord } from '@/api/words/searchWord';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { useRoute } from '@/lib/hooks/useSearchParams';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { SpeakerLoudIcon } from '@radix-ui/react-icons';
import useSWR from 'swr';
import { useLocation } from 'wouter';

export function SearchResult() {
  const { params } = useRoute('/words');
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
    <div>
      <p className="mb-2 text-lg">
        Search suggestion for <b>"{word}"</b>
      </p>
      <div className="flex flex-col gap-2">
        {searchResult?.data.data?.attributes?.map(word => (
          <div
            onClick={() => selectWord(word.id)}
            className="flex cursor-pointer flex-col gap-2 rounded-md px-8 py-4 transition hover:bg-white/40"
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
