import { WheelEvent } from 'react';
import useSWRInfinite from 'swr/infinite';

import { APIResponse } from '@/api/api-definition/get-word-list';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { fetcher } from '@/lib/configs/axios';
import { useAuthState } from '@/lib/hooks/firebase/auth/useAuthState';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

import { WordItem } from './components/WordItem';

export function WordList() {
  useSetBreadcrumb(['Learning']);

  const { user } = useAuthState();

  const { data, mutate, size, setSize, isLoading } =
    useSWRInfinite<APIResponse>(index => {
      // const hasNextPage = data?.[0].getMeta()?.pagination.last > index;
      // if (!hasNextPage) return null;

      return `/words/learn?page%5Boffset%5D=${index}&page%5Blimit%5D=10`;
    }, fetcher);

  const words = data?.flatMap(item => item?.data) ?? [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.length;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1].data?.length < 5);

  const handleScroll = (event: WheelEvent) => {
    const container = event.currentTarget;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
    });
    if (
      container.scrollLeft + container.clientWidth + 200 >=
        container.scrollWidth &&
      !isLoadingMore &&
      isReachingEnd
    ) {
      void setSize(size + 1);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLearnWord = (id: string, index: number) => {
    void mutate();
  };

  if (isLoading && size === 1)
    return (
      <FillParent>
        <Loading />
      </FillParent>
    );

  if (!words) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-16 flex flex-col gap-2">
        <div className="text-4xl font-bold leading-normal text-brand-600">
          Keep up the good work, {user?.displayName}!
        </div>
        <div className="text-lg font-medium text-slate-600">
          You have 10 words in progress today, 3 words have due and 3 more words
          to learn
        </div>
      </div>
      <div onWheel={handleScroll} className="flex gap-2 overflow-auto">
        {words.length ? (
          words.map((word, index) => (
            <WordItem
              onLearnWord={handleLearnWord.bind(null, word.id, index)}
              data={word.attributes}
              key={word.id}
            />
          ))
        ) : (
          <div className="h-[350px] w-full text-center">No data to display</div>
        )}
      </div>
    </div>
  );
}
